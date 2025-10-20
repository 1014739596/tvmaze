function mostrarInfo() {
  content.innerHTML = `
    <section class="info-section">
      <h2>ℹ️ Acerca de la aplicación</h2>
      <div class="info-card">
        <p>Esta aplicación fue desarrollada utilizando la API pública de <strong>TVMaze</strong>, que ofrece información actualizada sobre miles de series y programas de televisión.</p>

        <p>📺 Con esta app puedes:</p>
        <ul>
          <li>🔍 Buscar y explorar tus series favoritas</li>
          <li>⭐ Guardar títulos en tu lista de favoritos</li>
          <li>🧠 Consultar sinopsis y géneros</li>
          <li>📱 Disfrutar de una interfaz moderna y adaptable</li>
        </ul>

        <p class="creditos">Desarrollado por <strong>Juan Sebastián Rojas Lamprea</strong> con JavaScript puro, HTML y CSS responsive.</p>
      </div>
    </section>
  `;
}
