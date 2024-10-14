//commit Leonardo Caricchio
//função do momento inicial antes de qualquer interaçaõ do usuario
const Jogo_do_zero = (tentativas) => ({linhaAtual: 0,colunaAtual: 0,tentativas,})
  
// função que inicia o jogo
const iniciarJogo = (palavraCorreta,numlinhas,numcolunas,elementoTabuleiro,linhaTecladoPrimeira,linhaTecladoSegunda,linhaTecladoTerceira,linhaBackspaceEnter) => {
const tentativas = Criar_tabuleiro(numlinhas,numcolunas,elementoTabuleiro)
const estadoJogo = Jogo_do_zero(tentativas)
  
const CliqueTecla = (letra) => {const { colunaAtual, tentativasAtualizadas } = CliqueTeclado(letra,estadoJogo.linhaAtual,estadoJogo.colunaAtual,numcolunas,estadoJogo.tentativas)
      Object.assign(estadoJogo, {
        colunaAtual,
        tentativas: tentativasAtualizadas,
      })
    }
 //função que cria os teclado para interação do usuário  
criarLinhaTeclado(["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],linhaTecladoPrimeira,CliqueTecla)
criarLinhaTeclado(["A", "S", "D", "F", "G", "H", "J", "K", "L"],linhaTecladoSegunda,CliqueTecla)
criarLinhaTeclado(["Z", "X", "C", "V", "B", "N", "M"],linhaTecladoTerceira,CliqueTecla)
  
//função backspace(remove a última letra digitada)
const botaoBackspace = document.createElement("button")
    botaoBackspace.textContent = "<"
    botaoBackspace.addEventListener("click", () => {
      const { colunaAtual, tentativasAtualizadas } = lidarComBackspace(estadoJogo.colunaAtual,estadoJogo.linhaAtual,estadoJogo.tentativas)
      Object.assign(estadoJogo,{colunaAtual,tentativas: tentativasAtualizadas,})
    })
    linhaBackspaceEnter.append(botaoBackspace)
  
    const botaoEnter = document.createElement("button")
    botaoEnter.textContent = "ENTER"
    botaoEnter.addEventListener("click", () => {
    const tentativaAtual =estadoJogo.tentativas[estadoJogo.linhaAtual].join("")
    const { resultado, Correto } =verificador_Tentativa(tentativaAtual,palavraCorreta,numcolunas)
    
    //Validação da tentativa do usuário  
      
    if (resultado) {
        if (Correto) {alert("VOCÊ ACERTOU!!!")} 
        else if (estadoJogo.linhaAtual === numlinhas - 1) {alert(`Você errou! A palavra correta era ${palavraCorreta}`)} else {
          estadoJogo.linhaAtual = moverParaProximaLinha(estadoJogo.linhaAtual)
          estadoJogo.colunaAtual = 0
        }
      }
    })
    linhaBackspaceEnter.append(botaoEnter)

  //interação com a tecla digitada pelo usuário

    document.onkeydown = (evento) => {
      const teclaPressionada = evento.key.toUpperCase()
      if (teclaPressionada === "ENTER") {botaoEnter.click()}
      else if (teclaPressionada === "BACKSPACE") {botaoBackspace.click()} 
      else if (/^[A-Z]$/.test(teclaPressionada)) {CliqueTecla(teclaPressionada)}
    }
  }
  
  //executa o jogo "termo" com 6 tentativas,5 letras cada e adiciona os teclados para interação com usuário
  iniciarJogo("TERMO", 6, 5, document.querySelector(".container-tiles"), document.querySelector("#linhaTecladoPrimeira"), document.querySelector("#linhaTecladoSegunda"), document.querySelector("#linhaTecladoTerceira"), document.querySelector("#linhaBackspaceEnter"))//
