import { createClient } from "@supabase/supabase-js";
import { json, preflight } from "./_http.js";

export default async (event) => {
  const pf = preflight(event); if (pf) return pf;
  if (event.httpMethod !== "POST") return json(405, { error: "Método não permitido." });
  try {
    const token = (event.headers.authorization || "").replace(/^Bearer\s+/i, "");
    if (!token) return json(401, { error: "Não autenticado." });
    const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data: { user }, error } = await admin.auth.getUser(token);
    if (error || !user) return json(401, { error: "Sessão inválida." });

    const { order_nsu } = JSON.parse(event.body || "{}");
    if (!order_nsu) return json(400, { error: "Pedido inválido." });
    const { data: order } = await admin.from("orders").select("id,order_nsu,status,user_id")
      .eq("order_nsu", order_nsu).eq("user_id", user.id).maybeSingle();
    if (!order) return json(404, { error: "Pedido não encontrado." });

    // Confirmação manual para cobrir atraso/perda de webhook.
    if (order.status === "pending") {
      // Não há slug/transaction id confiáveis até a InfinitePay enviar webhook.
      // O aluno pode atualizar a tela após a confirmação do webhook.
    }
    const { data: enrollment } = await admin.from("enrollments").select("active")
      .eq("user_id", user.id).maybeSingle();
    return json(200, { status: order.status, hasAccess: !!enrollment?.active });
  } catch (error) {
    console.error("check-order:", error);
    return json(500, { error: "Não foi possível consultar o pedido." });
  }
};
