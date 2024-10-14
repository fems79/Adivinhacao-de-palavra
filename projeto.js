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
const verificador_Tentativa = (
  tentativa,
  palavraCorreta,
  numcolunas,
  letrasCorretas = [...palavraCorreta],
  letrasTentativa = [...tentativa],
  colunasDigitando = document.querySelectorAll(".digitando"),
  letrasUsadas = Array(numcolunas).fill(false),
  indice = 0
) => {
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
    colunasDigitando[indice].classList.add("deslocado")
  } else {
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
