import { QuadTree } from "../Fuente/Interaccion/QuadTree.js";
import { Colision, Composicion, Cuerpo, Entorno, Forma, Fuerza, Geometria, Interaccion, ManejadorEventos, Matematica, Punto, Renderizado, Restriccion, Vector } from "../Fuente/mui.js";

const COMPO: Composicion = Composicion.crearConIDCanvas('canvas');
COMPO.tamanoCanvas(1080, 1080);
const Render: Renderizado = COMPO.render;
Render.colorCanvas = 'black';
let Quad: QuadTree = new QuadTree(0, 0, Render.anchoCanvas, Render.altoCanvas, 50);
const entorno: Entorno = Entorno.crearEntornoCanvas(Render.canvas)

const NumeroCuerpos: number = 6000;
let Cuerpos: Cuerpo[] = []
const RadioCuerpo: number = 3;
for (let i: number = 0; i < NumeroCuerpos; i++) {
    const cuerpito: Cuerpo = Cuerpo.circunferencia(Matematica.aleatorioEntero(0, Render.anchoCanvas), Matematica.aleatorioEntero(0, Render.altoCanvas), RadioCuerpo)
    cuerpito.estiloGrafico = { colorRelleno: 'white', colorTrazo: 'white' }
    cuerpito.velocidad = Vector.crear(Matematica.aleatorioEntero(-3, 3), Matematica.aleatorioEntero(-3, 3))
    Cuerpos.push(cuerpito)
}
COMPO.agregarCuerpos(...Cuerpos)

//Sección para temporizar los cálculos
let contadorTick: number = 0;
let tiempoTranscurrido: number = 0;
function tiempoPromedio(deltaTick: number): number {
    tiempoTranscurrido += deltaTick;
    contadorTick++;
    return tiempoTranscurrido / contadorTick;
}

function animar() {
    Quad = new QuadTree(0, 0, Render.anchoCanvas, Render.altoCanvas, 50)
    Cuerpos.forEach(cuerpo => {
        Quad.insertarPunto(cuerpo.posicion, cuerpo)
    });

    let inicio: number = Date.now()
    Render.limpiarCanvas();
    COMPO.moverCuerpos()
    COMPO.bordesEntornoInfinitos(entorno)

    //Forma Antigua
    // COMPO.reboteElasticoCuerpos()
    // COMPO.contactoSimpleCuerpos()    <-- Aguanta hasta 700~ cuerpos a 16ms por cálculo

    //Forma Nueva
    Quad.colisionCuerpos()  // <-- Aguanta hasta 6000~ cuerpos a 16ms por cálculo


    // Quad.trazar(Render, { colorTrazo: 'white', colorRelleno: 'white' })
    Render.renderizarFormas(Cuerpos);
    let final: number = Date.now() - inicio
    console.clear()
    console.log('Duración de cálculo promedio: ', tiempoPromedio(final))
    requestAnimationFrame(animar)
}
animar()

