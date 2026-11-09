import { createClient } from "@supabase/supabase-js";
import { json, preflight, method, body, header } from "./_http.js";
export default async (event) => {
  const pf = preflight(event); if (pf) return pf;
  if (method(event) !== "POST") return json(405, { error: "Método não permitido." });
  try {
    const { order_nsu, transaction_nsu, slug } = await body(event);
    if (!order_nsu || !/^NU-[0-9a-f-]{36}$/i.test(order_nsu)) return json(400, { error: "Pedido inválido." });
    const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data: order, error } = await admin.from("orders").select("id,order_nsu,status,customer_email,amount,paid_at,user_id").eq("order_nsu", order_nsu).maybeSingle();
    if (error || !order) return json(404, { error: "Pedido não encontrado." });

    if (order.status === "pending" && transaction_nsu && slug) {
      const headers = { "Content-Type": "application/json" };
      if (process.env.INFINITEPAY_API_KEY) headers["X-Api-Key"] = process.env.INFINITEPAY_API_KEY;
      const checked = await fetch("https://api.checkout.infinitepay.io/payment_check", {
        method: "POST", headers,
        body: JSON.stringify({ handle: process.env.INFINITEPAY_HANDLE, order_nsu: order.order_nsu, transaction_nsu, slug })
      });
      const payment = await checked.json().catch(() => ({}));
      if (checked.ok && payment.success === true && payment.paid === true && Number(payment.amount) === Number(order.amount)) {
        const { error: updateError } = await admin.from("orders").update({ status: "paid", transaction_nsu, invoice_slug: slug, paid_at: new Date().toISOString() }).eq("id", order.id).eq("status", "pending");
        if (updateError) throw updateError;
        order.status = "paid";
      }
    }

    const token = header(event, "authorization").replace(/^Bearer\\s+/i, "");
    let hasAccess = false;
    if (token) {
      const { data: { user }, error: authError } = await admin.auth.getUser(token);
      if (authError || !user) return json(401, { error: "Sessão inválida." });
      if (order.status === "paid") {
        if (order.user_id && order.user_id !== user.id) return json(409, { error: "Pedido já associado a outra conta." });
        if (!order.user_id) {
          const { data: linkedOrder, error: linkError } = await admin.from("orders").update({ user_id: user.id, customer_email: user.email }).eq("id", order.id).is("user_id", null).select("id").maybeSingle();
          if (linkError) throw linkError;
          if (!linkedOrder) return json(409, { error: "Este pedido já foi associado a outra conta." });
        }
        const { error: enrollmentError } = await admin.from("enrollments").upsert({ user_id: user.id, product_code: "notaup-matematica-enem", access_type: "lifetime", active: true }, { onConflict: "user_id" });
        if (enrollmentError) throw enrollmentError;
        hasAccess = true;
      }
    }
    return json(200, { status: order.status, paid: order.status === "paid", hasAccess, email: order.customer_email, paidAt: order.paid_at });
  } catch (error) {
    console.error("check-order:", error);
    return json(500, { error: "Não foi possível consultar o pedido." });
  }
};
