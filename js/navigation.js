const buttons = document.querySelectorAll(".menu button");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const tab = btn.dataset.tab;
    cargarPestaña(tab);
  });
});

function cargarPestaña(tab) {
  content.innerHTML = "";

  switch (tab) {
    case "home":
      mostrarLista();
      break;
    case "buscar":
      mostrarBuscador();
      break;
    case "favoritos":
      mostrarFavoritos();
      break;
    case "original":
      mostrarOriginal();
      break;
    case "info":
      mostrarInfo();
      break;
  }
}
