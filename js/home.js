// Mostrar lista principal de series
async function mostrarLista() {
  content.innerHTML = "<h2>🎬 Series populares</h2><div class='show-grid'></div>";
  const res = await fetch("https://api.tvmaze.com/shows?page=1");
  const shows = await res.json();
  showsCache = shows.slice(0, 20);
  renderShows(showsCache);
}

// Renderizar tarjetas de series
function renderShows(shows) {
  const grid = document.querySelector(".show-grid");
  grid.innerHTML = shows
    .map(
      (s) => `
      <div class="show-card" onclick="mostrarDetalle(${s.id})">
        <img src="${s.image?.medium || 'https://via.placeholder.com/150'}" alt="${s.name}">
        <div class="show-info">
          <h3>${s.name}</h3>
          <p>${s.genres.length ? s.genres.join(", ") : "Sin género"}</p>
        </div>
      </div>
    `
    )
    .join("");
}

// Mostrar detalle de una serie
async function mostrarDetalle(id) {
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  content.innerHTML = `
    <h2>${show.name}</h2>
    <img src="${show.image?.original || 'https://via.placeholder.com/250'}" width="250" alt="${show.name}">
    <p>${show.summary || "No hay sinopsis disponible."}</p>
    <div style="text-align: center;">
      <button onclick="agregarFavorito(${show.id}, '${show.name.replace(/'/g, "\\'")}')">⭐ Agregar a favoritos</button>
      <button onclick="cargarPestaña('home')">⬅️ Volver</button>
    </div>
  `;
}
