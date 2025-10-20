// 📌 Agregar una serie a favoritos
function agregarFavorito(id, nombre) {
  if (!favoritos.some(f => f.id === id)) {
    favoritos.push({ id, nombre });
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    // Notificación más elegante
    mostrarNotificacion(`✅ "${nombre}" agregado a favoritos`);
  } else {
    mostrarNotificacion(`⚠️ "${nombre}" ya está en favoritos`);
  }
}

// 📜 Mostrar lista de favoritos
function mostrarFavoritos() {
  content.innerHTML = "<h2>⭐ Tus favoritos</h2><div class='show-grid'></div>";

  if (favoritos.length === 0) {
    content.innerHTML += `
      <p style="text-align:center; color:#ccc; margin-top:20px;">
        No tienes favoritos aún.
      </p>
    `;
    return;
  }

  const grid = document.querySelector(".show-grid");
  grid.innerHTML = favoritos
    .map(
      f => `
      <div class="show-card">
        <img src="https://via.placeholder.com/200x280?text=Favorito" alt="${f.nombre}">
        <div class="show-info">
          <h3>${f.nombre}</h3>
          <button class="btn-delete" onclick="eliminarFavorito(${f.id})">❌ Eliminar</button>
        </div>
      </div>
    `
    )
    .join("");
}

// 🗑️ Eliminar favorito
function eliminarFavorito(id) {
  const eliminado = favoritos.find(f => f.id === id)?.nombre;
  favoritos = favoritos.filter(f => f.id !== id);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  mostrarFavoritos();
  mostrarNotificacion(`🗑️ "${eliminado}" eliminado de favoritos`);
}

// 💬 Notificación temporal
function mostrarNotificacion(mensaje) {
  const noti = document.createElement("div");
  noti.className = "notificacion";
  noti.textContent = mensaje;
  document.body.appendChild(noti);

  setTimeout(() => {
    noti.classList.add("visible");
  }, 100);

  setTimeout(() => {
    noti.classList.remove("visible");
    setTimeout(() => noti.remove(), 500);
  }, 2500);
}
