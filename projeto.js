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
const verificador_Tentativa = (tentativa, palavraCorreta, numcolunas, letrasCorretas = [...palavraCorreta.toUpperCase()], letrasTentativa = [...tentativa.toUpperCase()], colunasDigitando = document.querySelectorAll(".digitando"), letrasUsadas = Array(numcolunas).fill(false), letrasRestantes = {}) => {
   // Conta as letras restantes na palavra correta
  letrasCorretas.forEach((letra) => {
    letrasRestantes[letra] = (letrasRestantes[letra] || 0) + 1
  })

 // Primeira passagem: Marca as letras na posição correta
  letrasTentativa.forEach((letra, i) => {
    if (letra === letrasCorretas[i]) {
      colunasDigitando[i].classList.add("correto")
      letrasUsadas[i] = true
      letrasRestantes[letra]-- // Diminui a contagem de letras disponíveis
    }
  });

  // Segunda passagem: Verifica as letras deslocadas
  letrasTentativa.forEach((letra, i) => {
    if (
      !colunasDigitando[i].classList.contains("correto") && // Não é correta
      letrasRestantes[letra] > 0 // Ainda há instâncias disponíveis
    ) {
      colunasDigitando[i].classList.add("deslocado")
      letrasRestantes[letra]-- // Usa uma instância
    } else if (!colunasDigitando[i].classList.contains("correto")) {
      colunasDigitando[i].classList.add("errado")
    }
  });

  // Verifica se a tentativa completa está correta
  const Correto = tentativa.toUpperCase() === palavraCorreta.toUpperCase()
  return { resultado: true, Correto }
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
//função nova Leonardo Caricchio do Nascimento
//função para reiniciar o jogo caso o usuario acertar
const reiniciarJogo = () => {
  //constantes que armazenam os elementos do jogo
  const tabuleiro = document.querySelector(".container-tiles");
  const tecladoPrimeira = document.querySelector("#linhaTecladoPrimeira");
  const tecladoSegunda = document.querySelector("#linhaTecladoSegunda");
  const tecladoTerceira = document.querySelector("#linhaTecladoTerceira");
  const tecladoBackspaceEnter = document.querySelector("#linhaBackspaceEnter");
  //elementos do jogo sendo apagados,pois serao reiniciados
  tabuleiro.innerHTML = "";
  tecladoPrimeira.innerHTML = "";
  tecladoSegunda.innerHTML = "";
  tecladoTerceira.innerHTML = "";
  tecladoBackspaceEnter.innerHTML = "";
   
  //aqui falta adicionar a função de danilo para escolher a palavra aleatoriamente
  //chama a função para reiniciar com a nova palavra
  iniciarJogo("TERMO", 6, 5, tabuleiro, tecladoPrimeira, tecladoSegunda, tecladoTerceira, tecladoBackspaceEnter);
}
  
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
      // função leonardo caricchio do nascimento
      //adição do botao de reinicio após acerto
      const botaoReiniciar = document.createElement("button")
      botaoReiniciar.textContent = "Reiniciar Jogo"
      botaoReiniciar.addEventListener("click", reiniciarJogo)
      document.body.append(botaoReiniciar)

      return
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
// Resgatando o tema escolhido 
const temaEscolhido = localStorage.getItem("temaEscolhido")
  
//executa o jogo "termo" com 6 tentativas,5 letras cada e adiciona os teclados para interação com usuário
  iniciarJogo(temaEscolhido, 6, 5, document.querySelector(".container-tiles"), document.querySelector("#linhaTecladoPrimeira"), document.querySelector("#linhaTecladoSegunda"), document.querySelector("#linhaTecladoTerceira"), document.querySelector("#linhaBackspaceEnter"))
