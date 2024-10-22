// Sorteando o tema e redirecionando para a página principal 
const palavraSecreta = (tema) => {
  if (tema == "Pokemon") {
    const numero = Math.floor(Math.random() * Pokemon.length);
    return iniciarJogo(
      Pokemon[numero],
      6,
      5,
      document.querySelector(".container-tiles"),
      document.querySelector("#linhaTecladoPrimeira"),
      document.querySelector("#linhaTecladoSegunda"),
      document.querySelector("#linhaTecladoTerceira"),
      document.querySelector("#linhaBackspaceEnter")
    )
  } else if (tema == "Pais") {
    const numero = Math.floor(Math.random() * Pais.length);
    return iniciarJogo(
      Pais[numero],
      6,
      5,
      document.querySelector(".container-tiles"),
      document.querySelector("#linhaTecladoPrimeira"),
      document.querySelector("#linhaTecladoSegunda"),
      document.querySelector("#linhaTecladoTerceira"),
      document.querySelector("#linhaBackspaceEnter")
    )
  } else if (tema == "Times de Futebol") {
    const numero = Math.floor(Math.random() * Times_de_Futebol.length);
    return iniciarJogo(
      Times_de_Futebol[numero],
      6,
      5,
      document.querySelector(".container-tiles"),
      document.querySelector("#linhaTecladoPrimeira"),
      document.querySelector("#linhaTecladoSegunda"),
      document.querySelector("#linhaTecladoTerceira"),
      document.querySelector("#linhaBackspaceEnter")
    )
  } else if (tema == "Animais") {
    const numero = Math.floor(Math.random() * Animais.length);
    return iniciarJogo(
      Animais[numero],
      6,
      5,
      document.querySelector(".container-tiles"),
      document.querySelector("#linhaTecladoPrimeira"),
      document.querySelector("#linhaTecladoSegunda"),
      document.querySelector("#linhaTecladoTerceira"),
      document.querySelector("#linhaBackspaceEnter")
    )
  } else if (tema == "Frutas") {
    const numero = Math.floor(Math.random() * Frutas.length);
    return iniciarJogo(
      Frutas[numero],
      6,
      5,
      document.querySelector(".container-tiles"),
      document.querySelector("#linhaTecladoPrimeira"),
      document.querySelector("#linhaTecladoSegunda"),
      document.querySelector("#linhaTecladoTerceira"),
      document.querySelector("#linhaBackspaceEnter")
    )
  } else if (tema == "Series") {
    const numero = Math.floor(Math.random() * Series.length);
    return iniciarJogo(
      Series[numero],
      6,
      5,
      document.querySelector(".container-tiles"),
      document.querySelector("#linhaTecladoPrimeira"),
      document.querySelector("#linhaTecladoSegunda"),
      document.querySelector("#linhaTecladoTerceira"),
      document.querySelector("#linhaBackspaceEnter")
    )
  } else if (tema == "Filmes") {
    const numero = Math.floor(Math.random() * Filmes.length);
    return iniciarJogo(
      Filmes[numero],
      6,
      5,
      document.querySelector(".container-tiles"),
      document.querySelector("#linhaTecladoPrimeira"),
      document.querySelector("#linhaTecladoSegunda"),
      document.querySelector("#linhaTecladoTerceira"),
      document.querySelector("#linhaBackspaceEnter")
    )
  }
}
const iniciarJogo = (tema) => {
  localStorage.setItem("temaEscolhido", tema)
  window.location.href = "forca.html"
}
