# NotaUp — Matemática ENEM

Projeto inicial de plataforma de estudos com página pública, cadastro/login, área de membros, trilha de 12 módulos, simulados e integração de checkout InfinitePay.

## O que já está incluído

- Landing page responsiva para desktop e celular.
- Cadastro e login com Supabase Auth.
- Área de membros protegida por matrícula.
- Trilha de 12 módulos com resumos iniciais.
- Simulado demonstrativo de 5 questões autorais no estilo ENEM, com correção e explicação.
- Histórico de tentativas no Supabase.
- Criação de checkout InfinitePay por Netlify Function.
- Webhook com confirmação server-to-server usando `/payment_check` antes de liberar o acesso.
- Acesso vitalício associado ao usuário.

## 1. Pré-requisitos

- Node.js LTS instalado.
- Conta Netlify.
- Projeto Supabase.
- Conta InfinitePay com Checkout Integrado habilitado.

## 2. Instalar localmente

Abra a pasta no VS Code e rode:

```bash
npm install
```

Copie `.env.example` para `.env` e preencha:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Para testar funções localmente, também instale/execute Netlify CLI:

```bash
npm run dev
```

O comando abre o projeto com Netlify Dev.

## 3. Configurar Supabase

1. Crie um projeto em https://supabase.com.
2. Abra SQL Editor.
3. Execute todo o conteúdo de `supabase/schema.sql`.
4. Em Project Settings > API, copie Project URL e a chave publicável/anon.
5. Em Authentication > URL Configuration, configure o Site URL com seu domínio Netlify.
6. Para começar, configure confirmação de e-mail conforme sua preferência. Se estiver habilitada, o usuário precisa confirmar o e-mail antes de entrar.

## 4. Configurar InfinitePay

1. No app/conta web InfinitePay, abra Vendas > Checkout > Configurações.
2. Habilite Checkout Integrado.
3. Crie uma API Key e copie-a imediatamente.
4. Copie sua InfiniteTag/handle sem o símbolo `$`.
5. A API Key deve ficar somente nas variáveis protegidas da Netlify, nunca no frontend.

A integração usa:
- `POST https://api.checkout.infinitepay.io/links`
- `POST https://api.checkout.infinitepay.io/payment_check`

A InfinitePay informa que seus webhooks não possuem assinatura. Por isso, a função `payment-webhook.js` não confia somente no evento recebido: ela consulta `/payment_check` e confere `success`, `paid` e o valor de R$ 19,90 antes de liberar a matrícula.

**Atenção:** a InfinitePay não oferece sandbox para essa API. Para validar a integração, faça uma compra real de baixo valor conforme a documentação e depois estorne pelo app, ou teste o produto com o preço final somente quando estiver pronto para vender. A função deste projeto está fixada em R$ 19,90.

## 5. Variáveis da Netlify

Em Site configuration > Environment variables, adicione:

| Nome | Valor |
|---|---|
| `VITE_SUPABASE_URL` | URL do Supabase |
| `VITE_SUPABASE_ANON_KEY` | chave publicável/anon do Supabase |
| `SUPABASE_URL` | URL do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | chave service_role (segredo) |
| `INFINITEPAY_HANDLE` | sua InfiniteTag sem `$` |
| `INFINITEPAY_API_KEY` | API Key da InfinitePay |
| `SITE_URL` | URL pública completa do site, sem barra final |

Depois de adicionar variáveis, faça um novo deploy.

## 6. Publicar na Netlify

1. Suba a pasta do projeto para um repositório GitHub privado ou público.
2. Na Netlify, escolha Add new site > Import an existing project.
3. Selecione o repositório.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy.
7. Configure as variáveis da seção anterior e faça novo deploy.

## 7. Configurar domínio e URLs

Use o domínio final no `SITE_URL`. A função envia automaticamente:
- redirect_url: `https://SEU-DOMINIO/?pagamento=retorno...`
- webhook_url: `https://SEU-DOMINIO/api/payment-webhook`

Não altere essas rotas sem também atualizar o backend.

## Segurança e limitações importantes

- Nunca coloque `SUPABASE_SERVICE_ROLE_KEY` ou `INFINITEPAY_API_KEY` em arquivos `src/`, variáveis `VITE_` ou repositório.
- O frontend não pode inserir matrículas ou marcar pedidos como pagos.
- A liberação ocorre no webhook após confirmação da InfinitePay.
- O webhook da InfinitePay não é assinado; o código confirma cada pagamento com a API oficial.
- O conteúdo didático desta primeira versão é uma base inicial. Antes de comercializar, revise, amplie e valide as aulas, fórmulas, simulados e gabaritos.
- O simulado atual contém apenas 5 questões de demonstração, não é um simulado completo oficial.
- Esta versão ainda não tem painel administrativo visual para editar módulos e questões. O conteúdo está no arquivo `src/main.js`.
- Para uma operação comercial, acrescente política de privacidade, termos de uso, política de reembolso, canal de suporte e informações legais do vendedor.
- O projeto não promete nota ou aprovação. A NotaUp é independente e não possui vínculo com INEP/MEC.
