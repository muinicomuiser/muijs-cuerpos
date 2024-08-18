import { Geometria } from "../Fuente/Utiles/Geometria.js";
import { Forma } from "../Fuente/GeometriaPlana/Formas.js";
import { Vector } from "../Fuente/GeometriaPlana/Vector.js";
import { Renderizado } from "../Fuente/Renderizado/Renderizado.js";
import { Cuerpo } from "../Fuente/Fisicas/Cuerpo.js";
import { Fuerza } from "../Fuente/Fisicas/Fuerza.js";
import { Restriccion } from "../Fuente/Interaccion/Restriccion.js";
import { Entorno } from "../Fuente/Interaccion/Entorno.js";
import { Matematica } from "../Fuente/Utiles/Matematica.js";
/**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/
const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");
CANVAS.width = 1150;
CANVAS.height = 680;
//CONSTANTES
const CENTROCANVAS = { x: CANVAS.width / 2, y: CANVAS.height / 2 };
const NUMEROBOIDS = 200;
const ESCALA = 1.5;
const VELMAXIMA = 2;
const ROTARSEGUNVELOCIDAD = true;
const DISTANCIAREPELER = 20;
const FUERZAREPELER = 1.5;
const DISTANCIACOORDINAR = 40;
const FACTORCOORDINACION = 0.5;
const COLORBOID = Renderizado.colorHSL(220, 0, 100);
const COLORFONDO = Renderizado.colorHSL(220, 100, 0);
const DETECTARMOUSE = true;
const ATRACCIONMOUSE = 0.05;
////////////////
let mousePresente = false;
let vectorMouse = Vector.cero();
CANVAS.style.backgroundColor = COLORFONDO;
window.addEventListener("load", () => {
    let dibu = new Renderizado(CANVAS);
    dibu.colorFondo = COLORFONDO;
    let entorno = new Entorno(CANVAS);
    /**Forma generadora de posiciones.*/
    let formaGeneradora = Forma.poligono(CENTROCANVAS.x, CENTROCANVAS.y, NUMEROBOIDS, 320);
    /**Generador de círculos.*/
    let boids = [];
    let verticesboids = [Vector.crear(3, 0), Vector.crear(-1, -1), Vector.crear(0, 0), Vector.crear(-1, 1)];
    for (let i = 0; i < NUMEROBOIDS; i++) {
        let boid = Cuerpo.poligono(formaGeneradora.verticesTransformados[i].x, formaGeneradora.verticesTransformados[i].y, 3, 5);
        let velocidadInicial = Vector.crear(Matematica.aleatorio(-0.5, 0.5), Matematica.aleatorio(-0.5, 0.5));
        boid.vertices = verticesboids;
        boid.posicion = formaGeneradora.verticesTransformados[i];
        boid.velocidad = velocidadInicial;
        boid.escala = ESCALA;
        boid.rotarSegunVelocidad = ROTARSEGUNVELOCIDAD;
        boid.color = COLORBOID;
        boids.push(boid);
    }
    /**Prueba de tiempo.*/
    function tiempoProceso() {
        let tiempoInicio = Date.now();
        for (let i = 0; i < boids.length - 1; i++) {
            for (let j = i + 1; j < boids.length; j++) {
                let distancia = Geometria.distanciaEntrePuntos(boids[i].posicion, boids[j].posicion);
                if (distancia < DISTANCIACOORDINAR) {
                    if (distancia < DISTANCIAREPELER) {
                        boids[i].aceleracion = Fuerza.repeler(boids[i], boids[j], FUERZAREPELER * (1 / distancia));
                        boids[j].aceleracion = Vector.invertir(boids[i].aceleracion);
                    }
                    let velI = boids[i].velocidad;
                    boids[i].velocidad = Vector.suma(boids[i].velocidad, Vector.escalar(boids[j].velocidad, FACTORCOORDINACION * (1 / distancia)));
                    boids[j].velocidad = Vector.suma(boids[j].velocidad, Vector.escalar(velI, FACTORCOORDINACION * (1 / distancia)));
                }
                if (DETECTARMOUSE && mousePresente) {
                    let distanciaMouse = Geometria.distanciaEntrePuntos(boids[i].posicion, vectorMouse);
                    boids[i].aceleracion = Vector.suma(boids[i].aceleracion, Fuerza.atraerAVector(boids[i], vectorMouse, ATRACCIONMOUSE * (1 / distanciaMouse)));
                    if (j == boids.length - 1) {
                        distanciaMouse = Geometria.distanciaEntrePuntos(boids[j].posicion, vectorMouse);
                        boids[j].aceleracion = Vector.suma(boids[j].aceleracion, Fuerza.atraerAVector(boids[j], vectorMouse, ATRACCIONMOUSE * (1 / distanciaMouse)));
                    }
                }
            }
        }
        /**Dibujar boids.*/
        for (let boid of boids) {
            boid.posicion = entorno.envolverBorde(boid.posicion);
            boid.aceleracion = Restriccion.limitarAceleracionSegunVelocidad(boid, VELMAXIMA);
            boid.velocidad = Restriccion.limitarVelocidad(boid, VELMAXIMA);
            boid.mover();
            boid.trazar(dibu);
        }
        let tiempoFinal = Date.now();
        console.log((`${tiempoFinal - tiempoInicio}` + " milisegundos"));
    }
    tiempoProceso();
    function animar() {
        dibu.limpiarCanvas();
        for (let i = 0; i < boids.length - 1; i++) {
            for (let j = i + 1; j < boids.length; j++) {
                let distancia = Geometria.distanciaEntrePuntos(boids[i].posicion, boids[j].posicion);
                if (distancia < DISTANCIACOORDINAR) {
                    if (distancia < DISTANCIAREPELER) {
                        boids[i].aceleracion = Fuerza.repeler(boids[i], boids[j], FUERZAREPELER * (1 / distancia));
                        boids[j].aceleracion = Vector.invertir(boids[i].aceleracion);
                    }
                    let velI = boids[i].velocidad;
                    boids[i].velocidad = Vector.suma(boids[i].velocidad, Vector.escalar(boids[j].velocidad, FACTORCOORDINACION * (1 / distancia)));
                    boids[j].velocidad = Vector.suma(boids[j].velocidad, Vector.escalar(velI, FACTORCOORDINACION * (1 / distancia)));
                }
                if (DETECTARMOUSE && mousePresente) {
                    let distanciaMouse = Geometria.distanciaEntrePuntos(boids[i].posicion, vectorMouse);
                    boids[i].aceleracion = Vector.suma(boids[i].aceleracion, Fuerza.atraerAVector(boids[i], vectorMouse, ATRACCIONMOUSE * (1 / distanciaMouse)));
                    if (j == boids.length - 1) {
                        distanciaMouse = Geometria.distanciaEntrePuntos(boids[j].posicion, vectorMouse);
                        boids[j].aceleracion = Vector.suma(boids[j].aceleracion, Fuerza.atraerAVector(boids[j], vectorMouse, ATRACCIONMOUSE * (1 / distanciaMouse)));
                    }
                }
            }
        }
        /**Dibujar boids.*/
        for (let boid of boids) {
            boid.posicion = entorno.envolverBorde(boid.posicion);
            boid.aceleracion = Restriccion.limitarAceleracionSegunVelocidad(boid, VELMAXIMA);
            boid.velocidad = Restriccion.limitarVelocidad(boid, VELMAXIMA);
            boid.mover();
            boid.trazar(dibu);
        }
        requestAnimationFrame(animar);
    }
    animar();
});
if (DETECTARMOUSE) {
    CANVAS.addEventListener("mouseenter", (event) => {
        if (event) {
            mousePresente = true;
        }
    });
    CANVAS.addEventListener("mouseleave", (event) => {
        if (event) {
            mousePresente = false;
        }
    });
    CANVAS.addEventListener("mousemove", (event) => {
        let mouseX = event.pageX - CANVAS.offsetLeft;
        let mouseY = event.pageY - CANVAS.offsetTop;
        vectorMouse = Vector.crear(mouseX, mouseY);
    });
}
