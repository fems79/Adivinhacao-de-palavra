// Cria o tabuleiro de jogo de acordo com o número de linhas e colunas
const Criar_tabuleiro= (numlinhas, numcolunas, elementoTabuleiro) => {
  const tentativas = Array.from({ length: numlinhas }, () =>
    Array(numcolunas).fill("")
  )

  tentativas.forEach((_, indiceLinha) => {
    const linha = document.createElement("div")
    linha.setAttribute("id", "linha" + indiceLinha)
    linha.setAttribute("class", "linha")

    tentativas[indiceLinha].forEach((_, indiceColuna) => {
      const coluna = document.createElement("div")
      coluna.setAttribute("id", `linha${indiceLinha}coluna${indiceColuna}`)
      coluna.setAttribute(
        "class",
        indiceLinha === 0 ? "coluna digitando" : "coluna desativado"
      )
      linha.append(coluna)
    })

    elementoTabuleiro.append(linha)
  })
  return tentativas
}

// Verifica a tentativa de adivinhar a palavra
const verificador_Tentativa = (tentativa, palavraCorreta, numcolunas, letrasCorretas = [...palavraCorreta], letrasTentativa = [...tentativa], colunasDigitando = document.querySelectorAll(".digitando"), letrasUsadas = Array(numcolunas).fill(false), indice = 0) => {
  if (indice >= numcolunas) {
    const Correto = tentativa === palavraCorreta
    return { resultado: true, Correto }
  }

  const letra = letrasTentativa[indice]

  // Verifica se a letra está na posição correta
  if (letra === letrasCorretas[indice]) {
    colunasDigitando[indice].classList.add("correto")
    letrasUsadas[indice] = true // Marca como usada
  }
  // Se a letra não estiver na posição correta, verifica se existe em outra posição
  else if (letrasCorretas.includes(letra)) {
    colunasDigitando[indice].classList.add("deslocado")}
  else {
    colunasDigitando[indice].classList.add("errado")
  }

  return verificador_Tentativa(tentativa, palavraCorreta, numcolunas, letrasCorretas, letrasTentativa, colunasDigitando, letrasUsadas, indice + 1)
}

// Move o jogo para a próxima linha após a tentativa
const moverParaProximaLinha = (linhaAtual) => {
  const colunasDigitando = document.querySelectorAll(".digitando")
  colunasDigitando.forEach((coluna) => {
    coluna.classList.remove("digitando")
    coluna.classList.add("desativado")
  })

  const proximaLinha = linhaAtual + 1
  const elementoNovaLinha = document.querySelector("#linha" + proximaLinha)
  const novasColunas = elementoNovaLinha.querySelectorAll(".coluna")
  novasColunas.forEach((coluna) => {
    coluna.classList.remove("desativado")
    coluna.classList.add("digitando")
  })

  return proximaLinha
}
// Coloca a letra clicada no teclado na linha atual
const CliqueTeclado = (letra, linhaAtual, colunaAtual, numcolunas, tentativas) => {
  if (colunaAtual === numcolunas) return {colunaAtual}
  
  const tileAtual = document.querySelector(`#linha${linhaAtual}coluna${colunaAtual}`)
  tileAtual.textContent = letra

  const tentativasAtualizadas = [...tentativas.slice(0, linhaAtual),
    [...tentativas[linhaAtual].slice(0, colunaAtual), letra, ...tentativas[linhaAtual].slice(colunaAtual + 1)],
    ...tentativas.slice(linhaAtual + 1)]
  
  return { colunaAtual: colunaAtual + 1, tentativasAtualizadas }
}
// Remove a última letra digitada (Backspace)
const lidarComBackspace = (colunaAtual, linhaAtual, tentativas) => {
  if (colunaAtual === 0) return {colunaAtual}

  const tileRemover = document.querySelector(`#linha${linhaAtual}coluna${colunaAtual - 1}`)
  tileRemover.textContent = ""

  const tentativasAtualizadas = [...tentativas.slice(0, linhaAtual),
    [...tentativas[linhaAtual].slice(0, colunaAtual - 1), "", ...tentativas[linhaAtual].slice(colunaAtual)],
    ...tentativas.slice(linhaAtual + 1)]

  return { colunaAtual: colunaAtual - 1, tentativasAtualizadas }
}
// Controle das teclas
const criarLinhaTeclado = (teclas, elementoTecladoLinha, CliqueTecla) => {teclas.forEach((tecla) => {
    const botaoTecla = document.createElement("button")
    botaoTecla.textContent = tecla
    botaoTecla.setAttribute("id", tecla)
    botaoTecla.addEventListener("click", () => CliqueTecla(tecla))
    elementoTecladoLinha.append(botaoTecla)})
}
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
  iniciarJogo("TERMO", 6, 5, document.querySelector(".container-tiles"), document.querySelector("#linhaTecladoPrimeira"), document.querySelector("#linhaTecladoSegunda"), document.querySelector("#linhaTecladoTerceira"), document.querySelector("#linhaBackspaceEnter"))
