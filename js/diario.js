document.addEventListener("DOMContentLoaded", () => {

  fetch("data/recuerdos.json")
    .then(response => response.json())
    .then(data => {

      const diario = document.getElementById("diario");

      data.forEach(mesData => {
        const nombreMes = mesData.mes.split(" ")[0].toLowerCase();

        const mesDiv = document.createElement("section");
        mesDiv.className = "mes";

        const mesTitulo = document.createElement("h2");
        mesTitulo.textContent = mesData.mes;
        mesDiv.appendChild(mesTitulo);

        mesData.recuerdos.forEach(rec => {
          const recuerdoDiv = document.createElement("article");
          recuerdoDiv.className = "recuerdo";
          recuerdoDiv.dataset.mes = nombreMes;

          let mediaHTML = "";

          /* 🖼️ IMÁGENES (compatibilidad antigua) */
          if (rec.imagenes && rec.imagenes.length > 0) {
            rec.imagenes.forEach((img, index) => {
              mediaHTML += `
                <img 
                  src="${img}" 
                  alt="Recuerdo"
                  class="${index === 0 ? "img-principal" : "img-secundaria"}"
                >
              `;
            });
          }

          /* 🎥 MEDIA NUEVA (imagenes + videos) */
          if (rec.media && rec.media.length > 0) {
            rec.media.forEach((item, index) => {

              if (item.tipo === "imagen") {
                mediaHTML += `
                  <img 
                    src="${item.src}" 
                    alt="Recuerdo"
                    class="${index === 0 ? "img-principal" : "img-secundaria"}"
                  >
                `;
              }

              if (item.tipo === "video") {
                mediaHTML += `
                  <video
                    src="${item.src}"
                    class="${index === 0 ? "img-principal" : "img-secundaria"}"
                    controls
                    preload="metadata"
                  ></video>
                `;
              }

            });
          }

          recuerdoDiv.innerHTML = `
            <div class="recuerdo-header">
              <h3>${rec.titulo}</h3>
            </div>

            <p>${rec.texto}</p>

            <div class="galeria-instagram">
              ${mediaHTML}
            </div>
          `;

          mesDiv.appendChild(recuerdoDiv);
        });

        diario.appendChild(mesDiv);
      });

      /* 🔽 FILTRO POR MES */
      const selector = document.getElementById("selectorMes");
      if (!selector) return;

      selector.addEventListener("change", () => {
        const mesSeleccionado = selector.value;
        const meses = document.querySelectorAll(".mes");

        let hayRecuerdos = false;

        meses.forEach(mes => {
          const recuerdos = mes.querySelectorAll(".recuerdo");
          let recuerdosVisibles = 0;

          recuerdos.forEach(recuerdo => {
            if (
              mesSeleccionado === "todos" ||
              recuerdo.dataset.mes === mesSeleccionado
            ) {
              recuerdo.style.display = "block";
              recuerdosVisibles++;
              hayRecuerdos = true;
            } else {
              recuerdo.style.display = "none";
            }
          });

          mes.style.display = recuerdosVisibles > 0 ? "block" : "none";
        });

        /* 🩵 Mensaje sin recuerdos */
        let mensaje = document.getElementById("sin-recuerdos");

        if (!hayRecuerdos) {
          if (!mensaje) {
            mensaje = document.createElement("p");
            mensaje.id = "sin-recuerdos";
            mensaje.textContent = "Aún no hay recuerdos, maramamor :(";
            mensaje.style.textAlign = "center";
            mensaje.style.marginTop = "50px";
            mensaje.style.opacity = "0.7";
            diario.appendChild(mensaje);
          }
        } else {
          if (mensaje) mensaje.remove();
        }

        /* ✨ Fade suave */
        diario.style.opacity = "0";
        setTimeout(() => {
          diario.style.opacity = "1";
        }, 150);
      });

    })
    .catch(error => {
      console.error("Error cargando recuerdos:", error);
    });

});
