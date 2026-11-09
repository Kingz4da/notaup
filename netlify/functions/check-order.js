import { createClient } from "@supabase/supabase-js";
import { json, preflight } from "./_http.js";
export default async (event) => {
  const pf = preflight(event); if (pf) return pf;
  if (event.httpMethod !== "POST") return json(405, { error: "Método não permitido." });
  try {
    const { order_nsu } = JSON.parse(event.body || "{}");
    if (!order_nsu || !/^NU-[0-9a-f-]{36}$/i.test(order_nsu)) return json(400, { error: "Pedido inválido." });
    const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data: order, error } = await admin.from("orders")
      .select("order_nsu,status,customer_email,amount,paid_at").eq("order_nsu", order_nsu).maybeSingle();
    if (error || !order) return json(404, { error: "Pedido não encontrado." });
    return json(200, { status: order.status, paid: order.status === "paid", email: order.customer_email, paidAt: order.paid_at });
  } catch (error) {
    console.error("check-order:", error);
    return json(500, { error: "Não foi possível consultar o pedido." });
  }
};
