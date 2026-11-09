import { createClient } from "@supabase/supabase-js";
import { json, preflight, method } from "./_http.js";

export default async (event) => {
  const pf = preflight(event); if (pf) return pf;
  if (method(event) !== "POST") return json(405, { error: "Método não permitido." });
  if (process.env.NOTAUP_TEST_MODE !== "true" || !process.env.TEST_ALLOWED_EMAIL) {
    return json(404, { error: "Modo de teste indisponível." });
  }
  try {
    const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const orderNsu = `NU-${crypto.randomUUID()}`;
    const { error } = await admin.from("orders").insert({
      user_id: null, customer_email: null, order_nsu: orderNsu,
      amount: 1990, status: "pending", is_test: true
    });
    if (error) throw error;
    return json(200, { orderNsu, test: true });
  } catch (error) {
    console.error("create-test-order:", error);
    return json(500, { error: "Não foi possível criar o pedido de teste." });
  }
};
