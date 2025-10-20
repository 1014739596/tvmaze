// 📌 Agregar una serie a favoritos
function agregarFavorito(id, nombre, imagen) {
  // Revisar si ya está en favoritos
  var existe = favoritos.some(function(f) {
    return f.id === id;
  });

  if (!existe) {
    // Si no hay imagen, usar una por defecto
    if (!imagen) {
      imagen = "https://via.placeholder.com/200x280?text=Sin+imagen";
    }

    // Guardar en el array
    favoritos.push({ id: id, nombre: nombre, imagen: imagen });
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    mostrarNotificacion("✅ \"" + nombre + "\" agregado a favoritos");
  } else {
    mostrarNotificacion("⚠️ \"" + nombre + "\" ya está en favoritos");
  }
}

// 📜 Mostrar lista de favoritos
function mostrarFavoritos() {
  content.innerHTML = "<h2>⭐ Tus favoritos</h2><div class='show-grid'></div>";

  // Si no hay favoritos, mostrar mensaje
  if (favoritos.length === 0) {
    content.innerHTML += "<p class='mensaje-vacio'>No tienes favoritos aún.</p>";
    return;
  }

  var grid = document.querySelector(".show-grid");

  // Crear las tarjetas de favoritos
  var html = "";
  favoritos.forEach(function(s) {
    html += `
      <div class="show-card favorito-card">
        <img src="${s.imagen}" alt="${s.nombre}">
        <div class="show-info">
          <h3>${s.nombre}</h3>
          <button class="btn-delete" onclick="eliminarFavorito(${s.id})">❌ Eliminar</button>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

// 🗑️ Eliminar favorito
function eliminarFavorito(id) {
  // Buscar nombre del eliminado
  var eliminado = "";
  favoritos = favoritos.filter(function(f) {
    if (f.id === id) eliminado = f.nombre;
    return f.id !== id;
  });

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  mostrarFavoritos();
  mostrarNotificacion("🗑️ \"" + eliminado + "\" eliminado de favoritos");
}

// 💬 Notificación flotante
function mostrarNotificacion(mensaje) {
  var noti = document.createElement("div");
  noti.className = "notificacion";
  noti.textContent = mensaje;
  document.body.appendChild(noti);

  setTimeout(function() {
    noti.classList.add("visible");
  }, 100);

  setTimeout(function() {
    noti.classList.remove("visible");
    setTimeout(function() {
      noti.remove();
    }, 500);
  }, 2500);
}
