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
