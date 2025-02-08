// Obtener el contenedor donde se mostrarán las noticias
const newsContainer = document.getElementById('news-container');

// Función para cargar las noticias desde el archivo JSON
async function loadNews() {
    // Detectar el idioma (puedes cambiarlo según tu preferencia)
    const language = document.documentElement.lang || 'es';  // 'es' es por defecto

    // Seleccionar el archivo JSON basado en el idioma
    const jsonFile = language === 'en' ? 'assets/xmlEN.json' : 'assets/xml.json';

    try {
        const response = await fetch(jsonFile);
        // Asegúrate de que la ruta sea correcta
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        
        const news = await response.json();
        
        if (news.length === 0) {
            const noNewsMessage = document.createElement('p');
            noNewsMessage.textContent = 'No hay noticias disponibles en este momento.';
            newsContainer.appendChild(noNewsMessage);
            return;
        }
        
        news.forEach(newsItem => {
            // Crear una tarjeta de noticia para cada entrada
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-item');
            
            const newsImage = document.createElement('img');
            newsImage.src = newsItem.image;
            newsImage.alt = newsItem.title;

            const newsTitle = document.createElement('h3');
            newsTitle.textContent = newsItem.title;

            const newsDescription = document.createElement('p');
            newsDescription.textContent = newsItem.description;

            newsCard.appendChild(newsImage);
            newsCard.appendChild(newsTitle);
            newsCard.appendChild(newsDescription);

            newsContainer.appendChild(newsCard);
        });
    } catch (error) {
        console.error('Error al cargar las noticias:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Hubo un problema al cargar las noticias.';
        newsContainer.appendChild(errorMessage);
    }
}

// Llamar a la función para cargar las noticias al cargar la página
window.onload = loadNews;
