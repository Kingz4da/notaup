import { createClient } from "@supabase/supabase-js";
import "./style.css";
import { courseDays } from "./course.js";
import { simulados } from "./simulados.js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const configured = Boolean(SUPABASE_URL && SUPABASE_KEY && !SUPABASE_URL.includes("SEU-PROJETO"));
const supabase = configured ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;
const app = document.querySelector("#app");

const modules = courseDays.map((day, i) => [
  String(i + 1).padStart(2, "0"),
  day.title,
  day.goal
]);

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


function studentStoreKey(){return session?.user?.id?`notaup_study_${session.user.id}`:null;}
function readStudyData(){try{return JSON.parse(localStorage.getItem(studentStoreKey())||'{"completedDays":[],"wrong":[],"answered":[]}');}catch{return {completedDays:[],wrong:[],answered:[]};}}
function writeStudyData(data){const key=studentStoreKey();if(key)localStorage.setItem(key,JSON.stringify(data));}
function markAnswered(day,question,chosen,correct,explanation,options,questionText){const data=readStudyData();const id=day+":"+question;data.answered=data.answered.filter(x=>x.id!==id);data.answered.push({id,day,question,chosen,correct,explanation,options,q:questionText});if(chosen!==correct){data.wrong=data.wrong.filter(x=>x.id!==id);data.wrong.push({id,day,question,chosen,correct,explanation,options,q:questionText});}else{data.wrong=data.wrong.filter(x=>x.id!==id);}writeStudyData(data);}
function markDayComplete(day){const data=readStudyData();if(!data.completedDays.includes(day))data.completedDays.push(day);writeStudyData(data);}
function showFormulas(){
 const target=document.querySelector("#member-content");if(!target)return;
 const groups=[
 ["Porcentagem",["p% de V = (p ÷ 100) × V","Aumento: valor inicial × (1 + taxa)","Desconto: valor inicial × (1 − taxa)"],"Exemplo: 20% de 150 = 0,20 × 150 = 30."],
 ["Razão e proporção",["a/b = c/d","Regra de três: iguale as razões e multiplique cruzado"],"Exemplo: 3 cadernos custam R$ 18; 5 custam 18 × 5 ÷ 3 = R$ 30."],
 ["Média e estatística",["Média = soma dos valores ÷ quantidade","Amplitude = maior valor − menor valor","Frequência relativa = frequência ÷ total"],"Exemplo: média de 4, 6 e 8 = 18 ÷ 3 = 6."],
 ["Geometria plana",["Retângulo: A = base × altura","Triângulo: A = (base × altura) ÷ 2","Quadrado: A = lado²","Círculo: A = πr²","Perímetro: soma dos lados"],"Exemplo: retângulo 8 m × 5 m tem área de 40 m²."],
 ["Geometria espacial",["Paralelepípedo: V = comprimento × largura × altura","Cubo: V = lado³","Cilindro: V = πr²h"],"Exemplo: caixa 2 × 3 × 4 cm tem volume de 24 cm³."],
 ["Velocidade e unidades",["Velocidade média = distância ÷ tempo","Distância = velocidade × tempo","1 km = 1.000 m; 1 h = 60 min"],"Exemplo: 150 km em 3 h = 50 km/h."],
 ["Probabilidade",["P(A) = casos favoráveis ÷ casos possíveis"],"Exemplo: 2 resultados favoráveis em 8 possíveis = 2/8 = 25%."],
 ["Pitágoras e trigonometria",["a² = b² + c² (hipotenusa²)","sen = cateto oposto ÷ hipotenusa","cos = cateto adjacente ÷ hipotenusa","tg = cateto oposto ÷ cateto adjacente"],"Exemplo: catetos 3 e 4 formam hipotenusa 5."]
 ];
 target.innerHTML=`<button class="back-link" id="tools-back">← Voltar à área do aluno</button><div class="member-section-head"><div><div class="eyebrow">CONSULTA RÁPIDA</div><h2>Biblioteca de fórmulas</h2></div></div><div class="formula-library">${groups.map(g=>`<article class="formula-card"><h3>${g[0]}</h3><ul>${g[1].map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul><p>${g[2]}</p></article>`).join("")}</div>`;
 target.querySelector("#tools-back").onclick=renderDashboard;
}
function showFlashcards(){
 const target=document.querySelector("#member-content");if(!target)return;
 const cards=[["Como calcular porcentagem?","Multiplique o valor pela taxa em forma decimal. Ex.: 15% = 0,15."],["Qual é a fórmula da média?","Some todos os valores e divida pela quantidade."],["Como calcular a área do retângulo?","Base × altura. A unidade fica ao quadrado."],["Como calcular velocidade média?","Distância percorrida dividida pelo tempo gasto."],["O que é mediana?","É o valor central dos dados depois de ordená-los."],["Como calcular probabilidade simples?","Casos favoráveis divididos pelo total de casos possíveis."],["Qual é o teorema de Pitágoras?","Em triângulo retângulo: hipotenusa² = cateto₁² + cateto₂²."],["Como converter minutos em horas?","Divida os minutos por 60. Ex.: 30 min = 0,5 h."]];
 let index=0,flipped=false;
 const draw=()=>{const c=cards[index];target.innerHTML=`<button class="back-link" id="flash-back">← Voltar à área do aluno</button><div class="member-section-head"><div><div class="eyebrow">REVISÃO ATIVA</div><h2>Flashcards de matemática</h2></div><span class="muted">${index+1} de ${cards.length}</span></div><button class="flashcard ${flipped?"flipped":""}" id="flash-card"><small>${flipped?"RESPOSTA":"PERGUNTA"} • TOQUE PARA VIRAR</small><strong>${escapeHtml(flipped?c[1]:c[0])}</strong></button><div class="flash-actions"><button class="btn btn-light" id="flash-prev" ${index===0?"disabled":""}>Anterior</button><button class="btn btn-primary" id="flash-next">${index===cards.length-1?"Recomeçar":"Próximo"}</button></div>`;target.querySelector("#flash-back").onclick=renderDashboard;target.querySelector("#flash-card").onclick=()=>{flipped=!flipped;draw();};target.querySelector("#flash-prev").onclick=()=>{index=Math.max(0,index-1);flipped=false;draw();};target.querySelector("#flash-next").onclick=()=>{index=index===cards.length-1?0:index+1;flipped=false;draw();};};
 draw();
}
function showWrongAnswers(){
 const target=document.querySelector("#member-content");if(!target)return;
 const data=readStudyData();
 target.innerHTML=`<button class="back-link" id="wrong-back">← Voltar à área do aluno</button><div class="member-section-head"><div><div class="eyebrow">REVISÃO PERSONALIZADA</div><h2>Meu caderno de erros</h2></div><span class="muted">${data.wrong.length} para revisar</span></div>${data.wrong.length?data.wrong.map((q,i)=>`<article class="course-exercise"><b>Dia ${q.day} • Questão ${q.question+1}</b><p>${escapeHtml(q.q||"Questão da trilha")}</p><p><b>Resposta correta:</b> ${"ABCDE"[q.correct]||"—"} — ${escapeHtml(q.options?.[q.correct]||"")}</p><div class="explanation"><p>${escapeHtml(q.explanation)}</p></div><button class="btn btn-light btn-small" data-remove-wrong="${i}">Marcar como revisada</button></article>`).join(""):`<div class="empty-state">Nenhum erro registrado ainda. Responda às questões dos módulos para montar seu caderno de revisão.</div>`}`;
 target.querySelector("#wrong-back").onclick=renderDashboard;target.querySelectorAll("[data-remove-wrong]").forEach(b=>b.onclick=()=>{const d=readStudyData();d.wrong.splice(Number(b.dataset.removeWrong),1);writeStudyData(d);showWrongAnswers();});
}

function shell(content) {
  app.innerHTML = `<header class="nav"><a class="brand" id="brand-home" href="${session ? "#member-top" : "#inicio"}"><span class="brand-mark">N</span> NotaUp</a><nav>${session ? '<a href="#member-top" data-member-home>Início</a><a href="#member-content" data-member-content>Conteúdo</a><a href="#member-content" data-member-help>Dúvidas</a>' : '<a href="#conteudo">Conteúdo</a><a href="#como-funciona">Como funciona</a><a href="#duvidas">Dúvidas</a>'}</nav><div class="nav-actions">${session ? `<button class="btn btn-light" id="go-dashboard">Minha área</button><button class="text-btn" id="logout">Sair</button>` : `<button class="btn btn-light" id="open-login">Entrar</button><button class="btn btn-yellow" id="top-buy">Comprar agora · R$ 19,90</button>`}</div><button class="mobile-menu" id="mobile-menu">☰</button></header>${content}<footer><div class="brand"><span class="brand-mark">N</span> NotaUp</div><p>Preparação independente para o ENEM. A NotaUp não é afiliada ao INEP ou ao Ministério da Educação.</p><p><strong>Atendimento e cancelamento:</strong> <a href="https://wa.me/5534999245144?text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20a%20NotaUp." target="_blank" rel="noopener noreferrer">WhatsApp Business: +55 (34) 99924-5144</a></p><small>© ${new Date().getFullYear()} NotaUp. Todos os direitos reservados.</small></footer>`;
  document.querySelector("#brand-home")?.addEventListener("click",e=>{if(session){e.preventDefault();renderDashboard();window.scrollTo({top:0,behavior:"smooth"});}});
  document.querySelector("[data-member-home]")?.addEventListener("click",e=>{e.preventDefault();renderDashboard();window.scrollTo({top:0,behavior:"smooth"});});
  document.querySelector("[data-member-content]")?.addEventListener("click",e=>{e.preventDefault();if(hasAccess)showLessons();else renderDashboard();document.querySelector("#member-content")?.scrollIntoView({behavior:"smooth"});});
  document.querySelector("[data-member-help]")?.addEventListener("click",e=>{e.preventDefault();if(hasAccess)showMemberHelp();else renderDashboard();document.querySelector("#member-content")?.scrollIntoView({behavior:"smooth"});});
  document.querySelector("#open-login")?.addEventListener("click", showAuth);
  document.querySelector("#top-buy")?.addEventListener("click", startCheckout);
  document.querySelector("#logout")?.addEventListener("click", async()=>{await supabase?.auth.signOut();session=null;hasAccess=false;renderHome();});
  document.querySelector("#go-dashboard")?.addEventListener("click", renderDashboard);
  document.querySelector("#mobile-menu")?.addEventListener("click",()=>document.querySelector(".nav nav")?.classList.toggle("show"));
}

function renderHome() {
  activeView="home";
  shell(`<main>
    <section class="hero" id="inicio"><div class="hero-copy"><div class="eyebrow"><span></span> INTENSIVO DE MATEMÁTICA ENEM</div><h1>Matemática sem medo. <em>Mais confiança</em> na prova.</h1><p>Do básico ao avançado, com explicações diretas, exemplos resolvidos e simulados para você praticar no seu ritmo.</p><div class="hero-actions"><a class="btn btn-yellow" href="#comprar">Quero começar agora <span>→</span></a><a class="link-btn" href="#conteudo">Ver o conteúdo</a></div><div class="trust"><span>✓ Acesso vitalício</span><span>✓ Estude no seu ritmo</span><span>✓ Simulados online</span></div></div><div class="hero-art"><div class="math-card card-top"><small>DESAFIO DO DIA</small><strong>25% de 200</strong><span>Você consegue?</span></div><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="big-seven">7<span>dias de foco</span></div><div class="math-card card-bottom"><b>✓</b><span>Aprender • Praticar • Evoluir</span></div></div></section>
    <section class="stats"><div><strong>7</strong><span>dias de estudo guiado</span></div><div><strong>Do básico</strong><span>à revisão estratégica</span></div><div><strong>35</strong><span>questões com correção</span></div></section>
    <section class="section" id="conteudo"><div class="section-heading"><div class="eyebrow">TRILHA DE APRENDIZADO</div><h2>O que você vai estudar</h2><p>Uma trilha organizada para construir a base e avançar nos principais assuntos de matemática cobrados no ENEM.</p></div><div class="module-grid">${modules.map(m=>`<article class="module"><span class="module-num">${m[0]}</span><h3>${m[1]}</h3><p>${m[2]}</p></article>`).join("")}</div></section>
    <section class="split-section" id="como-funciona"><div><div class="eyebrow">SEU ESTUDO, SEU RITMO</div><h2>Aprenda. Resolva. Entenda onde melhorar.</h2><p>Assista às aulas, leia os materiais e teste o que aprendeu com simulados interativos. Seu progresso fica salvo na sua conta.</p><ul class="check-list"><li>Conteúdo dividido por assunto</li><li>Questões de múltipla escolha</li><li>Correção e explicação após responder</li><li>Histórico de tentativas</li></ul></div><div class="progress-card"><div class="progress-head"><span>Minha evolução</span><span class="live-dot">● AO SEU RITMO</span></div><div class="progress-circle"><strong>7</strong><span>dias de foco</span></div><div class="progress-line"><span style="width:72%"></span></div><div class="progress-foot"><span>Estude um pouco todos os dias</span><b>72%</b></div></div></section>
    <section class="pricing" id="comprar"><div class="pricing-inner"><div class="eyebrow">COMECE HOJE</div><h2>Seu próximo passo começa com uma questão.</h2><p>Tenha acesso à trilha de matemática e à área de simulados da NotaUp.</p><div class="price"><small>Pagamento único</small><strong>R$ 19,90</strong><span>Sem mensalidade • Acesso vitalício</span></div><button class="btn btn-yellow btn-wide" id="buy">Garantir meu acesso <span>→</span></button><small class="secure">🔒 Pagamento processado pela InfinitePay</small><p class="fine-print">Acesso vitalício após a confirmação do pagamento. Conteúdo independente; videoaulas de terceiros permanecem hospedadas no YouTube.</p></div></section>
    <section class="section faq" id="duvidas"><div class="section-heading"><div class="eyebrow">DÚVIDAS FREQUENTES</div><h2>Antes de começar</h2></div><details><summary>O acesso é vitalício?</summary><p>Sim. Após a confirmação do pagamento, o acesso ao produto adquirido fica associado à sua conta.</p></details><details><summary>Preciso estudar em horário fixo?</summary><p>Não. Você pode acessar os conteúdos quando quiser, usando celular ou computador.</p></details><details><summary>O material é oficial do ENEM?</summary><p>Não. A NotaUp é uma iniciativa independente de preparação. As atividades autorais são inspiradas no formato de questões do ENEM.</p></details><details><summary>Como recebo o acesso?</summary><p>Após pagar, você retorna à NotaUp, cria sua conta com o mesmo e-mail informado no checkout e aguarda a confirmação automática da InfinitePay. Se já tiver conta, basta entrar.</p></details><details><summary>As videoaulas são da NotaUp?</summary><p>As videoaulas são conteúdos públicos de professores e canais independentes no YouTube. A NotaUp organiza os links junto com resumos e exercícios autorais; os vídeos continuam sujeitos às regras e disponibilidade do YouTube.</p></details><details><summary>O que está incluído nos R$ 19,90?</summary><p>Acesso vitalício à trilha intensiva de sete dias, explicações escritas, exemplos, exercícios e simulados disponíveis na plataforma.</p></details><details><summary>Consigo estudar pelo celular?</summary><p>Sim, a plataforma pode ser acessada pelo navegador do celular ou computador com conexão à internet.</p></details><details><summary>Como falar com o atendimento ou pedir cancelamento?</summary><p>Entre em contato pelo WhatsApp Business <a href="https://wa.me/5534999245144?text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20a%20NotaUp." target="_blank" rel="noopener noreferrer">+55 (34) 99924-5144</a>. Para compras online, você também pode exercer o direito de arrependimento no prazo legal de 7 dias, conforme o Código de Defesa do Consumidor. Informe o número do pedido e o e-mail usado na compra para localizarmos sua solicitação.</p></details></section>
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
  name.style.display=signup?"block":"none";
  name.required=signup;
  if(signup){title.textContent="Crie sua conta";desc.textContent="Finalize seu cadastro para acessar a NotaUp.";submit.textContent="Criar conta";sw.textContent="Já tem conta? Entrar";}
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
  const button=document.querySelector("#buy");if(button){button.disabled=true;button.textContent="Preparando checkout...";}
  try{
    const res=await fetch("/api/create-checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({})});
    const body=await res.json();if(!res.ok)throw new Error(body.error||"Não foi possível iniciar o pagamento.");
    localStorage.setItem("notaup_pending_order",body.orderNsu);
    location.href=body.checkoutUrl;
  }catch(e){alert(e.message);if(button){button.disabled=false;button.innerHTML='Garantir meu acesso <span>→</span>';}}
}

async function claimPendingOrder(){
  const orderNsu=localStorage.getItem("notaup_pending_order");
  if(!orderNsu||!session||!supabase)return false;
  const {data:{session:current}}=await supabase.auth.getSession();
  const res=await fetch("/api/check-order",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${current.access_token}`},body:JSON.stringify({order_nsu:orderNsu,transaction_nsu:localStorage.getItem("notaup_transaction_nsu"),slug:localStorage.getItem("notaup_invoice_slug")})});
  const body=await res.json();
  if(!res.ok){if(body.error)alert(body.error);return false;}
  if(body.status!=="paid"){alert("Ainda estamos aguardando a confirmação do pagamento. Assim que a InfinitePay confirmar, entre novamente para liberar o curso.");return false;}
  if(body.hasAccess){localStorage.removeItem("notaup_pending_order");localStorage.removeItem("notaup_transaction_nsu");localStorage.removeItem("notaup_invoice_slug");return true;}
  return false;
}

async function renderDashboard() {
  activeView="dashboard";
  if(!session){showAuth();return;}
  await refreshAccess();
  if(!hasAccess){
    shell(`<main class="member-wrap"><div class="member-top" id="member-top"><div><div class="eyebrow">SUA CONTA NOTAUP</div><h1>Olá, ${escapeHtml(session.user.user_metadata?.full_name||session.user.email.split("@")[0])}!</h1><p>Seu espaço de estudos está quase pronto.</p></div><span class="status-pill pending">Acesso não liberado</span></div><div class="locked-card"><div class="lock-icon">🔐</div><h2>Desbloqueie sua área de estudos</h2><p>Adquira o Intensivo de Matemática por R$ 19,90 e tenha acesso vitalício.</p><button class="btn btn-primary" id="member-buy">Comprar acesso</button><p class="hint">Já pagou? A liberação acontece após a confirmação da InfinitePay. Atualize esta página em alguns instantes.</p><button class="text-btn" id="refresh-access">Verificar meu acesso</button></div></main>`);
    document.querySelector("#member-buy").onclick=startCheckout;document.querySelector("#refresh-access").onclick=async()=>{await claimPendingOrder();await renderDashboard();};return;
  }
  shell(`<main class="member-wrap"><div class="member-top" id="member-top"><div><div class="eyebrow">ÁREA DO ALUNO</div><h1>Vamos estudar, ${escapeHtml(session.user.user_metadata?.full_name||"estudante")}?</h1><p>Escolha um módulo ou pratique com um simulado.</p></div><span class="status-pill active">✓ Acesso vitalício ativo</span></div><div class="student-progress" id="student-progress"></div><div class="member-cards"><button class="member-card" id="open-lessons"><span>📚</span><b>Meus módulos</b><small>Trilha intensiva • 7 dias</small></button><button class="member-card" id="open-quiz"><span>✏️</span><b>Simulados</b><small>Questões e provas anteriores</small></button><button class="member-card" id="open-wrong"><span>🧠</span><b>Caderno de erros</b><small>Revise o que precisa melhorar</small></button><button class="member-card" id="open-formulas"><span>📐</span><b>Fórmulas</b><small>Consulta rápida de matemática</small></button><button class="member-card" id="open-flashcards"><span>🗂️</span><b>Flashcards</b><small>Memorize conceitos importantes</small></button><button class="member-card" id="open-help"><span>❔</span><b>Dúvidas</b><small>Ajuda, acesso e atendimento</small></button><button class="member-card" id="open-history"><span>📈</span><b>Meu desempenho</b><small>Veja suas tentativas</small></button></div><div id="member-content"></div></main>`);
  document.querySelector("#open-lessons").onclick=()=>showLessons();
  document.querySelector("#open-quiz").onclick=()=>showQuiz();
  document.querySelector("#open-wrong").onclick=showWrongAnswers;
  document.querySelector("#open-formulas").onclick=showFormulas;
  document.querySelector("#open-flashcards").onclick=showFlashcards;
  document.querySelector("#open-help").onclick=()=>showMemberHelp();
  renderStudentProgress();
  document.querySelector("#open-history").onclick=()=>showHistory();
  showLessons();
}


function renderStudentProgress(){
 const el=document.querySelector("#student-progress");if(!el)return;
 const d=readStudyData(),done=d.completedDays.length,total=courseDays.length,answered=d.answered.length,percent=Math.round(done/total*100);
 el.innerHTML=`<div class="progress-summary"><div><span class="eyebrow">SEU PROGRESSO</span><h2>${percent}% da trilha concluída</h2><p>${done} de ${total} dias concluídos • ${answered} questões respondidas • ${d.wrong.length} erros para revisar</p></div><div class="progress-track"><span style="width:${percent}%"></span></div></div>`;
}

function showMemberHelp() {
 const target=document.querySelector("#member-content");if(!target)return;
 target.innerHTML=`<div class="member-section-head"><div><div class="eyebrow">CENTRAL DE AJUDA</div><h2>Dúvidas e atendimento</h2></div></div><div class="member-help"><details open><summary>Como encontro as aulas?</summary><p>Abra Conteúdo no menu ou clique em Meus módulos. Escolha um dos sete dias para acessar explicações, videoaulas e exercícios.</p></details><details><summary>Como funcionam os simulados?</summary><p>Escolha um simulado, marque uma alternativa por questão e veja a correção comentada. Seu resultado pode ser salvo no histórico quando sua conta estiver conectada.</p></details><details><summary>Não consigo acessar o curso. O que faço?</summary><p>Confira se entrou com o mesmo e-mail usado no cadastro após a compra. Se o pagamento já foi confirmado e o acesso não apareceu, entre em contato com o atendimento.</p></details><details><summary>Como pedir ajuda ou cancelamento?</summary><p>Fale pelo WhatsApp Business <a href="https://wa.me/5534999245144" target="_blank" rel="noopener noreferrer">+55 (34) 99924-5144</a>. Informe o e-mail da compra e o número do pedido. O direito de arrependimento nas compras online segue o prazo legal aplicável.</p></details></div><p><a class="back-link" href="#member-top" id="help-back">← Voltar ao início da área do aluno</a></p>`;
 target.querySelector("#help-back").onclick=e=>{e.preventDefault();renderDashboard();window.scrollTo({top:0,behavior:"smooth"});};
}
function showLessons() {
 const target=document.querySelector("#member-content");if(!target)return;
 target.innerHTML=`<div class="member-section-head"><div><div class="eyebrow">TRILHA COMPLETA</div><h2>Sua trilha de 7 dias</h2></div><span class="muted">7 dias de estudo</span></div><div class="lesson-list">${modules.map((m,i)=>`<article class="lesson"><span class="module-num">${m[0]}</span><div><h3>${m[1]}</h3><p>${m[2]}</p></div><button class="btn btn-small btn-light" data-lesson="${i}">Começar</button></article>`).join("")}</div>`;
 target.querySelectorAll("[data-lesson]").forEach(b=>b.onclick=()=>showLesson(Number(b.dataset.lesson)));
}
function showLesson(i) {
 const day=courseDays[i], target=document.querySelector("#member-content");
 if(!target||!day)return;
 const videoLinks=day.videos.map(v=>`<a class="resource-link" href="${v.url}" target="_blank" rel="noopener noreferrer"><b>${escapeHtml(v.title)}</b><span>${escapeHtml(v.note)}</span><small>Assistir no YouTube ↗</small></a>`).join("");
 const topics=day.topics.map(t=>`<li>${escapeHtml(t)}</li>`).join("");
 const lessons=day.lessons.map((p,j)=>`<section class="course-topic"><h3>${j+1}. ${escapeHtml(p.heading)}</h3><p>${escapeHtml(p.text)}</p>${p.formula?`<div class="formula-box"><b>Guarde:</b> ${escapeHtml(p.formula)}</div>`:""}${p.example?`<div class="example-box"><b>Exemplo resolvido</b><p>${escapeHtml(p.example)}</p></div>`:""}</section>`).join("");
 const exercises=day.exercises.map((q,j)=>`<article class="course-exercise" data-exercise="${j}"><b>Questão ${j+1}</b><p>${escapeHtml(q.q)}</p><div class="answer-list">${q.options.map((a,k)=>`<button class="answer" data-course-answer="${j}-${k}"><span>${"ABCDE"[k]}</span>${escapeHtml(a)}</button>`).join("")}</div><div class="course-feedback" id="course-feedback-${j}"></div></article>`).join("");
 target.innerHTML=`<button class="back-link" id="back-lessons">← Voltar aos dias</button><div class="lesson-detail course-day"><div class="eyebrow">INTENSIVO DE 7 DIAS • DIA ${i+1}</div><h2>${escapeHtml(day.title)}</h2><p>${escapeHtml(day.goal)}</p><div class="study-plan"><b>Roteiro de hoje</b><span>${escapeHtml(day.plan)}</span></div><h3>O que você vai aprender</h3><ul class="check-list">${topics}</ul><h3>Aula explicada</h3>${lessons}<h3>Videoaulas gratuitas</h3><div class="resource-list">${videoLinks}</div><h3>Hora de praticar</h3><p>Resolva sem olhar a resposta. Depois confira a explicação e refaça as que errar.</p>${exercises}<div class="example-box"><b>Meta do dia</b><p>${escapeHtml(day.homework)}</p></div><button class="btn btn-primary" id="complete-day">✓ Marcar dia como concluído</button><button class="btn btn-light" id="back-lessons-bottom">Voltar à trilha</button></div>`;
 document.querySelector("#back-lessons").onclick=showLessons;
 document.querySelector("#back-lessons-bottom").onclick=showLessons;
 target.querySelector("#complete-day").onclick=()=>{markDayComplete(i);renderStudentProgress();alert("Dia marcado como concluído!");};

 target.querySelectorAll("[data-course-answer]").forEach(button=>button.onclick=()=>{
  const [qi,ai]=button.dataset.courseAnswer.split("-").map(Number),q=day.exercises[qi],card=target.querySelector(`[data-exercise="${qi}"]`);
  if(card.dataset.answered)return;
  card.dataset.answered="1";
  card.querySelectorAll("[data-course-answer]").forEach(b=>{const [,option]=b.dataset.courseAnswer.split("-").map(Number);b.disabled=true;if(option===q.answer)b.classList.add("correct");if(option===ai&&ai!==q.answer)b.classList.add("wrong");});
  markAnswered(i,qi,ai,q.answer,q.explanation,q.options,q.q);card.querySelector("#course-feedback-"+qi).innerHTML=`<div class="explanation"><b>${ai===q.answer?"Resposta correta!":"Vamos corrigir:"}</b><p>${escapeHtml(q.explanation)}</p></div>`;
 });
}
function showQuiz(selectedId = null) {
 const target=document.querySelector("#member-content");if(!target)return;
 const official=[
  {year:"2024",url:"https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2024"},
  {year:"2023",url:"https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2023"},
  {year:"2022",url:"https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2022"},
  {year:"2021",url:"https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2021"}
 ];
 const custom=simulados.map(s=>({id:s.id,title:s.title,description:s.description,questions:s.questions}));
 const all=[{id:"trilha-35",title:"Simulado geral — 35 questões",description:"Questões de revisão dos sete módulos da NotaUp.",questions:courseDays.flatMap((day,di)=>day.exercises.map(q=>({...q,day:di+1})))},...custom];
 if(!selectedId){
  target.innerHTML=`<div class="member-section-head"><div><div class="eyebrow">TREINO PARA O ENEM</div><h2>Escolha seu simulado</h2></div><span class="muted">Correção comentada</span></div><div class="mock-exam-grid">${all.map(s=>`<article class="mock-exam-card"><div class="eyebrow">${s.questions.length} QUESTÕES</div><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.description)}</p><button class="btn btn-primary" data-start-exam="${s.id}">Começar simulado →</button></article>`).join("")}</div><section class="official-exams"><div class="eyebrow">PROVAS OFICIAIS</div><h2>Questões que já caíram no ENEM</h2><p>Abra os cadernos e gabaritos oficiais publicados pelo INEP. Selecione o segundo dia para encontrar Matemática e suas Tecnologias.</p><div class="official-links">${official.map(x=>`<a class="resource-link" href="${x.url}" target="_blank" rel="noopener noreferrer"><b>ENEM ${x.year} — provas e gabaritos</b><small>Consultar no portal oficial do INEP ↗</small></a>`).join("")}<a class="resource-link" href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos" target="_blank" rel="noopener noreferrer"><b>Ver todos os anos disponíveis</b><small>Arquivo oficial do INEP ↗</small></a></div><p class="exam-note">Os dois simulados NotaUp são autorais e inspirados no estilo contextualizado do ENEM. As provas anteriores são disponibilizadas pelo INEP nos links oficiais; não são reproduzidas integralmente nesta plataforma.</p></section>`;
  target.querySelectorAll("[data-start-exam]").forEach(b=>b.onclick=()=>showQuiz(b.dataset.startExam));
  return;
 }
 const selected=all.find(s=>s.id===selectedId);if(!selected){showQuiz();return;}
 const pool=selected.questions;
 let index=0,answers=[],locked=false;
 const draw=()=>{
  const q=pool[index];
  target.innerHTML=`<button class="back-link" id="back-exams">← Voltar aos simulados</button><div class="member-section-head"><div><div class="eyebrow">SIMULADO NOTAUP</div><h2>${escapeHtml(selected.title)}</h2></div><span class="muted">Questão ${index+1} de ${pool.length}</span></div><div class="quiz-card"><div class="quiz-progress"><span style="width:${(index/pool.length)*100}%"></span></div><div class="eyebrow">QUESTÃO ${index+1}</div><h3>${escapeHtml(q.q)}</h3><div class="answer-list">${q.options.map((a,i)=>`<button class="answer" data-answer="${i}"><span>${"ABCDE"[i]}</span>${escapeHtml(a)}</button>`).join("")}</div><div id="explanation"></div><button class="btn btn-primary" id="next-question" disabled>${index===pool.length-1?"Finalizar simulado":"Próxima questão →"}</button></div>`;
  target.querySelector("#back-exams").onclick=()=>showQuiz();
  target.querySelectorAll("[data-answer]").forEach(b=>b.onclick=()=>{
   if(locked)return;locked=true;const chosen=Number(b.dataset.answer);answers[index]=chosen;markAnswered("simulado-"+selected.id,index,chosen,q.answer,q.explanation,q.options,q.q);
   target.querySelectorAll(".answer").forEach((el,i)=>{el.disabled=true;if(i===q.answer)el.classList.add("correct");if(i===chosen&&i!==q.answer)el.classList.add("wrong");});
   target.querySelector("#explanation").innerHTML=`<div class="explanation"><b>${chosen===q.answer?"Muito bem!":"Vamos entender:"}</b><p>${escapeHtml(q.explanation)}</p><button class="btn btn-light btn-small" id="retry-one">↻ Refazer esta questão</button></div>`;
   target.querySelector("#retry-one").onclick=()=>{answers[index]=undefined;locked=false;draw();};
   target.querySelector("#next-question").disabled=false;
  });
  target.querySelector("#next-question").onclick=()=>{if(index<pool.length-1){index++;locked=false;draw();}else finishQuiz();};
 };
 const finishQuiz=async()=>{
  const score=answers.reduce((n,a,i)=>n+(a===pool[i].answer?1:0),0);
  if(supabase&&session)await supabase.from("quiz_attempts").insert({user_id:session.user.id,quiz_code:selected.id,score,total:pool.length,answers});
  target.innerHTML=`<div class="result-card"><div class="eyebrow">RESULTADO DO SIMULADO</div><div class="score">${score}/${pool.length}</div><h2>${score>=Math.ceil(pool.length*.8)?"Excelente trabalho!":"Continue praticando!"}</h2><p>Você acertou ${score} de ${pool.length} questões.</p><button class="btn btn-primary" id="retry">↻ Refazer todas as questões</button><button class="btn btn-light" id="to-exams">Ver outros simulados</button></div>`;
  document.querySelector("#retry").onclick=()=>showQuiz(selected.id);document.querySelector("#to-exams").onclick=()=>showQuiz();
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
     if(params.get("transaction_nsu"))localStorage.setItem("notaup_transaction_nsu",params.get("transaction_nsu"));
     if(params.get("slug"))localStorage.setItem("notaup_invoice_slug",params.get("slug"));
     if(session){await claimPendingOrder();await renderDashboard();}
     else showAuth(true);
     if(order.status!=="paid")alert("Seu pedido está aguardando a confirmação da InfinitePay. Assim que o pagamento for confirmado, entre com o mesmo e-mail para liberar o curso.");
     history.replaceState({}, "", "/");
   },300);
 }
}
init();
