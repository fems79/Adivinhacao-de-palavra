// Sorteando o tema e redirecionando para a página principal 
const palavraSecreta = (tema) => {
  if (tema == "Pokemon") {
    const numero = Math.floor(Math.random() * Pokemon.length);
    return iniciarJogo(
      steam[numero],
      6,
      5,
      document.querySelector(".container-tiles"),
      document.querySelector("#linhaTecladoPrimeira"),
      document.querySelector("#linhaTecladoSegunda"),
      document.querySelector("#linhaTecladoTerceira"),
      document.querySelector("#linhaBackspaceEnter")
    )
  } else if (tema == "pais") {
    const numero = Math.floor(Math.random() * pais.length);
    return iniciarJogo(
      pais[numero],
      6,
      5,
      document.querySelector(".container-tiles"),
      document.querySelector("#linhaTecladoPrimeira"),
      document.querySelector("#linhaTecladoSegunda"),
      document.querySelector("#linhaTecladoTerceira"),
      document.querySelector("#linhaBackspaceEnter")
    )
  } else if (tema == "Brinquedos") {
    const numero = Math.floor(Math.random() * Brinquedos.length);
    return iniciarJogo(
      brinquedos[numero],
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
