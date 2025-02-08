document.addEventListener("DOMContentLoaded", function() {
    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach(carousel => {
        let index = 0;
        const images = carousel.querySelectorAll(".carousel-image");
        const totalImages = images.length;

        // Función para mostrar la siguiente imagen
        function showNextImage() {
            images[index].style.display = "none"; // Oculta la imagen actual
            index = (index + 1) % totalImages; // Incrementa el índice (vuelve al principio cuando llega al final)
            images[index].style.display = "block"; // Muestra la siguiente imagen
        }

        // Función para mostrar la imagen anterior
        function showPrevImage() {
            images[index].style.display = "none"; // Oculta la imagen actual
            index = (index - 1 + totalImages) % totalImages; // Decrementa el índice (vuelve al final cuando llega al primero)
            images[index].style.display = "block"; // Muestra la imagen anterior
        }

        // Inicializa el primer elemento visible
        images.forEach(image => image.style.display = "none");
        images[index].style.display = "block";

        // Eventos para los botones de navegación
        const prevButton = carousel.parentNode.querySelector(".prev-button");
        const nextButton = carousel.parentNode.querySelector(".next-button");

        prevButton.addEventListener("click", showPrevImage);
        nextButton.addEventListener("click", showNextImage);
    });
});
