// Seleccionamos todos los botones del menú
const buttons = document.querySelectorAll(".menu button");

// Evento para cada botón del menú
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Quitar clase activa a todos
    buttons.forEach(b => b.classList.remove("active"));

    // Agregar clase activa al botón actual
    btn.classList.add("active");

    // Identificar pestaña seleccionada
    const tab = btn.dataset.tab;
    cargarPestaña(tab);
  });
});

// Función para cargar el contenido de cada pestaña con animación
function cargarPestaña(tab) {
  // Añadir animación de desvanecimiento
  content.classList.add("fade-out");

  setTimeout(() => {
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
      default:
        content.innerHTML = "<p>Sección no encontrada.</p>";
        break;
    }

    // Después de cambiar el contenido, aplicar animación de entrada
    setTimeout(() => {
      content.classList.remove("fade-out");
      content.classList.add("fade-in");

      // Eliminar clase después de la animación para evitar interferencias
      setTimeout(() => content.classList.remove("fade-in"), 400);
    }, 100);
  }, 200);
}
