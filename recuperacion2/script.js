
let jugadores = [];
let indiceActual = 0;

document.addEventListener("DOMContentLoaded", function() {
    cargarJugadores();
});

function cargarJugadores() {
    fetch("players.xml")
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let xml = parser.parseFromString(data, "application/xml");
            let jugadoresXML = xml.getElementsByTagName("jugador");

            for (let jugador of jugadoresXML) {
                jugadores.push({
                    nombre: jugador.getElementsByTagName("nombre")[0].textContent,
                    rank: jugador.getElementsByTagName("rank")[0].textContent,
                    bandera: jugador.getElementsByTagName("bandera")[0].textContent,
                    abreviatura: jugador.getElementsByTagName("abreviatura")[0].textContent,
                    puntos: jugador.getElementsByTagName("puntos")[0].textContent,
                    img: jugador.getElementsByTagName("img")[0].textContent
                });
            }

            mostrarJugador(0);
        })
        .catch(error => console.log("Error al cargar los datos: ", error));
}

function mostrarJugador(num) {
    indiceActual += num;
    if (indiceActual < 0) {
        indiceActual = jugadores.length - 1;
    } else if (indiceActual >= jugadores.length) {
        indiceActual = 0;
    }

    let jugador = jugadores[indiceActual];
    let tarjeta = `
        <div id='pos-nombre'>
            <h1 id='rank'>${jugador.rank}</h1>
            <h1 id='nombre'>${jugador.nombre}</h1>
        </div>
        <div id='datos'>
            <div id='datos-pais'>
                <div id='img-pais'><img src='${jugador.bandera}'></div>
                <div id='abreviatura'>${jugador.abreviatura}</div>
            </div>
            <div id='puntos'>Puntos: <span id='points'>${jugador.puntos}</span></div>
        </div>
        <div id='imagen'><img src='${jugador.img}'></div>
    `;

    document.getElementById("cards").innerHTML = tarjeta;
}

function buscarJugador() {
    let busqueda = document.getElementById("search").value.toLowerCase();
    let jugadorEncontrado = jugadores.find(jugador => jugador.nombre.toLowerCase().includes(busqueda));

    if (jugadorEncontrado) {
        indiceActual = jugadores.indexOf(jugadorEncontrado);
        mostrarJugador(0);
    } else {
        alert("Jugador no encontrado");
    }
}

function mostrarJugadorPorNumero(numero) {
    indiceActual = numero;
    mostrarJugador(0);
}
