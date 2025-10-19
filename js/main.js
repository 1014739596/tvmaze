window.addEventListener("DOMContentLoaded", () => {
  // Quitar splash después de 2s
  setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    cargarPestaña("home");
  }, 2000);
});
