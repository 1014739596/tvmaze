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

  var input = document.getElementById("searchInput");
  var select = document.getElementById("genreFilter");

  input.addEventListener("input", buscarSerie);
  select.addEventListener("change", filtrarPorGenero);
}

function buscarSerie(evento) {
  var texto = evento.target.value.trim();

  if (texto === "") {
    document.getElementById("results").innerHTML = "";
    return;
  }

  fetch("https://api.tvmaze.com/search/shows?q=" + texto)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      showsCache = datos.map(function (item) {
        return item.show;
      });

      mostrarResultados(showsCache);
    })
    .catch(function (error) {
      console.log("Error al buscar:", error);
    });
}

function mostrarResultados(series) {
  var contenedor = document.getElementById("results");
  contenedor.innerHTML = "";

  for (var i = 0; i < series.length; i++) {
    var s = series[i];
    var imagen = s.image ? s.image.medium : "https://via.placeholder.com/100";
    var generos = s.genres.length > 0 ? s.genres.join(", ") : "Sin género";

    contenedor.innerHTML += `
      <div class="show-card" onclick="mostrarDetalle(${s.id})">
        <img src="${imagen}" alt="${s.name}">
        <div class="show-info">
          <h3>${s.name}</h3>
          <p>${generos}</p>
        </div>
      </div>
    `;
  }
}

function filtrarPorGenero() {
  var generoSeleccionado = document.getElementById("genreFilter").value;

  if (generoSeleccionado === "") {
    mostrarResultados(showsCache);
  } else {
    var filtradas = showsCache.filter(function (serie) {
      return serie.genres.includes(generoSeleccionado);
    });
    mostrarResultados(filtradas);
  }
}
