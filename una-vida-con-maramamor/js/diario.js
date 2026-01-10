fetch("data/recuerdos.json")
  .then(response => response.json())
  .then(data => {
    const diario = document.getElementById("diario");

    data.forEach(mesData => {
      const mesDiv = document.createElement("section");
      mesDiv.className = "mes";

      const mesTitulo = document.createElement("h2");
      mesTitulo.textContent = mesData.mes;
      mesDiv.appendChild(mesTitulo);

      mesData.recuerdos.forEach(rec => {
        const recuerdoDiv = document.createElement("article");
        recuerdoDiv.className = "recuerdo";

        let imagenesHTML = "";

        if (rec.imagenes && rec.imagenes.length > 0) {
          rec.imagenes.forEach(img => {
            imagenesHTML += `<img src="${img}" alt="Recuerdo">`;
          });
        }

        recuerdoDiv.innerHTML = `
          <h3>${rec.titulo}</h3>
          <p>${rec.texto}</p>
          <div class="galeria">
            ${imagenesHTML}
          </div>
        `;

        mesDiv.appendChild(recuerdoDiv);
      });

      diario.appendChild(mesDiv);
    });
  })
  .catch(error => {
    console.error("Error cargando recuerdos:", error);
  });
