function verificar() {
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (password === "valu") {
    window.location.href = "diario.html";
    document.getElementById("musica").play();
    document.getElementById("musica").volume = 0.25;
  } else {
    error.textContent = "Esa no es la contraseña 💔";
  }
}
