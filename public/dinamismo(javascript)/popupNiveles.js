'use strict'; //Activa el modo estricto de JS para prevenir errores

let nivelesAPI = []; //Varible que guardara la lista de niveles que se le pedira al servidor

//Seleccionamos los elementos que tenemos en index.html a partir de la id
const fondo = document.getElementById('popupFondo');

const nombre = document.getElementById('popupTitulo');

const imagen = document.getElementById('popupImagen');

const descripcion = document.getElementById('popupDescripcion');

const dificultad = document.getElementById('popupDificultad');

const tiempoLimite = document.getElementById('popupTiempo');

const enemigos = document.getElementById('popupEnemigos');

const record = document.getElementById('popupRecord');

const barra = document.getElementById('popupBarra');

const relleno = document.getElementById('popupRelleno');

const botonVolver = document.getElementById('popupVolver');

const botonSiguiente = document.getElementById('popupSiguiente'); //!Eliminar el boton siguiente

const botonJugar = document.getElementById('popupJugar');

let indiceActual = 0; //Indice del nivel actual que va del 0 al 10

let disparador = null; //Es un puntero o memoria temporal para guardar la referencia al elemento HTML

//Funcion asincrona que realiza la peticion inicial de datos
async function cargarNivelesDesdeAPI() {
    try {
        const respuesta = await fetch('/api/niveles?cantidad=10&from=0');
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        nivelesAPI = await respuesta.json();
        
        renderizarListaNiveles();

    } catch (error) {
        console.error('Error al cargar niveles:', error);

        const lista = document.querySelector('ol');

        if (lista) {
            lista.innerHTML = '<li>Error al cargar los niveles. Revisá que el servidor esté encendido.</li>';
        }
    }
}

function renderizarListaNiveles() {
    const lista = document.querySelector('ol');

    lista.innerHTML = ''; 

    nivelesAPI.forEach((nivel, index) => {

        const li = document.createElement('li');

        const article = document.createElement('article');

        article.className = 'nivel';

        const enlace = document.createElement('a');

        enlace.href = '#';
        
        enlace.dataset.indice = index; 

        enlace.textContent = nivel.nombre;

        enlace.addEventListener('click', (evento) => {

            evento.preventDefault();

            abrirPopup(index, enlace);
        });
        article.appendChild(enlace);

        li.appendChild(article);

        lista.appendChild(li);
    });
}

function cargarNivelEnPopup(indice) {
    const nivel = nivelesAPI[indice];

    if (!nivel) return;

    const numero = nivel.id;

    const textoTitulo = `Nivel ${numero} - ${nivel.nombre}`;

    nombre.textContent = textoTitulo;

    nombre.classList.toggle('titulo-largo', textoTitulo.length > 32);

    imagen.src = '/Imagenes/Niveles/espacio.jpg'; 

    imagen.alt = `Imagen del nivel ${numero}: ${nivel.nombre}`;

    descripcion.textContent = nivel.descripcion;

    descripcion.scrollTop = 0;

    dificultad.textContent = nivel.dificultad;

    tiempoLimite.textContent = `${nivel.tiempoLimite}s`;

    enemigos.textContent = nivel.enemigos;
    
    record.textContent = '--'; 

    const progresoFalso = 0; 

    barra.setAttribute('aria-valuenow', progresoFalso);

    barra.setAttribute('aria-label', `Progreso del Nivel ${numero}`);

    relleno.style.width = `${progresoFalso}%`;

    relleno.textContent = `${progresoFalso}%`;

    botonSiguiente.hidden = indice === nivelesAPI.length - 1;

    indiceActual = indice;
}

function abrirPopup(indice, origen) {
    disparador = origen || null;

    cargarNivelEnPopup(indice);

    fondo.hidden = false;

    document.body.classList.add('popup-abierto');

    botonVolver.focus();
}

function cerrarPopup() {
    fondo.hidden = true;

    document.body.classList.remove('popup-abierto');

    if (disparador) disparador.focus();
}

function siguienteNivel() {
    if (indiceActual < nivelesAPI.length - 1) { 

        cargarNivelEnPopup(indiceActual + 1);
        
        if (botonSiguiente.hidden) botonJugar.focus();
    }
}

function jugarNivel() {
    const nivel = nivelesAPI[indiceActual]; 

    document.dispatchEvent(new CustomEvent('daxer:jugar', { detail: { numero: nivel.id, ...nivel } }));

    if (nivel.paginaJuego) {
        window.location.href = nivel.paginaJuego;
    }
}

document.querySelectorAll('.nivel a[data-nivel]').forEach((enlace) => {

    enlace.addEventListener('click', (evento) => {

        evento.preventDefault(); 

        abrirPopup(Number(enlace.dataset.nivel) - 1, enlace);
    });
});

botonVolver.addEventListener('click', cerrarPopup);

botonSiguiente.addEventListener('click', siguienteNivel);

botonJugar.addEventListener('click', jugarNivel);

fondo.addEventListener('click', (evento) => {
    if (evento.target === fondo) cerrarPopup();
});

document.addEventListener('keydown', (evento) => {
    if (fondo.hidden) return;

    if (evento.key === 'Escape') {

        cerrarPopup();

        return;
    }

    if (evento.key === 'Tab') {
        const enfocables = [botonVolver, botonSiguiente, descripcion, botonJugar].filter((el) => !el.hidden);

        const primero = enfocables[0];

        const ultimo = enfocables[enfocables.length - 1];

        if (evento.shiftKey && document.activeElement === primero) {

            evento.preventDefault();

            ultimo.focus();

        } else if (!evento.shiftKey && document.activeElement === ultimo) {

            evento.preventDefault();

            primero.focus();
        }
    }
});

document.addEventListener('DOMContentLoaded', cargarNivelesDesdeAPI);