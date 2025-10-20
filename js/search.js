let showsCache = [];
const content = document.getElementById("content");

function mostrarBuscador() {
  content.innerHTML = `
    <section class="search-section fade-in">
      <h2>🔍 Buscar series</h2>
      
      <div class="search-bar">
        <input 
          type="text" 
          id="searchInput" 
          placeholder="Ej: Friends, The Office..." 
          autocomplete="off"
        >
        <select id="genreFilter">
          <option value="">Todos los géneros</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedia</option>
          <option value="Action">Acción</option>
          <option value="Sci-Fi">Ciencia ficción</option>
          <option value="Horror">Terror</option>
          <option value="Romance">Romance</option>
        </select>
      </div>

      <div id="results" class="results-grid fade-in"></div>
      <p id="noResults" class="no-results hidden">No se encontraron resultados.</p>
    </section>
  `;

  const searchInput = document.getElementById("searchInput");
  const genreFilter = document.getElementById("genreFilter");

  searchInput.addEventListener("input", debounce(buscarSerie, 500));
  genreFilter.addEventListener("change", filtrarPorGenero);
}

async function buscarSerie() {
  const query = document.getElementById("searchInput").value.trim();
  const results = document.getElementById("results");
  const noResults = document.getElementById("noResults");

  if (!query) {
    results.innerHTML = "";
    noResults.classList.add("hidden");
    return;
  }

  results.innerHTML = `<p class="loading">🔎 Buscando "${query}"...</p>`;
  noResults.classList.add("hidden");

  try {
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    showsCache = data.map(r => r.show);

    if (showsCache.length === 0) {
      results.innerHTML = "";
      noResults.classList.remove("hidden");
      return;
    }

    renderResults(showsCache);
  } catch (error) {
    console.error("Error al buscar la serie:", error);
    results.innerHTML = `<p class="error">❌ Error al cargar los resultados. Intenta nuevamente.</p>`;
  }
}

function renderResults(shows) {
  const results = document.getElementById("results");

  results.innerHTML = shows
    .map(
      s => `
      <div class="show-card fade-in" onclick="mostrarDetalle(${s.id})">
        <img 
          src="${s.image?.medium || 'https://via.placeholder.com/250x350?text=Sin+imagen'}" 
          alt="${s.name}"
        >
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
  const filtered = genre
    ? showsCache.filter(s => s.genres.includes(genre))
    : showsCache;

  renderResults(filtered);

  const noResults = document.getElementById("noResults");
  if (filtered.length === 0) {
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
  }
}

/* 🧠 Evita que se dispare la búsqueda muchas veces seguidas */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
