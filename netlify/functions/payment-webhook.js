import { createClient } from "@supabase/supabase-js";
import { json, preflight } from "./_http.js";

export default async (event) => {
  const pf = preflight(event); if (pf) return pf;
  if (event.httpMethod !== "POST") return json(405, { error: "Método não permitido." });

  try {
    const payload = JSON.parse(event.body || "{}");
    const orderNsu = payload.order_nsu;
    const transactionNsu = payload.transaction_nsu;
    const invoiceSlug = payload.invoice_slug || payload.slug;

    if (!orderNsu) return json(400, { error: "Pedido sem identificador." });

    const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data: order, error: orderError } = await admin.from("orders")
      .select("*").eq("order_nsu", orderNsu).maybeSingle();
    if (orderError || !order) return json(404, { error: "Pedido não encontrado." });

    // Webhooks InfinitePay não possuem assinatura: nunca confiar apenas no payload.
    // Confirmar cada aviso diretamente na API oficial antes de liberar o curso.
    if (payload.event === "refunded" || payload.event === "canceled") {
      if (payload.event === "refunded") {
        await admin.from("orders").update({ status: "refunded" }).eq("id", order.id);
        await admin.from("enrollments").update({ active: false }).eq("user_id", order.user_id);
      } else {
        await admin.from("orders").update({ status: "canceled" }).eq("id", order.id);
      }
      return json(200, { received: true });
    }

    if (!transactionNsu || !invoiceSlug) return json(200, { received: true, verified: false });

    const checkHeaders = { "Content-Type": "application/json" };
    if (process.env.INFINITEPAY_API_KEY) checkHeaders["X-Api-Key"] = process.env.INFINITEPAY_API_KEY;
    const checkResponse = await fetch("https://api.checkout.infinitepay.io/payment_check", {
      method: "POST",
      headers: checkHeaders,
      body: JSON.stringify({
        handle: process.env.INFINITEPAY_HANDLE,
        order_nsu: orderNsu,
        transaction_nsu: transactionNsu,
        slug: invoiceSlug
      })
    });
    const check = await checkResponse.json().catch(() => ({}));
    if (!checkResponse.ok || check.success !== true || check.paid !== true || Number(check.amount) !== 1990) {
      return json(400, { error: "Pagamento ainda não confirmado." });
    }

    // Idempotência: notificações repetidas não criam matrículas duplicadas.
    await admin.from("orders").update({
      status: "paid", transaction_nsu: transactionNsu, invoice_slug: invoiceSlug, paid_at: new Date().toISOString()
    }).eq("id", order.id);

    const { error: enrollmentError } = await admin.from("enrollments").upsert({
      user_id: order.user_id, product_code: "notaup-matematica-enem", access_type: "lifetime", active: true
    }, { onConflict: "user_id" });
    if (enrollmentError) throw enrollmentError;

    return json(200, { received: true, paid: true });
  } catch (error) {
    console.error("payment-webhook:", error);
    return json(500, { error: "Falha ao processar notificação." });
  }
};
