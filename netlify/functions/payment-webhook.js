import { createClient } from "@supabase/supabase-js";
import { json, preflight } from "./_http.js";
export default async (event) => {
  const pf = preflight(event); if (pf) return pf;
  if (event.httpMethod !== "POST") return json(405, { error: "Método não permitido." });
  try {
    const payload = JSON.parse(event.body || "{}");
    const orderNsu = payload.order_nsu, transactionNsu = payload.transaction_nsu;
    const invoiceSlug = payload.invoice_slug || payload.slug;
    if (!orderNsu) return json(400, { error: "Pedido sem identificador." });
    const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data: order, error } = await admin.from("orders").select("*").eq("order_nsu", orderNsu).maybeSingle();
    if (error || !order) return json(404, { error: "Pedido não encontrado." });
    if (!transactionNsu || !invoiceSlug) return json(200, { received: true, verified: false });
    const headers = { "Content-Type": "application/json" };
    if (process.env.INFINITEPAY_API_KEY) headers["X-Api-Key"] = process.env.INFINITEPAY_API_KEY;
    const checked = await fetch("https://api.checkout.infinitepay.io/payment_check", {
      method: "POST", headers,
      body: JSON.stringify({ handle: process.env.INFINITEPAY_HANDLE, order_nsu: orderNsu, transaction_nsu: transactionNsu, slug: invoiceSlug })
    });
    const check = await checked.json().catch(() => ({}));
    if (!checked.ok || check.success !== true || check.paid !== true || Number(check.amount) !== Number(order.amount))
      return json(400, { error: "Pagamento ainda não confirmado." });
    await admin.from("orders").update({
      status: "paid", transaction_nsu: transactionNsu, invoice_slug: invoiceSlug, paid_at: new Date().toISOString()
    }).eq("id", order.id);
    return json(200, { received: true, paid: true });
  } catch (error) {
    console.error("payment-webhook:", error);
    return json(500, { error: "Falha ao processar notificação." });
  }
};
