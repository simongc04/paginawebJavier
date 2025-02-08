document.addEventListener("DOMContentLoaded", function () {
    fetch("assets/data.xml")
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const aboutSection = document.getElementById("about-content");

            // Obtener datos del XML
            let history = data.querySelector("history");
            let mission = data.querySelector("mission");
            let vision = data.querySelector("vision");
            let images = data.querySelectorAll("images > image");

            // Construir el HTML dinámicamente para Historia, Misión y Visión
            let contentHTML = `
                <section class="about-history">
                    <div class="container">
                        <h2>${history.querySelector("title").textContent}</h2>
                        <p>${history.querySelectorAll("paragraph")[0].textContent}</p>
                        <p>${history.querySelectorAll("paragraph")[1].textContent}</p>
                    </div>
                </section>

                <section class="mission-vision">
                    <div class="container">
                        <div class="mission">
                            <h3>${mission.querySelector("title").textContent}</h3>
                            <p>${mission.querySelector("description").textContent}</p>
                        </div>
                        <div class="vision">
                            <h3>${vision.querySelector("title").textContent}</h3>
                            <p>${vision.querySelector("description").textContent}</p>
                        </div>
                    </div>
                </section>
            `;

            // Crear la galería de imágenes
            let galleryHTML = `<section class="zoo-gallery"><h2>Nuestro Zoo en Imágenes</h2><div class="gallery">`;

            images.forEach(image => {
                galleryHTML += `
                    <img src="${image.getAttribute('src')}" alt="${image.getAttribute('alt')}">
                `;
            });

            galleryHTML += `</div></section>`;

            // Insertar contenido en el HTML
            aboutSection.innerHTML = contentHTML + galleryHTML;
        })
        .catch(error => console.error("Error cargando el XML:", error));
});
