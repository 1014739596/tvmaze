function mostrarBuscador() {
  content.innerHTML = `
    <h2>Buscar series</h2>
    <input type="text" id="searchInput" placeholder="Ej: Friends...">
    <select id="genreFilter">
      <option value="">Filtrar por género</option>
      <option value="Drama">Drama</option>
      <option value="Comedy">Comedy</option>
      <option value="Action">Action</option>
    </select>
    <div id="results"></div>
  `;

  document.getElementById("searchInput").addEventListener("input", buscarSerie);
  document.getElementById("genreFilter").addEventListener("change", filtrarPorGenero);
}

async function buscarSerie(e) {
  const query = e.target.value.trim();
  if (!query) return (document.getElementById("results").innerHTML = "");

  const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
  const data = await res.json();
  showsCache = data.map(r => r.show);
  renderResults(showsCache);
}

function renderResults(shows) {
  const results = document.getElementById("results");
  results.innerHTML = shows
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

function filtrarPorGenero() {
  const genre = document.getElementById("genreFilter").value;
  const filtrados = genre
    ? showsCache.filter(s => s.genres.includes(genre))
    : showsCache;
  renderResults(filtrados);
}
