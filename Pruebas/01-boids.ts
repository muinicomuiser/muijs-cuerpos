import { Geometria, Punto, Forma, Vector, Renderizado, Cuerpo, Fuerza, Restriccion, Entorno, Matematica, Composicion, ManejadorEventos, Grabador } from "../Fuente/mui.js";

/**AQUÍ EMPECÉ A PROBAR ATRACCIONES Y REPULSIONES.*/

const COMPO: Composicion = Composicion.crearConIDCanvas('canvas');
COMPO.tamanoCanvas(1080, 1920)
const Render: Renderizado = COMPO.render;
Render.colorCanvas = Renderizado.colorHSL(220, 100, 0);


//CONSTANTES
const NUMEROBOIDS: number = 200;
const ESCALA: number = 3;
const VELMAXIMA: number = 2;
const RADIOINICIAL: number = 400;

const DISTANCIAREPELER: number = 30;
const FUERZAREPELER: number = 2;

const DISTANCIACOORDINAR: number = 60;
const FACTORCOORDINACION: number = 0.4;

const COLORBOID: string = Renderizado.colorHSL(220, 0, 100);

const DETECTARMOUSE: boolean = true;
const ATRACCIONMOUSE: number = 5;

////////////////

let mousePresente: boolean = false;
let vectorMouse: Vector = Vector.cero();

let entorno: Entorno = Entorno.crearEntornoCanvas(Render.canvas)

/**Forma generadora de posiciones.*/
let formaGeneradora: Forma = Forma.poligono(Render.centroCanvas.x, Render.centroCanvas.y, NUMEROBOIDS, RADIOINICIAL);

/**Generador de círculos.*/
let boids: Cuerpo[] = [];
let verticesboids = [Vector.crear(3, 0), Vector.crear(-1, -1), Vector.crear(0, 0), Vector.crear(-1, 1)]
formaGeneradora.verticesTransformados.forEach((vertice) => {
    let boid: Cuerpo = Cuerpo.poligono(vertice.x, vertice.y, 3, 5);
    boid.vertices = verticesboids;
    boid.posicion = vertice;
    boid.velocidad = Vector.crear(Matematica.aleatorio(-0.5, 0.5), Matematica.aleatorio(-0.5, 0.5));
    boid.escala = ESCALA
    boid.rotarSegunVelocidad = true;
    boid.colorTrazo = COLORBOID;
    boids.push(boid);
})

Grabador.grabarCanvas(Render.canvas, 50000, 60, 'descarga')
animar();

function animar() {
    Render.limpiarCanvas()
    /**Dibujar boids.*/
    boids.forEach((boid) => {
        // boid.aceleracion = Restriccion.limitarAceleracionSegunVelocidad(boid, VELMAXIMA);
        boid.velocidad = Restriccion.limitarVelocidad(boid, VELMAXIMA);
        boid.posicion = entorno.envolverBorde(boid.posicion);
        boid.mover()
        boid.trazar(Render);
        boid.aceleracion = Vector.cero()
    })

    for (let i: number = 0; i < boids.length - 1; i++) {
        for (let j: number = i + 1; j < boids.length; j++) {
            let distancia: number = Geometria.distanciaEntrePuntos(boids[i].posicion, boids[j].posicion);
            if (distancia < DISTANCIACOORDINAR) {
                if (distancia < DISTANCIAREPELER) {
                    boids[i].aceleracion = Fuerza.repeler(boids[i], boids[j], FUERZAREPELER * (1 / distancia))
                    boids[j].aceleracion = boids[i].aceleracion.invertir()
                }
                let velI: Vector = boids[i].velocidad;
                boids[i].velocidad = boids[i].velocidad.sumar(boids[j].velocidad.escalar(FACTORCOORDINACION * (1 / distancia)))
                boids[j].velocidad = boids[j].velocidad.sumar(velI.escalar(FACTORCOORDINACION * (1 / distancia)))
            }

        }
    }
    if (DETECTARMOUSE && mousePresente) {
        boids.forEach((boid) => {
            let distanciaMouse: number = Geometria.distanciaEntrePuntos(boid.posicion, vectorMouse);
            boid.aceleracion = boid.aceleracion.sumar(Fuerza.atraerAVector(boid, vectorMouse, ATRACCIONMOUSE * (1 / distanciaMouse)));

        })
    }
    requestAnimationFrame(animar);
}

function setMousePresente(presente: boolean): void {
    if (DETECTARMOUSE) {
        mousePresente = presente;
    }
}

ManejadorEventos.mouseEnCanvas('mouseenter', Render.canvas, setMousePresente, true);
ManejadorEventos.mouseEnCanvas('mouseleave', Render.canvas, setMousePresente, false);
ManejadorEventos.eventoMouseEnCanvas('mousemove', Render.canvas, (evento) => {
    if (DETECTARMOUSE) {
        let mouseX: number = evento.offsetX;
        let mouseY: number = evento.offsetY;
        vectorMouse = Vector.crear(mouseX, mouseY);
    }
});


