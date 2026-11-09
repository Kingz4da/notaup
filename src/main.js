import { createClient } from "@supabase/supabase-js";
import "./style.css";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const configured = Boolean(SUPABASE_URL && SUPABASE_KEY && !SUPABASE_URL.includes("SEU-PROJETO"));
const supabase = configured ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;
const app = document.querySelector("#app");

const modules = [
  ["01","Fundamentos","Operações, números naturais, inteiros, racionais e ordem de operações."],
  ["02","Frações e porcentagem","Frações, números decimais, aumentos, descontos e porcentagens sucessivas."],
  ["03","Razão e proporção","Escalas, regra de três simples e composta, grandezas proporcionais."],
  ["04","Matemática financeira","Juros simples e compostos, descontos, taxas e planejamento."],
  ["05","Álgebra e funções","Expressões, equações, sistemas, função afim, quadrática e exponencial."],
  ["06","Geometria plana","Ângulos, polígonos, perímetro, áreas, semelhança e Pitágoras."],
  ["07","Geometria espacial","Prismas, cilindros, cones, pirâmides, esferas, áreas e volumes."],
  ["08","Estatística e probabilidade","Média, mediana, moda, gráficos, tabelas e eventos."],
  ["09","Grandezas e unidades","Conversões, unidades, velocidade, densidade e escalas."],
  ["10","Trigonometria e geometria analítica","Razões trigonométricas, plano cartesiano e distância entre pontos."],
  ["11","Contagem e sequências","Princípio fundamental da contagem, PA e PG."],
  ["12","Revisão estratégica","Leitura de questões, estimativa, interpretação e revisão geral."]
];

const questions = [
 {q:"Uma camiseta custa R$ 80,00 e recebe desconto de 25%. Qual é o preço final?",a:["R$ 55,00","R$ 60,00","R$ 65,00","R$ 70,00","R$ 75,00"],c:1,e:"25% de 80 = 0,25 × 80 = 20. Então, 80 − 20 = R$ 60,00."},
 {q:"Uma torneira enche 120 litros em 4 horas, mantendo vazão constante. Quantos litros enche em 7 horas?",a:["180 L","200 L","210 L","220 L","240 L"],c:2,e:"A vazão é 120 ÷ 4 = 30 L/h. Em 7 horas: 30 × 7 = 210 litros."},
 {q:"As notas de um estudante foram 6, 7, 7, 8 e 12. Qual é a média aritmética?",a:["7","7,5","8","8,2","9"],c:2,e:"Somamos os valores: 6 + 7 + 7 + 8 + 12 = 40. Dividindo por 5, a média é 8."},
 {q:"Um terreno retangular mede 12 m por 8 m. Qual é sua área?",a:["20 m²","40 m²","80 m²","96 m²","120 m²"],c:3,e:"Área do retângulo = base × altura = 12 × 8 = 96 m²."},
 {q:"Em uma turma de 40 alunos, 30% usam transporte público. Quantos alunos são?",a:["8","10","12","14","16"],c:2,e:"30% de 40 = 0,30 × 40 = 12 alunos."}
];

let session = null;
let hasAccess = false;
let activeView = "home";

function escapeHtml(s="") { return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function money(v) { return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(v); }

function shell(content) {
  app.innerHTML = `<header class="nav"><a class="brand" href="#inicio"><span class="brand-mark">N</span> NotaUp</a><nav><a href="#conteudo">Conteúdo</a><a href="#como-funciona">Como funciona</a><a href="#duvidas">Dúvidas</a></nav><div class="nav-actions">${session ? `<button class="btn btn-light" id="go-dashboard">Minha área</button><button class="text-btn" id="logout">Sair</button>` : `<button class="btn btn-light" id="open-login">Entrar</button><button class="btn btn-yellow" id="top-buy">Comprar agora · R$ 19,90</button>`}</div><button class="mobile-menu" id="mobile-menu">☰</button></header>${content}<footer><div class="brand"><span class="brand-mark">N</span> NotaUp</div><p>Preparação independente para o ENEM. A NotaUp não é afiliada ao INEP ou ao Ministério da Educação.</p><small>© ${new Date().getFullYear()} NotaUp. Todos os direitos reservados.</small></footer>`;
  document.querySelector("#open-login")?.addEventListener("click", showAuth);
  document.querySelector("#top-buy")?.addEventListener("click", startCheckout);
  document.querySelector("#logout")?.addEventListener("click", async()=>{await supabase?.auth.signOut();session=null;hasAccess=false;renderHome();});
  document.querySelector("#go-dashboard")?.addEventListener("click", renderDashboard);
  document.querySelector("#mobile-menu")?.addEventListener("click",()=>document.querySelector(".nav nav")?.classList.toggle("show"));
}

function renderHome() {
  activeView="home";
  shell(`<main>
    <section class="hero"><div class="hero-copy"><div class="eyebrow"><span></span> INTENSIVO DE MATEMÁTICA ENEM</div><h1>Matemática sem medo. <em>Mais confiança</em> na prova.</h1><p>Do básico ao avançado, com explicações diretas, exemplos resolvidos e simulados para você praticar no seu ritmo.</p><div class="hero-actions"><a class="btn btn-yellow" href="#comprar">Quero começar agora <span>→</span></a><a class="link-btn" href="#conteudo">Ver o conteúdo</a></div><div class="trust"><span>✓ Acesso vitalício</span><span>✓ Estude no seu ritmo</span><span>✓ Simulados online</span></div></div><div class="hero-art"><div class="math-card card-top"><small>DESAFIO DO DIA</small><strong>25% de 200</strong><span>Você consegue?</span></div><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="big-seven">7<span>dias de foco</span></div><div class="math-card card-bottom"><b>✓</b><span>Aprender • Praticar • Evoluir</span></div></div></section>
    <section class="stats"><div><strong>12</strong><span>módulos de estudo</span></div><div><strong>Do zero</strong><span>ao conteúdo avançado</span></div><div><strong>100%</strong><span>online e no seu ritmo</span></div></section>
    <section class="section" id="conteudo"><div class="section-heading"><div class="eyebrow">TRILHA DE APRENDIZADO</div><h2>O que você vai estudar</h2><p>Uma trilha organizada para construir a base e avançar nos principais assuntos de matemática cobrados no ENEM.</p></div><div class="module-grid">${modules.map(m=>`<article class="module"><span class="module-num">${m[0]}</span><h3>${m[1]}</h3><p>${m[2]}</p></article>`).join("")}</div></section>
    <section class="split-section" id="como-funciona"><div><div class="eyebrow">SEU ESTUDO, SEU RITMO</div><h2>Aprenda. Resolva. Entenda onde melhorar.</h2><p>Assista às aulas, leia os materiais e teste o que aprendeu com simulados interativos. Seu progresso fica salvo na sua conta.</p><ul class="check-list"><li>Conteúdo dividido por assunto</li><li>Questões de múltipla escolha</li><li>Correção e explicação após responder</li><li>Histórico de tentativas</li></ul></div><div class="progress-card"><div class="progress-head"><span>Minha evolução</span><span class="live-dot">● AO SEU RITMO</span></div><div class="progress-circle"><strong>7</strong><span>dias de foco</span></div><div class="progress-line"><span style="width:72%"></span></div><div class="progress-foot"><span>Estude um pouco todos os dias</span><b>72%</b></div></div></section>
    <section class="pricing" id="comprar"><div class="pricing-inner"><div class="eyebrow">COMECE HOJE</div><h2>Seu próximo passo começa com uma questão.</h2><p>Tenha acesso à trilha de matemática e à área de simulados da NotaUp.</p><div class="price"><small>Pagamento único</small><strong>R$ 19,90</strong><span>Sem mensalidade • Acesso vitalício</span></div><button class="btn btn-yellow btn-wide" id="buy">Garantir meu acesso <span>→</span></button><small class="secure">🔒 Pagamento processado pela InfinitePay</small><p class="fine-print">Acesso liberado após confirmação do pagamento. Material digital independente, sem vínculo oficial com o INEP.</p></div></section>
    <section class="section faq" id="duvidas"><div class="section-heading"><div class="eyebrow">DÚVIDAS FREQUENTES</div><h2>Antes de começar</h2></div><details><summary>O acesso é vitalício?</summary><p>Sim. Após a confirmação do pagamento, o acesso ao produto adquirido fica associado à sua conta.</p></details><details><summary>Preciso estudar em horário fixo?</summary><p>Não. Você pode acessar os conteúdos quando quiser, usando celular ou computador.</p></details><details><summary>O material é oficial do ENEM?</summary><p>Não. A NotaUp é uma iniciativa independente de preparação. As atividades autorais são inspiradas no formato de questões do ENEM.</p></details><details><summary>Como recebo o acesso?</summary><p>Você paga primeiro e, após a confirmação, cria sua conta usando o mesmo e-mail informado no checkout.</p></details></section>
  </main>`);
  document.querySelector("#buy")?.addEventListener("click", startCheckout);
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const el=document.querySelector(a.getAttribute("href"));if(el){e.preventDefault();el.scrollIntoView({behavior:"smooth"});}}));
}

function showAuth(signupInitially = false) {
  const overlay=document.createElement("div"); overlay.className="modal-backdrop";
  overlay.innerHTML=`<div class="modal"><button class="modal-close" aria-label="Fechar">×</button><div class="eyebrow">ÁREA DO ALUNO</div><h2 id="auth-title">Entre na sua conta</h2><p id="auth-desc">Acesse seus estudos e acompanhe seu progresso.</p><form id="auth-form"><label>Nome completo <input id="auth-name" placeholder="Seu nome" autocomplete="name"></label><label>E-mail <input id="auth-email" type="email" required placeholder="voce@email.com" autocomplete="email"></label><label>Senha <input id="auth-password" type="password" required minlength="6" placeholder="Mínimo de 6 caracteres" autocomplete="current-password"></label><button class="btn btn-primary btn-wide" id="auth-submit">Entrar</button></form><button class="switch-auth" id="switch-auth">Não tem conta? Criar cadastro</button><p class="form-message" id="auth-message"></p></div>`;
  document.body.append(overlay);
  let signup=signupInitially;
  const title=overlay.querySelector("#auth-title"), desc=overlay.querySelector("#auth-desc"), name=overlay.querySelector("#auth-name"), submit=overlay.querySelector("#auth-submit"), sw=overlay.querySelector("#switch-auth"), form=overlay.querySelector("#auth-form"), msg=overlay.querySelector("#auth-message");
  const close=()=>overlay.remove();
  overlay.querySelector(".modal-close").onclick=close; overlay.onclick=e=>{if(e.target===overlay)close();};
  sw.onclick=()=>{signup=!signup;title.textContent=signup?"Crie sua conta":"Entre na sua conta";desc.textContent=signup?"Cadastre-se para acessar a NotaUp.":"Acesse seus estudos e acompanhe seu progresso.";name.style.display=signup?"block":"none";name.required=signup;submit.textContent=signup?"Criar conta":"Entrar";sw.textContent=signup?"Já tem conta? Entrar":"Não tem conta? Criar cadastro";msg.textContent="";};
  name.style.display=signup?"block":"none";\n  name.required=signup;\n  if(signup){title.textContent="Crie sua conta";desc.textContent="Finalize seu cadastro para acessar a NotaUp.";submit.textContent="Criar conta";sw.textContent="Já tem conta? Entrar";}\n  const pendingEmail=localStorage.getItem("notaup_pending_email");\n  if(pendingEmail) overlay.querySelector("#auth-email").value=pendingEmail;
  form.onsubmit=async e=>{e.preventDefault();if(!supabase){msg.textContent="Configure as variáveis do Supabase para ativar o login.";return;}
    submit.disabled=true;msg.textContent="Aguarde...";
    const email=overlay.querySelector("#auth-email").value.trim(), password=overlay.querySelector("#auth-password").value;
    const result=signup?await supabase.auth.signUp({email,password,options:{data:{full_name:name.value.trim()}}}):await supabase.auth.signInWithPassword({email,password});
    submit.disabled=false;
    if(result.error){msg.textContent=result.error.message;return;}
    if(signup && !result.data.session){msg.textContent="Cadastro criado! Confira seu e-mail para confirmar a conta e depois entre.";return;}
    session=result.data.session;await claimPendingOrder();await refreshAccess();close();renderDashboard();
  };
}

async function refreshAccess() {
  if(!supabase||!session)return;
  const {data}=await supabase.from("enrollments").select("active").eq("user_id",session.user.id).maybeSingle();
  hasAccess=!!data?.active;
}

async function startCheckout() {
  if(!configured){alert("Antes de vender, configure Supabase e as variáveis de ambiente da Netlify.");return;}
  const email=window.prompt("Qual e-mail você vai usar para criar sua conta depois do pagamento?");
  if(!email)return;
  const customerEmail=email.trim().toLowerCase();
  if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(customerEmail)){alert("Digite um e-mail válido.");return;}
  const button=document.querySelector("#buy");if(button){button.disabled=true;button.textContent="Preparando checkout...";}
  try{
    const res=await fetch("/api/create-checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:customerEmail})});
    const body=await res.json();if(!res.ok)throw new Error(body.error||"Não foi possível iniciar o pagamento.");
    localStorage.setItem("notaup_pending_order",body.orderNsu);
    localStorage.setItem("notaup_pending_email",customerEmail);
    location.href=body.checkoutUrl;
  }catch(e){alert(e.message);if(button){button.disabled=false;button.innerHTML='Garantir meu acesso <span>→</span>';}}
}

async function claimPendingOrder(){
  const orderNsu=localStorage.getItem("notaup_pending_order");
  if(!orderNsu||!session||!supabase)return false;
  const {data:{session:current}}=await supabase.auth.getSession();
  const res=await fetch("/api/check-order",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${current.access_token}`},body:JSON.stringify({order_nsu:orderNsu})});
  const body=await res.json();
  if(!res.ok){if(body.error)alert(body.error);return false;}
  if(body.status!=="paid"){alert("Ainda estamos aguardando a confirmação do pagamento. Assim que a InfinitePay confirmar, entre novamente para liberar o curso.");return false;}
  if(body.hasAccess){localStorage.removeItem("notaup_pending_order");localStorage.removeItem("notaup_pending_email");return true;}
  return false;
}

async function renderDashboard() {
  activeView="dashboard";
  if(!session){showAuth();return;}
  await refreshAccess();
  if(!hasAccess){
    shell(`<main class="member-wrap"><div class="member-top"><div><div class="eyebrow">SUA CONTA NOTAUP</div><h1>Olá, ${escapeHtml(session.user.user_metadata?.full_name||session.user.email.split("@")[0])}!</h1><p>Seu espaço de estudos está quase pronto.</p></div><span class="status-pill pending">Acesso não liberado</span></div><div class="locked-card"><div class="lock-icon">🔐</div><h2>Desbloqueie sua área de estudos</h2><p>Adquira o Intensivo de Matemática por R$ 19,90 e tenha acesso vitalício.</p><button class="btn btn-primary" id="member-buy">Comprar acesso</button><p class="hint">Já pagou? A liberação acontece após a confirmação da InfinitePay. Atualize esta página em alguns instantes.</p><button class="text-btn" id="refresh-access">Verificar meu acesso</button></div></main>`);
    document.querySelector("#member-buy").onclick=startCheckout;document.querySelector("#refresh-access").onclick=renderDashboard;return;
  }
  shell(`<main class="member-wrap"><div class="member-top"><div><div class="eyebrow">ÁREA DO ALUNO</div><h1>Vamos estudar, ${escapeHtml(session.user.user_metadata?.full_name||"estudante")}?</h1><p>Escolha um módulo ou pratique com um simulado.</p></div><span class="status-pill active">✓ Acesso vitalício ativo</span></div><div class="member-cards"><button class="member-card" id="open-lessons"><span>📚</span><b>Meus módulos</b><small>Explore os 12 assuntos</small></button><button class="member-card" id="open-quiz"><span>✏️</span><b>Simulados</b><small>Pratique e confira respostas</small></button><button class="member-card" id="open-history"><span>📈</span><b>Meu desempenho</b><small>Veja suas tentativas</small></button></div><div id="member-content"></div></main>`);
  document.querySelector("#open-lessons").onclick=()=>showLessons();
  document.querySelector("#open-quiz").onclick=()=>showQuiz();
  document.querySelector("#open-history").onclick=()=>showHistory();
  showLessons();
}

function showLessons() {
 const target=document.querySelector("#member-content");if(!target)return;
 target.innerHTML=`<div class="member-section-head"><div><div class="eyebrow">TRILHA COMPLETA</div><h2>Seus módulos</h2></div><span class="muted">12 módulos</span></div><div class="lesson-list">${modules.map((m,i)=>`<article class="lesson"><span class="module-num">${m[0]}</span><div><h3>${m[1]}</h3><p>${m[2]}</p></div><button class="btn btn-small btn-light" data-lesson="${i}">Estudar</button></article>`).join("")}</div>`;
 target.querySelectorAll("[data-lesson]").forEach(b=>b.onclick=()=>showLesson(Number(b.dataset.lesson)));
}
function showLesson(i) {
 const m=modules[i], target=document.querySelector("#member-content");
 const lessonText = [
  "Comece identificando os números naturais, inteiros, racionais e reais. Respeite a ordem das operações: parênteses, potências, multiplicações/divisões e adições/subtrações.",
  "Uma fração representa uma divisão. Para calcular p% de um valor, transforme p em decimal dividindo por 100 e multiplique pelo valor.",
  "Em grandezas diretamente proporcionais, as duas crescem juntas. Na regra de três, organize as grandezas e compare as razões.",
  "Juros simples: J = C × i × t. Montante: M = C + J. Em juros compostos: M = C(1+i)^t.",
  "Equação é uma igualdade com incógnita. Faça a mesma operação nos dois lados. Na função afim f(x)=ax+b, a indica a inclinação.",
  "Retângulo: A=b×h. Triângulo: A=(b×h)/2. Círculo: A=πr². Perímetro é a soma dos lados.",
  "Prisma: V=área da base×altura. Cilindro: V=πr²h. Sempre confira as unidades de medida.",
  "Média = soma dos valores ÷ quantidade. Mediana é o valor central dos dados ordenados. Moda é o valor mais frequente.",
  "Converta unidades antes de calcular. Em velocidade média, v=distância/tempo. Confira se as unidades são compatíveis.",
  "No triângulo retângulo: sen=oposto/hipotenusa, cos=adjacente/hipotenusa e tg=oposto/adjacente.",
  "Princípio fundamental: multiplique as possibilidades de etapas independentes. PA tem diferença constante; PG tem razão constante.",
  "Leia o comando, destaque os dados, estime a ordem de grandeza e elimine alternativas incompatíveis antes de calcular."
 ][i];
 target.innerHTML=`<button class="back-link" id="back-lessons">← Voltar aos módulos</button><div class="lesson-detail"><div class="eyebrow">MÓDULO ${m[0]}</div><h2>${m[1]}</h2><p>${m[2]}</p><div class="lesson-note"><h3>Resumo para estudar</h3><p>${lessonText}</p></div><div class="example-box"><b>Exemplo rápido</b><p>Calcule 15% de 200.</p><p>15% = 0,15. Então, 0,15 × 200 = <strong>30</strong>.</p></div><button class="btn btn-primary" id="try-quiz">Praticar questões →</button><p class="hint">Material introdutório. Revise as fórmulas e pratique para consolidar o aprendizado.</p></div>`;
 document.querySelector("#back-lessons").onclick=showLessons;document.querySelector("#try-quiz").onclick=showQuiz;
}
function showQuiz() {
 const target=document.querySelector("#member-content");if(!target)return;
 let index=0,answers=[],locked=false;
 const draw=()=>{
  const q=questions[index];
  target.innerHTML=`<div class="member-section-head"><div><div class="eyebrow">SIMULADO NOTAUP</div><h2>Matemática na prática</h2></div><span class="muted">Questão ${index+1} de ${questions.length}</span></div><div class="quiz-card"><div class="quiz-progress"><span style="width:${(index/questions.length)*100}%"></span></div><div class="eyebrow">QUESTÃO ${index+1}</div><h3>${q.q}</h3><div class="answer-list">${q.a.map((a,i)=>`<button class="answer" data-answer="${i}"><span>${"ABCDE"[i]}</span>${a}</button>`).join("")}</div><div id="explanation"></div><button class="btn btn-primary" id="next-question" disabled>${index===questions.length-1?"Finalizar simulado":"Próxima questão →"}</button></div>`;
  target.querySelectorAll("[data-answer]").forEach(b=>b.onclick=()=>{
   if(locked)return;locked=true;const chosen=Number(b.dataset.answer);answers[index]=chosen;
   target.querySelectorAll(".answer").forEach((el,i)=>{el.disabled=true;if(i===q.c)el.classList.add("correct");if(i===chosen&&i!==q.c)el.classList.add("wrong");});
   target.querySelector("#explanation").innerHTML=`<div class="explanation"><b>${chosen===q.c?"Muito bem!":"Vamos entender:"}</b><p>${q.e}</p></div>`;
   target.querySelector("#next-question").disabled=false;
  });
  target.querySelector("#next-question").onclick=async()=>{if(index<questions.length-1){index++;locked=false;draw();}else await finishQuiz();};
 };
 const finishQuiz=async()=>{
  const score=answers.reduce((n,a,i)=>n+(a===questions[i].c?1:0),0);
  if(supabase&&session) await supabase.from("quiz_attempts").insert({user_id:session.user.id,quiz_code:"diagnostico-matematica-01",score,total:questions.length,answers});
  target.innerHTML=`<div class="result-card"><div class="eyebrow">RESULTADO DO SIMULADO</div><div class="score">${score}/${questions.length}</div><h2>${score>=4?"Ótimo trabalho!":"Continue praticando!"}</h2><p>Você acertou ${score} de ${questions.length} questões.</p><button class="btn btn-primary" id="retry">Refazer simulado</button><button class="btn btn-light" id="to-lessons">Voltar aos módulos</button></div>`;
  document.querySelector("#retry").onclick=showQuiz;document.querySelector("#to-lessons").onclick=showLessons;
 };
 draw();
}
async function showHistory(){
 const target=document.querySelector("#member-content");if(!target)return;
 const {data,error}=await supabase.from("quiz_attempts").select("score,total,created_at,quiz_code").eq("user_id",session.user.id).order("created_at",{ascending:false}).limit(20);
 target.innerHTML=`<div class="member-section-head"><div><div class="eyebrow">SEU PROGRESSO</div><h2>Histórico de simulados</h2></div></div>${error||!data?.length?`<div class="empty-state">Você ainda não concluiu nenhum simulado. Que tal começar agora?</div>`:`<div class="history-list">${data.map(a=>`<div><span>${new Date(a.created_at).toLocaleDateString("pt-BR")}</span><b>${a.score}/${a.total} acertos</b><span>${Math.round(a.score/a.total*100)}%</span></div>`).join("")}</div>`}`;
}

async function init(){
 if(configured){
  const {data}=await supabase.auth.getSession();session=data.session;
  supabase.auth.onAuthStateChange((_event,newSession)=>{session=newSession;if(!session){hasAccess=false;if(activeView!=="home")renderHome();}});
  if(session){await claimPendingOrder();await refreshAccess();}
 }
 renderHome();
 const params=new URLSearchParams(location.search);
 if(params.get("pagamento")==="retorno" && params.get("order_nsu")){
   const orderNsu=params.get("order_nsu");
   localStorage.setItem("notaup_pending_order",orderNsu);
   setTimeout(async()=>{
     const res=await fetch("/api/check-order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({order_nsu:orderNsu})});
     const order=await res.json().catch(()=>({}));
     if(order.email)localStorage.setItem("notaup_pending_email",order.email);
     if(session){await claimPendingOrder();await renderDashboard();}
     else showAuth(true);
     if(order.status!=="paid")alert("Seu pedido está aguardando a confirmação da InfinitePay. Assim que o pagamento for confirmado, entre com o mesmo e-mail para liberar o curso.");
     history.replaceState({}, "", "/");
   },300);
 }
}
init();
