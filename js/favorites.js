function agregarFavorito(id, nombre) {
  if (!favoritos.some(f => f.id === id)) {
    favoritos.push({ id, nombre });
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    alert("Agregado a favoritos");
  } else {
    alert("Ya está en favoritos");
  }
}

function mostrarFavoritos() {
  content.innerHTML = "<h2>Favoritos</h2>";

  if (favoritos.length === 0) {
    content.innerHTML += "<p>No tienes favoritos aún.</p>";
    return;
  }

  content.innerHTML += favoritos
    .map(f => `
      <div class="show-card">
        <div class="show-info">
          <h3>${f.nombre}</h3>
          <button onclick="eliminarFavorito(${f.id})">❌ Eliminar</button>
        </div>
      </div>
    `)
    .join("");
}

function eliminarFavorito(id) {
  favoritos = favoritos.filter(f => f.id !== id);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  mostrarFavoritos();
}
