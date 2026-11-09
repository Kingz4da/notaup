export const courseDays = [
{
 title:"Fundamentos, operações e porcentagem",
 goal:"Dominar contas essenciais, frações, decimais, razão e porcentagem — ferramentas que aparecem em muitos problemas contextualizados.",
 plan:"Estude a teoria por 45 min, assista a uma aula, resolva as 5 questões e anote os erros.",
 topics:["Operações e prioridade dos cálculos","Frações, decimais e conversões","Razão, proporção e regra de três","Porcentagem, aumentos e descontos"],
 lessons:[
  {heading:"Ordem das operações",text:"Resolva primeiro o que está entre parênteses; depois potências e raízes; depois multiplicações e divisões; por último adições e subtrações. Em operações de mesma prioridade, siga da esquerda para a direita.",formula:"( ) → potências/raízes → × e ÷ → + e −",example:"Em 18 − 2 × (3 + 4), faça primeiro 3 + 4 = 7; depois 2 × 7 = 14; por fim 18 − 14 = 4."},
  {heading:"Frações e decimais",text:"Uma fração representa uma divisão: 3/4 = 3 ÷ 4 = 0,75. Para somar frações, use denominadores iguais. Para multiplicar, multiplique numeradores e denominadores. Para dividir, multiplique pela fração inversa.",formula:"a/b + c/d: iguale denominadores | (a/b) × (c/d) = ac/bd",example:"1/2 + 1/4 = 2/4 + 1/4 = 3/4 = 0,75."},
  {heading:"Regra de três",text:"Identifique as grandezas e veja se são diretamente proporcionais (uma aumenta e a outra também) ou inversamente proporcionais (uma aumenta e a outra diminui). Organize os valores na mesma unidade antes de calcular.",formula:"Direta: x = (b × c) ÷ a",example:"Se 3 cadernos custam R$ 24, então 5 custam 24 × 5 ÷ 3 = R$ 40."},
  {heading:"Porcentagem",text:"Porcentagem significa 'por cem'. Transforme a taxa em decimal dividindo por 100 e multiplique pelo valor. Em desconto, subtraia; em aumento, some. Para variações sucessivas, aplique cada taxa sobre o novo valor.",formula:"p% de V = (p ÷ 100) × V",example:"Um produto de R$ 200 com 15% de desconto: 0,15 × 200 = 30; preço final = R$ 170."}
 ],
 videos:[
  {title:"Porcentagem e matemática básica — Professor Ferretto",note:"Aula e revisão de fundamentos",url:"https://www.youtube.com/results?search_query=Professor+Ferretto+matem%C3%A1tica+b%C3%A1sica+porcentagem"},
  {title:"Regra de três — Matemática Rio",note:"Exemplos passo a passo",url:"https://www.youtube.com/results?search_query=Matem%C3%A1tica+Rio+regra+de+tr%C3%AAs"}
 ],
 exercises:[
  {q:"Uma mochila custa R$ 160 e está com 25% de desconto. Qual é o preço final?",options:["R$ 100","R$ 110","R$ 120","R$ 125","R$ 140"],answer:2,explanation:"25% de 160 = 40. Então 160 − 40 = R$ 120."},
  {q:"Uma receita usa 3 xícaras para 4 pessoas. Quantas xícaras são necessárias para 8 pessoas?",options:["4","5","6","7","8"],answer:2,explanation:"É uma proporção direta: 3 × 8 ÷ 4 = 6 xícaras."},
  {q:"Qual fração corresponde a 0,2?",options:["1/2","1/3","1/4","1/5","2/5"],answer:3,explanation:"0,2 = 2/10. Simplificando por 2, temos 1/5."},
  {q:"Um salário de R$ 1.500 aumenta 10%. Qual é o novo valor?",options:["R$ 1.550","R$ 1.600","R$ 1.650","R$ 1.700","R$ 1.750"],answer:2,explanation:"10% de 1.500 = 150. Novo salário: 1.500 + 150 = R$ 1.650."},
  {q:"Calcule 24 ÷ 3 + 2 × 5.",options:["10","13","16","18","20"],answer:3,explanation:"Divisão e multiplicação primeiro: 24 ÷ 3 = 8 e 2 × 5 = 10. Depois 8 + 10 = 18."}
 ],
 homework:"Refaça as questões erradas e treine cálculo mental de 10%, 20%, 25%, 50% e  suas frações equivalentes."
},
{
 title:"Matemática financeira, unidades e escalas",
 goal:"Resolver situações com dinheiro, juros, conversões, velocidade, densidade e escalas.",
 plan:"Monte uma folha de fórmulas e pratique sempre convertendo as unidades antes de calcular.",
 topics:["Aumentos e descontos sucessivos","Juros simples e compostos","Conversão de comprimento, área, volume e tempo","Velocidade média e escalas"],
 lessons:[
  {heading:"Juros e porcentagens sucessivas",text:"Em juros simples, a taxa incide sempre sobre o capital inicial. Em juros compostos, cada período incide sobre o montante anterior. Confira se a taxa e o tempo estão na mesma unidade (ao mês com meses, ao ano com anos).",formula:"Simples: J = C × i × t; M = C + J | Compostos: M = C(1+i)^t",example:"R$ 1.000 a 2% ao mês por 3 meses em juros simples: J = 1.000 × 0,02 × 3 = R$ 60; montante = R$ 1.060."},
  {heading:"Conversão de unidades",text:"Comprimento: cada casa entre km, hm, dam, m, dm, cm e mm muda por fator 10. Área muda por fator 100 a cada casa; volume, por 1.000. Uma hora tem 60 minutos e uma hora tem 3.600 segundos.",formula:"1 km = 1.000 m | 1 m² = 10.000 cm² | 1 L = 1.000 mL",example:"2,5 km = 2,5 × 1.000 = 2.500 metros."},
  {heading:"Velocidade média",text:"Velocidade média é a distância total dividida pelo tempo total. Não confunda com média simples de velocidades quando os tempos são diferentes. Converta minutos para horas se a velocidade estiver em km/h.",formula:"vₘ = distância ÷ tempo",example:"Um carro percorre 150 km em 2,5 h: vₘ = 150 ÷ 2,5 = 60 km/h."},
  {heading:"Escalas",text:"A escala compara a medida no desenho com a medida real, sempre na mesma unidade. Escala 1:100 significa que 1 cm no desenho representa 100 cm na realidade.",formula:"Escala = medida no desenho ÷ medida real",example:"Em uma planta 1:200, uma parede de 4 cm representa 4 × 200 = 800 cm = 8 m."}
 ],
 videos:[
  {title:"Matemática financeira para o ENEM — Professor Ferretto",note:"Juros, taxas e descontos",url:"https://www.youtube.com/results?search_query=Professor+Ferretto+matem%C3%A1tica+financeira+ENEM"},
  {title:"Grandezas e medidas — Khan Academy",note:"Conversões e medidas",url:"https://pt.khanacademy.org/math"}
 ],
 exercises:[
  {q:"R$ 800 aplicados a juros simples de 2% ao mês por 5 meses geram qual montante?",options:["R$ 820","R$ 840","R$ 860","R$ 880","R$ 900"],answer:3,explanation:"J = 800 × 0,02 × 5 = R$ 80. Montante = 800 + 80 = R$ 880."},
  {q:"3,2 km correspondem a:",options:["32 m","320 m","3.020 m","3.200 m","32.000 m"],answer:3,explanation:"1 km = 1.000 m; 3,2 × 1.000 = 3.200 m."},
  {q:"Uma pessoa percorre 90 km em 1,5 hora. Sua velocidade média é:",options:["45 km/h","50 km/h","60 km/h","65 km/h","75 km/h"],answer:2,explanation:"v = 90 ÷ 1,5 = 60 km/h."},
  {q:"Em uma escala 1:50, 6 cm no desenho representam:",options:["0,3 m","1 m","2 m","3 m","30 m"],answer:3,explanation:"6 × 50 = 300 cm = 3 metros."},
  {q:"Um produto de R$ 100 sofre aumento de 10% e depois desconto de 10%. O preço final é:",options:["R$ 90","R$ 99","R$ 100","R$ 101","R$ 110"],answer:1,explanation:"Após o aumento: 100 × 1,10 = 110. Depois: 110 × 0,90 = 99. As taxas sucessivas não se anulam."}
 ],
 homework:"Treine conversões de km para m, horas para minutos e litros para mL; refaça os problemas financeiros sem consultar a fórmula."
},
{
 title:"Gráficos, tabelas e funções",
 goal:"Ler informações visuais, identificar padrões e resolver problemas com relações entre grandezas.",
 plan:"Leia os eixos e as unidades antes de olhar as alternativas. Depois pratique substituição em fórmulas.",
 topics:["Leitura de tabelas e gráficos","Plano cartesiano e pares ordenados","Função afim e interpretação de taxa de variação","Função quadrática e raízes"],
 lessons:[
  {heading:"Leitura de gráficos",text:"Confira título, legenda, fonte, período e unidade dos eixos. Observe se o eixo começa em zero: escalas truncadas podem exagerar diferenças. Em gráficos de setores, o círculo inteiro representa 100% ou 360°.",formula:"Ângulo do setor = percentual × 360°",example:"25% de um gráfico de setores corresponde a 0,25 × 360° = 90°."},
  {heading:"Função afim",text:"A função afim tem forma f(x)=ax+b. O número b é o valor inicial (intercepto no eixo y); a indica quanto y varia quando x aumenta uma unidade. Se a for positivo, a reta cresce; se negativo, decresce.",formula:"f(x) = ax + b",example:"Uma corrida cobra R$ 6 de bandeirada e R$ 2 por km: C(x)=2x+6. Para 5 km, C(5)=16 reais."},
  {heading:"Função quadrática",text:"A função quadrática tem forma ax²+bx+c, com a diferente de zero. O gráfico é uma parábola: abre para cima se a>0 e para baixo se a<0. As raízes são os pontos onde o gráfico cruza o eixo x.",formula:"Δ = b² − 4ac; x = (−b ± √Δ)/(2a)",example:"Em x²−5x+6=0, procuramos dois números cujo produto é 6 e soma é 5: 2 e 3. As raízes são 2 e 3."},
  {heading:"Sistema de coordenadas",text:"Um ponto é escrito (x,y): primeiro caminhe no eixo horizontal x, depois no vertical y. Em tabelas, cada linha pode representar um par de valores de uma função.",formula:"Ponto = (abscissa, ordenada)",example:"O ponto (3,5) está 3 unidades à direita e 5 para cima da origem."}
 ],
 videos:[
  {title:"Função do primeiro grau — Professor Ferretto",note:"Gráficos e problemas",url:"https://www.youtube.com/results?search_query=Professor+Ferretto+fun%C3%A7%C3%A3o+primeiro+grau+ENEM"},
  {title:"Interpretação de gráficos — Matemática Rio",note:"Leitura de gráficos e tabelas",url:"https://www.youtube.com/results?search_query=Matem%C3%A1tica+Rio+interpreta%C3%A7%C3%A3o+gr%C3%A1ficos+ENEM"}
 ],
 exercises:[
  {q:"Uma conta é dada por C(x)=5+3x. Quanto custa para x=4?",options:["R$ 12","R$ 15","R$ 17","R$ 20","R$ 23"],answer:2,explanation:"C(4)=5+3×4=5+12=17."},
  {q:"Em um gráfico de setores, 40% correspondem a quantos graus?",options:["40°","90°","120°","144°","180°"],answer:3,explanation:"0,40 × 360° = 144°."},
  {q:"Qual é a raiz positiva de x²−9=0?",options:["1","2","3","6","9"],answer:2,explanation:"x²=9, então x=3 ou x=−3. A raiz positiva é 3."},
  {q:"Na função y=−2x+7, o valor de y quando x=2 é:",options:["−3","1","2","3","5"],answer:3,explanation:"y=−2×2+7=−4+7=3."},
  {q:"O ponto (−2,4) está em qual quadrante?",options:["I","II","III","IV","Sobre o eixo"],answer:1,explanation:"x negativo e y positivo: segundo quadrante."}
 ],
 homework:"Escolha um gráfico de jornal ou site, explique o que cada eixo mostra e escreva três conclusões corretas."
},
{
 title:"Geometria plana e espacial",
 goal:"Aplicar perímetro, área, ângulos, Pitágoras, semelhança e volume em situações do cotidiano.",
 plan:"Desenhe as figuras, marque as medidas e só então escolha a fórmula. Não misture unidades lineares e quadradas.",
 topics:["Perímetro e áreas de figuras planas","Triângulos, ângulos e teorema de Pitágoras","Circunferência e círculo","Prismas, cilindros e volume"],
 lessons:[
  {heading:"Perímetro e área",text:"Perímetro mede o contorno; área mede a superfície. Retângulos usam base vezes altura. Triângulos usam metade desse produto. Em problemas de piso, terreno e pintura, identifique se pedem área ou contorno.",formula:"Retângulo: A=bh | Triângulo: A=bh/2 | Quadrado: A=l²",example:"Um quarto de 4 m por 3 m tem área 12 m² e perímetro 14 m."},
  {heading:"Círculo",text:"Raio vai do centro à borda; diâmetro atravessa o centro e vale dois raios. Circunferência é o contorno e área é a região interna.",formula:"C=2πr | A=πr²",example:"Com raio 3 cm, a área é 9π cm² e a circunferência é 6π cm."},
  {heading:"Pitágoras e semelhança",text:"No triângulo retângulo, a hipotenusa fica oposta ao ângulo de 90° e é o maior lado. Figuras semelhantes mantêm ângulos e proporção entre lados correspondentes.",formula:"a² = b² + c²",example:"Catetos 3 e 4: hipotenusa²=9+16=25; hipotenusa=5."},
  {heading:"Volume",text:"Volume mede o espaço ocupado. Prisma: área da base vezes altura. Cilindro: área circular da base vezes altura. Atenção: 1 cm³ = 1 mL e 1 dm³ = 1 L.",formula:"Prisma: V=A_base×h | Cilindro: V=πr²h",example:"Uma caixa de 2 m × 1 m × 0,5 m tem volume 1 m³."}
 ],
 videos:[
  {title:"Geometria plana para o ENEM — Professor Ferretto",note:"Áreas e perímetros",url:"https://www.youtube.com/results?search_query=Professor+Ferretto+geometria+plana+ENEM"},
  {title:"Geometria espacial — Matemática Rio",note:"Volumes com exemplos",url:"https://www.youtube.com/results?search_query=Matem%C3%A1tica+Rio+volume+cilindro+prisma"}
 ],
 exercises:[
  {q:"Um terreno mede 15 m por 8 m. Qual é sua área?",options:["23 m²","46 m²","80 m²","120 m²","150 m²"],answer:3,explanation:"Área = 15 × 8 = 120 m²."},
  {q:"Um triângulo retângulo tem catetos 6 e 8. A hipotenusa mede:",options:["9","10","12","14","16"],answer:1,explanation:"h²=6²+8²=36+64=100; h=10."},
  {q:"Um cilindro tem raio 2 cm e altura 5 cm. Seu volume é:",options:["10π cm³","15π cm³","20π cm³","25π cm³","40π cm³"],answer:2,explanation:"V=π×2²×5=20π cm³."},
  {q:"O perímetro de um quadrado de lado 7 cm é:",options:["14 cm","21 cm","28 cm","35 cm","49 cm"],answer:2,explanation:"Perímetro = 4 × 7 = 28 cm."},
  {q:"Um círculo tem diâmetro 10 cm. Seu raio é:",options:["2 cm","4 cm","5 cm","10 cm","20 cm"],answer:2,explanation:"O raio é metade do diâmetro: 10 ÷ 2 = 5 cm."}
 ],
 homework:"Faça um desenho de uma sala ou terreno, calcule área e perímetro e explique a diferença entre cm² e cm³."
},
{
 title:"Estatística e probabilidade",
 goal:"Interpretar dados e calcular média, mediana, moda, amplitude e probabilidades simples.",
 plan:"Organize os dados antes de calcular. Em probabilidade, conte casos favoráveis e casos possíveis.",
 topics:["Média aritmética simples e ponderada","Mediana, moda e amplitude","Leitura de tabelas e medidas estatísticas","Probabilidade e eventos"],
 lessons:[
  {heading:"Média",text:"A média simples é a soma dos valores dividida pela quantidade. Na média ponderada, cada valor é multiplicado por seu peso e a soma é dividida pela soma dos pesos.",formula:"Média = soma dos valores ÷ quantidade",example:"Notas 5, 7 e 9: média=(5+7+9)/3=7."},
  {heading:"Mediana, moda e amplitude",text:"Ordene os dados. A mediana é o valor central; se houver quantidade par, faça a média dos dois centrais. A moda é o valor mais frequente. Amplitude é maior menos menor valor.",formula:"Amplitude = máximo − mínimo",example:"Dados 2, 3, 3, 8, 9: mediana=3, moda=3 e amplitude=9−2=7."},
  {heading:"Probabilidade",text:"Quando todos os resultados são igualmente possíveis, divida os casos favoráveis pelo total de casos possíveis. Converta para porcentagem se for útil.",formula:"P(A)=casos favoráveis ÷ casos possíveis",example:"Em um dado honesto, a chance de sair número par é 3/6=1/2=50%."},
  {heading:"Cuidado com a interpretação",text:"Uma média pode ser influenciada por valores extremos; por isso, mediana pode representar melhor um conjunto assimétrico. Leia se a questão pede frequência absoluta, relativa ou acumulada.",formula:"Frequência relativa = frequência ÷ total",example:"Se 12 de 40 alunos usam bicicleta, a frequência relativa é 12/40=0,30=30%."}
 ],
 videos:[
  {title:"Estatística para o ENEM — Professor Ferretto",note:"Média, mediana e moda",url:"https://www.youtube.com/results?search_query=Professor+Ferretto+estat%C3%ADstica+m%C3%A9dia+mediana+moda+ENEM"},
  {title:"Probabilidade — Matemática Rio",note:"Questões explicadas",url:"https://www.youtube.com/results?search_query=Matem%C3%A1tica+Rio+probabilidade+ENEM"}
 ],
 exercises:[
  {q:"A média de 4, 6, 8 e 10 é:",options:["6","7","8","9","10"],answer:1,explanation:"(4+6+8+10)÷4=28÷4=7."},
  {q:"Na lista 1, 2, 2, 3, 7, a moda é:",options:["1","2","3","4","7"],answer:1,explanation:"O número 2 aparece duas vezes; os demais, uma vez."},
  {q:"Ao lançar um dado honesto, a probabilidade de sair 5 é:",options:["1/2","1/3","1/5","1/6","5/6"],answer:3,explanation:"Há um resultado favorável entre seis possíveis: 1/6."},
  {q:"A mediana de 2, 4, 7, 9, 12 é:",options:["4","5","7","8","9"],answer:2,explanation:"Os dados já estão ordenados; o valor central é 7."},
  {q:"Em uma turma de 50 estudantes, 15 usam óculos. Qual percentual?",options:["15%","20%","25%","30%","35%"],answer:3,explanation:"15÷50=0,30=30%."}
 ],
 homework:"Crie uma tabela com 5 valores (por exemplo, tempo de estudo), calcule média, mediana, moda e amplitude."
},
{
 title:"Contagem, sequências, trigonometria e revisão",
 goal:"Revisar temas complementares, resolver questões mistas e montar uma estratégia para o dia da prova.",
 plan:"Use metade do tempo para revisão ativa e metade para resolver questões variadas com cronômetro.",
 topics:["Princípio fundamental da contagem","Progressões aritméticas e geométricas","Seno, cosseno e tangente no triângulo retângulo","Estratégia de prova e revisão dos erros"],
 lessons:[
  {heading:"Contagem",text:"Se uma escolha tem 3 opções e outra independente tem 4, o total de combinações é 3×4=12. Verifique se a ordem importa e se há repetição permitida.",formula:"Etapas independentes: multiplique as possibilidades",example:"3 camisetas e 2 calças formam 3×2=6 combinações."},
  {heading:"PA e PG",text:"Na progressão aritmética, somamos sempre a mesma diferença. Na geométrica, multiplicamos sempre pela mesma razão. Identifique o padrão antes de usar fórmulas.",formula:"PA: aₙ=a₁+(n−1)r | PG: aₙ=a₁×q^(n−1)",example:"PA 4, 7, 10, 13 tem razão 3; o quinto termo é 4+4×3=16."},
  {heading:"Trigonometria básica",text:"Em triângulo retângulo, escolha o ângulo de referência. Identifique cateto oposto, cateto adjacente e hipotenusa. SOH-CAH-TOA ajuda a lembrar as razões.",formula:"sen=oposto/hipotenusa | cos=adjacente/hipotenusa | tg=oposto/adjacente",example:"Num triângulo 3-4-5, para o ângulo oposto ao lado 3: seno=3/5."},
  {heading:"Estratégia para a prova",text:"Leia o comando antes de calcular. Circule dados e unidades. Faça estimativa para eliminar alternativas absurdas. Se travar, marque e siga; volte depois. Não gaste muito tempo em uma única questão.",formula:"Entender → organizar dados → estimar → calcular → conferir unidade",example:"Se a pergunta pede área, a resposta deve estar em unidade quadrada, como m², não em metros."}
 ],
 videos:[
  {title:"Matemática básica e revisão ENEM — Professor Ferretto",note:"Revisão geral e resolução de questões",url:"https://www.youtube.com/@professorferretto"},
  {title:"Questões de Matemática do ENEM — Matemática Rio",note:"Treino com questões",url:"https://www.youtube.com/user/matematicario"},
  {title:"Matriz oficial de Matemática do ENEM — INEP",note:"Consulte as habilidades cobradas",url:"https://download.inep.gov.br/enem/outros_documentos/enem_matriz_referencia.pdf"}
 ],
 exercises:[
  {q:"Há 4 opções de lanche e 3 opções de bebida. Quantas combinações diferentes?",options:["7","9","12","16","24"],answer:2,explanation:"Uma escolha de cada tipo: 4×3=12 combinações."},
  {q:"Na PA 5, 8, 11, 14, qual é o próximo termo?",options:["15","16","17","18","19"],answer:2,explanation:"A razão é 3; 14+3=17."},
  {q:"Em um triângulo retângulo, cateto oposto=3 e hipotenusa=5. O seno do ângulo é:",options:["3/4","3/5","4/5","5/3","5/4"],answer:1,explanation:"Seno = cateto oposto ÷ hipotenusa = 3/5."},
  {q:"Uma sequência dobra a cada etapa: 2, 4, 8, 16... Qual o próximo termo?",options:["18","20","24","30","32"],answer:4,explanation:"A razão é 2; 16×2=32."},
  {q:"Uma questão pede a área de um retângulo de 9 m por 4 m. Qual unidade deve aparecer na resposta?",options:["m","m²","m³","km/h","cm"],answer:1,explanation:"Área é medida em unidades quadradas, portanto m²."}
 ],
 homework:"Faça um simulado misto com tempo marcado. Revise apenas os erros e durma bem antes da prova."
}
,
{
 title:"Simulado final e plano para a prova",
 goal:"Consolidar os seis dias anteriores, treinar ritmo de resolução e identificar os assuntos que ainda precisam de atenção.",
 plan:"Faça o simulado sem consultar o material, corrija com calma e use o resultado para escolher sua última revisão.",
 topics:["Revisão de porcentagem e proporção","Revisão de gráficos e funções","Revisão de geometria e medidas","Revisão de estatística e probabilidade","Controle de tempo e estratégia"],
 lessons:[
  {heading:"Revisão ativa",text:"Feche o material e tente explicar cada fórmula com suas próprias palavras. Depois resolva uma questão sem olhar o exemplo. Se não conseguir, volte somente ao tópico necessário.",formula:"Lembrar sem consultar + praticar + corrigir",example:"Explique por que 20% de 150 é 30 e depois resolva 15% de 240 sem olhar a conta anterior."},
  {heading:"Como escolher questões",text:"Comece pelas questões em que você reconhece o assunto e consegue organizar os dados. Não confunda questão longa com questão difícil: muitas podem ser resolvidas com proporção, leitura de gráfico ou estimativa.",formula:"Priorize questões que você consegue encaminhar com segurança",example:"Se uma questão de gráfico pede apenas a maior categoria, compare as barras antes de fazer contas."},
  {heading:"Correção inteligente",text:"Ao errar, classifique o motivo: não sabia o conceito, interpretou errado, errou a conta ou esqueceu a unidade. Corrija a causa, não apenas a alternativa.",formula:"Erro → causa → revisão curta → nova questão",example:"Se marcou 0,25 como 25, revise conversão decimal/porcentagem e faça duas questões semelhantes."},
  {heading:"No dia da prova",text:"Leve documentos e materiais exigidos no edital, chegue com antecedência e siga as orientações oficiais. Distribua o tempo, hidrate-se e não fique preso a uma questão. Confira se a resposta atende exatamente ao que foi pedido.",formula:"Calma, leitura atenta, unidade correta e gestão do tempo",example:"Antes de marcar, confira se a questão pede valor total, diferença, porcentagem ou taxa."}
 ],
 videos:[
  {title:"Questões de Matemática do ENEM — Professor Ferretto",note:"Treino final com resolução comentada",url:"https://www.youtube.com/results?search_query=Professor+Ferretto+quest%C3%B5es+matem%C3%A1tica+ENEM+resolvidas"},
  {title:"Questões anteriores e gabaritos — INEP",note:"Pratique com provas oficiais",url:"https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos"}
 ],
 exercises:[
  {q:"Um produto de R$ 240 recebe desconto de 15%. Qual o valor pago?",options:["R$ 196","R$ 200","R$ 204","R$ 210","R$ 216"],answer:2,explanation:"15% de 240 = 36. Valor final = 240 − 36 = R$ 204."},
  {q:"A média de 6, 8 e 10 é:",options:["6","7","8","9","10"],answer:2,explanation:"(6+8+10)÷3 = 24÷3 = 8."},
  {q:"Uma caixa mede 2 cm × 3 cm × 4 cm. Seu volume é:",options:["9 cm³","12 cm³","18 cm³","24 cm³","36 cm³"],answer:3,explanation:"Volume = 2×3×4 = 24 cm³."},
  {q:"Em uma turma de 80 alunos, 20% faltaram. Quantos compareceram?",options:["16","48","60","64","68"],answer:3,explanation:"20% de 80 = 16 faltaram. Compareceram 80−16=64."},
  {q:"Uma viagem de 180 km foi feita em 3 horas. Qual a velocidade média?",options:["45 km/h","50 km/h","60 km/h","70 km/h","90 km/h"],answer:2,explanation:"Velocidade média = 180÷3 = 60 km/h."}
 ],
 homework:"Revise seu caderno de erros. Não tente aprender muitos assuntos novos na véspera: consolide o que já estudou e descanse."
}

];
