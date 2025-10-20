async function mostrarLista() {
  content.innerHTML = "<h2>🎬 Series populares</h2><div class='show-grid'></div>";

  try {
    const respuesta = await fetch("https://api.tvmaze.com/shows?page=1");
    const datos = await respuesta.json();

    showsCache = datos.slice(0, 200);

    mostrarSeries(showsCache);
  } catch (error) {
    content.innerHTML = "<p style='color:red;'>Error al cargar las series.</p>";
  }
}

function mostrarSeries(lista) {
  const grid = document.querySelector(".show-grid");

  grid.innerHTML = ""; 

  lista.forEach(serie => {
    // Creamos un div para cada serie
    const tarjeta = document.createElement("div");
    tarjeta.className = "show-card";
    tarjeta.onclick = function() {
      mostrarDetalle(serie.id);
    };

    const imagen = serie.image ? serie.image.medium : "https://via.placeholder.com/150";

    tarjeta.innerHTML = `
      <img src="${imagen}" alt="${serie.name}">
      <div class="show-info">
        <h3>${serie.name}</h3>
        <p>${serie.genres.length > 0 ? serie.genres.join(", ") : "Sin género"}</p>
      </div>
    `;

    grid.appendChild(tarjeta);
  });
}

async function mostrarDetalle(id) {
  try {
    const respuesta = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const serie = await respuesta.json();

    content.innerHTML = `
      <div class="detail-container">
        <h2 class="detail-title">${serie.name}</h2>
        <img src="${serie.image ? serie.image.original : 'https://via.placeholder.com/250'}" alt="${serie.name}" class="detail-img">
        <div class="detail-info">
          <p class="detail-summary">${serie.summary || "Sin descripción disponible."}</p>
        </div>
        <div class="detail-buttons">
          <button onclick="agregarFavorito(${serie.id}, '${serie.name.replace(/'/g, "\\'")}', '${serie.image ? serie.image.medium : "https://via.placeholder.com/200x280?text=Sin+imagen"}')">
            ⭐ Agregar a favoritos
          </button>
        </div>
      </div>
    `;
  } catch (error) {
    content.innerHTML = "<p style='color:red;'>Error al mostrar los detalles.</p>";
  }
}
