let showsCache = [];

function mostrarBuscador() {
  content.innerHTML = `
    <div class="search-container">
      <h2>🔍 Buscar series</h2>
      <div class="search-controls">
        <input type="text" id="searchInput" placeholder="Ej: Friends..." autocomplete="off">
        <select id="genreFilter">
          <option value="">Filtrar por género</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Action">Action</option>
          <option value="Thriller">Thriller</option>
          <option value="Romance">Romance</option>
        </select>
      </div>
      <div id="results" class="results-grid"></div>
    </div>
  `;

  document.getElementById("searchInput").addEventListener("input", buscarSerie);
  document.getElementById("genreFilter").addEventListener("change", filtrarPorGenero);
}

async function buscarSerie(e) {
  const query = e.target.value.trim();
  const results = document.getElementById("results");

  if (!query) {
    results.innerHTML = `<p class="empty-msg">Escribe algo para comenzar la búsqueda...</p>`;
    return;
  }

  results.innerHTML = `<p class="loading-msg">Buscando series...</p>`;

  try {
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const data = await res.json();

    if (!data.length) {
      results.innerHTML = `<p class="empty-msg">No se encontraron resultados para "${query}".</p>`;
      return;
    }

    showsCache = data.map(r => r.show);
    renderResults(showsCache);
  } catch (error) {
    results.innerHTML = `<p class="error-msg">Error al cargar los datos. Intenta nuevamente.</p>`;
  }
}

function renderResults(shows) {
  const results = document.getElementById("results");

  results.innerHTML = shows
    .map(
      s => `
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

function filtrarPorGenero() {
  const genre = document.getElementById("genreFilter").value;
  const filtrados = genre
    ? showsCache.filter(s => s.genres.includes(genre))
    : showsCache;

  renderResults(filtrados);
}
