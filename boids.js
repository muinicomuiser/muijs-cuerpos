"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matematica_js_1 = require("../Fuente/Utiles/Matematica.js");
const Formas_js_1 = require("../Fuente/GeometriaPlana/Formas.js");
const Vector_js_1 = require("../Fuente/GeometriaPlana/Vector.js");
const Dibujante_js_1 = require("../Fuente/Renderizado/Dibujante.js");
const Cuerpo_js_1 = require("../Fuente/Fisicas/Cuerpo.js");
const Fuerza_js_1 = require("../Fuente/Fisicas/Fuerza.js");
const Geometria_js_1 = require("../Fuente/Utiles/Geometria.js");
const Restriccion_js_1 = require("../Fuente/Interaccion/Restriccion.js");
/**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/
const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");
CANVAS.width = 1150;
CANVAS.height = 680;
//CONSTANTES
const CENTROCANVAS = { x: CANVAS.width / 2, y: CANVAS.height / 2 };
const NUMEROBOIDS = 200;
const ESCALA = 2;
const VELMAXIMA = 3;
const ROTARSEGUNVELOCIDAD = true;
const DISTANCIAREPELER = 10;
const FUERZAREPELER = 20;
const DISTANCIACOORDINAR = 60;
const FACTORCOORDINACION = 0.4;
const COLORBOID = Dibujante_js_1.Dibujante.colorHSL(220, 0, 100);
const COLORFONDO = Dibujante_js_1.Dibujante.colorHSL(220, 100, 2);
const DETECTARMOUSE = true;
const ATRACCIONMOUSE = 0.2;
////////////////
let mousePresente = false;
let vectorMouse = Vector_js_1.Vector.cero();
CANVAS.style.backgroundColor = COLORFONDO;
window.addEventListener("load", () => {
    let dibu = new Dibujante_js_1.Dibujante(CONTEXT);
    dibu.colorFondo = COLORFONDO;
    /**Forma generadora de posiciones.*/
    let formaGeneradora = Formas_js_1.Forma.poligono(CENTROCANVAS.x, CENTROCANVAS.y, NUMEROBOIDS, 320);
    /**Generador de círculos.*/
    let boids = [];
    let verticesboids = [Vector_js_1.Vector.crear(3, 0), Vector_js_1.Vector.crear(-1, -1), Vector_js_1.Vector.crear(0, 0), Vector_js_1.Vector.crear(-1, 1)];
    for (let i = 0; i < NUMEROBOIDS; i++) {
        let boid = Cuerpo_js_1.Cuerpo.poligono(formaGeneradora.verticesTransformados[i].x, formaGeneradora.verticesTransformados[i].y, 3, 5);
        let velocidadInicial = Vector_js_1.Vector.crear(Matematica_js_1.Matematica.aleatorio(-0.5, 0.5), Matematica_js_1.Matematica.aleatorio(-0.5, 0.5));
        boid.vertices = verticesboids;
        boid.posicion = formaGeneradora.verticesTransformados[i];
        boid.velocidad = velocidadInicial;
        boid.escala = ESCALA;
        boid.rotarSegunVelocidad = ROTARSEGUNVELOCIDAD;
        boid.color = COLORBOID;
        boids.push(boid);
    }
    /**Límites infinitos.*/
    function envolverBorde(vector) {
        let x = vector.x;
        let y = vector.y;
        if (x > CANVAS.width) {
            x -= CANVAS.width;
        }
        if (x < 0) {
            x += CANVAS.width;
        }
        if (y > CANVAS.height) {
            y -= CANVAS.height;
        }
        if (y < 0) {
            y += CANVAS.height;
        }
        return Vector_js_1.Vector.crear(x, y);
    }
    /**Prueba de tiempo.*/
    function tiempoProceso() {
        let tiempoInicio = Date.now();
        for (let i = 0; i < boids.length - 1; i++) {
            for (let j = i + 1; j < boids.length; j++) {
                let distancia = Geometria_js_1.Geometria.distanciaEntrePuntos(boids[i].posicion, boids[j].posicion);
                if (distancia < DISTANCIACOORDINAR) {
                    if (distancia < DISTANCIAREPELER) {
                        boids[i].aceleracion = Fuerza_js_1.Fuerza.repeler(boids[i], boids[j], FUERZAREPELER * (1 / distancia));
                        boids[j].aceleracion = Vector_js_1.Vector.invertir(boids[i].aceleracion);
                    }
                    let velI = boids[i].velocidad;
                    boids[i].velocidad = Vector_js_1.Vector.suma(boids[i].velocidad, Vector_js_1.Vector.escalar(boids[j].velocidad, FACTORCOORDINACION * (1 / distancia)));
                    boids[j].velocidad = Vector_js_1.Vector.suma(boids[j].velocidad, Vector_js_1.Vector.escalar(velI, FACTORCOORDINACION * (1 / distancia)));
                }
                if (DETECTARMOUSE && mousePresente) {
                    let distanciaMouse = Geometria_js_1.Geometria.distanciaEntrePuntos(boids[i].posicion, vectorMouse);
                    boids[i].aceleracion = Vector_js_1.Vector.suma(boids[i].aceleracion, Fuerza_js_1.Fuerza.atraerAVector(boids[i], vectorMouse, ATRACCIONMOUSE * (1 / distanciaMouse)));
                    if (j == boids.length - 1) {
                        distanciaMouse = Geometria_js_1.Geometria.distanciaEntrePuntos(boids[j].posicion, vectorMouse);
                        boids[j].aceleracion = Vector_js_1.Vector.suma(boids[j].aceleracion, Fuerza_js_1.Fuerza.atraerAVector(boids[j], vectorMouse, ATRACCIONMOUSE * (1 / distanciaMouse)));
                    }
                }
            }
        }
        /**Dibujar boids.*/
        for (let boid of boids) {
            boid.posicion = envolverBorde(boid.posicion);
            boid.aceleracion = Restriccion_js_1.Restriccion.limitarAceleracionSegunVelocidad(boid, VELMAXIMA);
            boid.velocidad = Restriccion_js_1.Restriccion.limitarVelocidad(boid, VELMAXIMA);
            boid.mover();
            boid.trazar(dibu);
        }
        let tiempoFinal = Date.now();
        console.log((`${tiempoFinal - tiempoInicio}` + " milisegundos"));
    }
    tiempoProceso();
    boids[10].color = Dibujante_js_1.Dibujante.colorHSL(50, 100, 50);
    boids[20].color = Dibujante_js_1.Dibujante.colorHSL(50, 100, 50);
    boids[30].color = Dibujante_js_1.Dibujante.colorHSL(50, 100, 50);
    function animar() {
        dibu.limpiarCanvas(CANVAS);
        for (let i = 0; i < boids.length - 1; i++) {
            for (let j = i + 1; j < boids.length; j++) {
                let distancia = Geometria_js_1.Geometria.distanciaEntrePuntos(boids[i].posicion, boids[j].posicion);
                if (distancia < DISTANCIACOORDINAR) {
                    if (distancia < DISTANCIAREPELER) {
                        boids[i].aceleracion = Fuerza_js_1.Fuerza.repeler(boids[i], boids[j], FUERZAREPELER * (1 / distancia));
                        boids[j].aceleracion = Vector_js_1.Vector.invertir(boids[i].aceleracion);
                    }
                    let velI = boids[i].velocidad;
                    boids[i].velocidad = Vector_js_1.Vector.suma(boids[i].velocidad, Vector_js_1.Vector.escalar(boids[j].velocidad, FACTORCOORDINACION * (1 / distancia)));
                    boids[j].velocidad = Vector_js_1.Vector.suma(boids[j].velocidad, Vector_js_1.Vector.escalar(velI, FACTORCOORDINACION * (1 / distancia)));
                }
                if (DETECTARMOUSE && mousePresente) {
                    let distanciaMouse = Geometria_js_1.Geometria.distanciaEntrePuntos(boids[i].posicion, vectorMouse);
                    boids[i].aceleracion = Vector_js_1.Vector.suma(boids[i].aceleracion, Fuerza_js_1.Fuerza.atraerAVector(boids[i], vectorMouse, ATRACCIONMOUSE * (1 / distanciaMouse)));
                    if (j == boids.length - 1) {
                        distanciaMouse = Geometria_js_1.Geometria.distanciaEntrePuntos(boids[j].posicion, vectorMouse);
                        boids[j].aceleracion = Vector_js_1.Vector.suma(boids[j].aceleracion, Fuerza_js_1.Fuerza.atraerAVector(boids[j], vectorMouse, ATRACCIONMOUSE * (1 / distanciaMouse)));
                    }
                }
            }
        }
        /**Dibujar boids.*/
        for (let boid of boids) {
            boid.posicion = envolverBorde(boid.posicion);
            boid.aceleracion = Restriccion_js_1.Restriccion.limitarAceleracionSegunVelocidad(boid, VELMAXIMA);
            boid.velocidad = Restriccion_js_1.Restriccion.limitarVelocidad(boid, VELMAXIMA);
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
        let mouseX = event.pageX;
        let mouseY = event.pageY;
        vectorMouse = Vector_js_1.Vector.crear(mouseX, mouseY);
    });
}
