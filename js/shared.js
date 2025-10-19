const content = document.getElementById("content");
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let showsCache = [];
