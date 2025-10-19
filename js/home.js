async function mostrarLista() {
  content.innerHTML = "<h2>Series populares</h2>";
  const res = await fetch("https://api.tvmaze.com/shows?page=1");
  const shows = await res.json();
  showsCache = shows.slice(0, 20);
  renderShows(showsCache);
}

function renderShows(shows) {
  content.innerHTML += shows
    .map(
      s => `
    <div class="show-card" onclick="mostrarDetalle(${s.id})">
      <img src="${s.image?.medium || 'https://via.placeholder.com/100'}">
      <div class="show-info">
        <h3>${s.name}</h3>
        <p>${s.genres.join(", ")}</p>
      </div>
    </div>
  `
    )
    .join("");
}

async function mostrarDetalle(id) {
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  content.innerHTML = `
    <h2>${show.name}</h2>
    <img src="${show.image?.original || 'https://via.placeholder.com/200'}" width="200">
    <p>${show.summary}</p>
    <button onclick="agregarFavorito(${show.id}, '${show.name.replace(/'/g, "\\'")}')">⭐ Agregar a favoritos</button>
    <button onclick="cargarPestaña('home')">⬅️ Volver</button>
  `;
}
