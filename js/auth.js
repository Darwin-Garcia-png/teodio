function verificar() {
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (password === "valu") {
    window.location.href = "diario.html";
    document.getElementById("musica").play();
  } else {
    error.textContent = "Esa no es la contraseña 💔";
  }
}
