import { Geometria, Forma, Vector, Renderizado, Cuerpo, Fuerza, Restriccion, Entorno, Matematica, Composicion, ManejadorEventos, Grabador } from "../Fuente/mui.js";
/**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/
const COMPO = Composicion.crearConIDCanvas('canvas');
COMPO.tamanoCanvas(1080, 1920);
const Render = COMPO.render;
Render.colorCanvas = Renderizado.colorHSL(220, 100, 0);
//CONSTANTES
const NUMEROBOIDS = 200;
const ESCALA = 3;
const VELMAXIMA = 2;
const RADIOINICIAL = 400;
const DISTANCIAREPELER = 30;
const FUERZAREPELER = 2;
const DISTANCIACOORDINAR = 60;
const FACTORCOORDINACION = 0.4;
const COLORBOID = Renderizado.colorHSL(220, 0, 100);
const DETECTARMOUSE = true;
const ATRACCIONMOUSE = 5;
////////////////
let mousePresente = false;
let vectorMouse = Vector.cero();
let entorno = Entorno.crearEntornoCanvas(Render.canvas);
/**Forma generadora de posiciones.*/
let formaGeneradora = Forma.poligono(Render.centroCanvas.x, Render.centroCanvas.y, NUMEROBOIDS, RADIOINICIAL);
/**Generador de círculos.*/
let boids = [];
let verticesboids = [Vector.crear(3, 0), Vector.crear(-1, -1), Vector.crear(0, 0), Vector.crear(-1, 1)];
formaGeneradora.verticesTransformados.forEach((vertice) => {
    let boid = Cuerpo.poligono(vertice.x, vertice.y, 3, 5);
    boid.vertices = verticesboids;
    boid.posicion = vertice;
    boid.velocidad = Vector.crear(Matematica.aleatorio(-0.5, 0.5), Matematica.aleatorio(-0.5, 0.5));
    boid.escala = ESCALA;
    boid.rotarSegunVelocidad = true;
    boid.colorTrazo = COLORBOID;
    boids.push(boid);
});
Grabador.grabarCanvas(Render.canvas, 50000, 60, 'descarga');
animar();
function animar() {
    Render.limpiarCanvas();
    /**Dibujar boids.*/
    boids.forEach((boid) => {
        // boid.aceleracion = Restriccion.limitarAceleracionSegunVelocidad(boid, VELMAXIMA);
        boid.velocidad = Restriccion.limitarVelocidad(boid, VELMAXIMA);
        boid.posicion = entorno.envolverBorde(boid.posicion);
        boid.mover();
        boid.trazar(Render);
        boid.aceleracion = Vector.cero();
    });
    for (let i = 0; i < boids.length - 1; i++) {
        for (let j = i + 1; j < boids.length; j++) {
            let distancia = Geometria.distanciaEntrePuntos(boids[i].posicion, boids[j].posicion);
            if (distancia < DISTANCIACOORDINAR) {
                if (distancia < DISTANCIAREPELER) {
                    boids[i].aceleracion = Fuerza.repeler(boids[i], boids[j], FUERZAREPELER * (1 / distancia));
                    boids[j].aceleracion = boids[i].aceleracion.invertir();
                }
                let velI = boids[i].velocidad;
                boids[i].velocidad = boids[i].velocidad.sumar(boids[j].velocidad.escalar(FACTORCOORDINACION * (1 / distancia)));
                boids[j].velocidad = boids[j].velocidad.sumar(velI.escalar(FACTORCOORDINACION * (1 / distancia)));
            }
        }
    }
    if (DETECTARMOUSE && mousePresente) {
        boids.forEach((boid) => {
            let distanciaMouse = Geometria.distanciaEntrePuntos(boid.posicion, vectorMouse);
            boid.aceleracion = boid.aceleracion.sumar(Fuerza.atraerAVector(boid, vectorMouse, ATRACCIONMOUSE * (1 / distanciaMouse)));
        });
    }
    requestAnimationFrame(animar);
}
function setMousePresente(presente) {
    if (DETECTARMOUSE) {
        mousePresente = presente;
    }
}
ManejadorEventos.mouseEnCanvas('mouseenter', Render.canvas, setMousePresente, true);
ManejadorEventos.mouseEnCanvas('mouseleave', Render.canvas, setMousePresente, false);
ManejadorEventos.eventoMouseEnCanvas('mousemove', Render.canvas, (evento) => {
    if (DETECTARMOUSE) {
        let mouseX = evento.offsetX;
        let mouseY = evento.offsetY;
        vectorMouse = Vector.crear(mouseX, mouseY);
    }
});
