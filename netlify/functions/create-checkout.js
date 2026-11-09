import { createClient } from "@supabase/supabase-js";
import { json, preflight } from "./_http.js";
const PRICE_CENTS = 1990;
const PRODUCT = "Intensivo NotaUp — Matemática ENEM";

export default async (event) => {
  const pf = preflight(event); if (pf) return pf;
  if (event.httpMethod !== "POST") return json(405, { error: "Método não permitido." });
  try {
    const admin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const orderNsu = `NU-${crypto.randomUUID()}`;
    const { error: insertError } = await admin.from("orders").insert({
      user_id: null, customer_email: null, order_nsu: orderNsu, amount: PRICE_CENTS, status: "pending"
    });
    if (insertError) throw insertError;

    const payload = {
      handle: process.env.INFINITEPAY_HANDLE, order_nsu: orderNsu,
      redirect_url: `${process.env.SITE_URL}/?pagamento=retorno&order_nsu=${encodeURIComponent(orderNsu)}`,
      webhook_url: `${process.env.SITE_URL}/api/payment-webhook`,
      options: { single_payment: true, payment_methods_enabled: ["pix", "credit_card"] },
      items: [{ quantity: 1, price: PRICE_CENTS, description: PRODUCT }]
    };
    const headers = { "Content-Type": "application/json" };
    if (process.env.INFINITEPAY_API_KEY) headers["X-Api-Key"] = process.env.INFINITEPAY_API_KEY;
    const response = await fetch("https://api.checkout.infinitepay.io/links", { method: "POST", headers, body: JSON.stringify(payload) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      await admin.from("orders").delete().eq("order_nsu", orderNsu);
      return json(502, { error: result.message || "Não foi possível criar o checkout. Confira a configuração da InfinitePay." });
    }
    const checkoutUrl = result.url || result.checkout_url || result.link;
    let checkoutHost = "";
    try { checkoutHost = new URL(checkoutUrl).hostname.toLowerCase(); } catch {}
    if (!checkoutUrl || !checkoutUrl.startsWith("https://") || !(checkoutHost === "checkout.infinitepay.com.br" || checkoutHost === "infinitepay.io" || checkoutHost.endsWith(".infinitepay.io")))
      throw new Error("A InfinitePay não retornou uma URL de checkout reconhecida.");
    await admin.from("orders").update({ checkout_url: checkoutUrl }).eq("order_nsu", orderNsu);
    return json(200, { checkoutUrl, orderNsu });
  } catch (error) {
    console.error("create-checkout:", error);
    return json(500, { error: "Erro ao iniciar o pagamento. Tente novamente." });
  }
};
