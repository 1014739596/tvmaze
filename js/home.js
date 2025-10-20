async function mostrarLista() {
  if (!content) content = document.getElementById("content");

  content.innerHTML = `
    <h2 class="section-title">🎞️ Series populares</h2>
    <div class="shows-grid" id="showsContainer"></div>
  `;

  try {
    const res = await fetch("https://api.tvmaze.com/shows?page=1");
    const shows = await res.json();
    showsCache = shows.slice(0, 20);
    renderShows(showsCache);
  } catch (error) {
    console.error("Error al cargar las series:", error);
    content.innerHTML += `<p class="error-msg">Error al cargar las series. Intenta nuevamente.</p>`;
  }
}

function renderShows(shows) {
  const showsContainer = document.getElementById("showsContainer");
  if (!showsContainer) return;

  showsContainer.innerHTML = shows
    .map(
      s => `
      <div class="show-card" onclick="(${s.id})">
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

async function mostrarDetalle(id) {
  if (!content) content = document.getElementById("content");

  try {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const show = await res.json();

    content.innerHTML = `
      <div class="detail-container fade-in">
        <h2 class="detail-title">${show.name}</h2>
        <img src="${show.image?.original || 'https://via.placeholder.com/250'}" alt="${show.name}" class="detail-img">
        <div class="detail-info">
          <p class="detail-summary">${show.summary || "Sin descripción disponible."}</p>
        </div>
        <div class="detail-buttons">
          <button class="btn-fav" onclick="agregarFavorito(${show.id}, '${show.name.replace(/'/g, "\\'")}')">⭐ Agregar a favoritos</button>
          <button class="btn-back" onclick="cargarPestaña('home')">⬅️ Volver</button>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error al mostrar detalle:", error);
    content.innerHTML = `<p class="error-msg">Error al cargar los detalles. Intenta nuevamente.</p>`;
  }
}
