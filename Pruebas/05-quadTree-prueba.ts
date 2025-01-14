import { Composicion, Cuerpo, Entorno, Matematica, Renderizado, Vector } from "../Fuente/mui.js";

const COMPO: Composicion = Composicion.crearConIDCanvas('canvas');
COMPO.tamanoCanvas(1920, 1080);
const Render: Renderizado = COMPO.render;
Render.colorCanvas = 'black';
const entorno: Entorno = Entorno.crearEntornoCanvas(Render.canvas)
COMPO.entorno = entorno;

const NumeroCuerpos: number = 3000;
let Cuerpos: Cuerpo[] = []
const RadioCuerpo: number = 3;
for (let i: number = 0; i < NumeroCuerpos; i++) {
    const cuerpito: Cuerpo = Cuerpo.circunferencia(Matematica.aleatorioEntero(0, Render.anchoCanvas), Matematica.aleatorioEntero(0, Render.altoCanvas), 1.5 * RadioCuerpo * Math.random() + RadioCuerpo)
    cuerpito.masa = cuerpito.radio ** 5
    cuerpito.estiloGrafico = { rellenada: true, colorRelleno: 'white', colorTrazo: 'white' }
    cuerpito.velocidad = Vector.crear(Matematica.aleatorio(-1, 1), Matematica.aleatorio(-1, 1))
    Cuerpos.push(cuerpito)
}
COMPO.agregarCuerpos(...Cuerpos)
COMPO.entorno.agregarCuerposContenidos(...Cuerpos)
//Sección para temporizar los cálculos
let contadorTick: number = 0;
let tiempoTranscurrido: number = 0;
function tiempoPromedio(deltaTick: number): number {
    tiempoTranscurrido += deltaTick;
    contadorTick++;
    return tiempoTranscurrido / contadorTick;
}

function animar() {
    // let inicio: number = Date.now()
    Render.limpiarCanvas();
    COMPO.reboteElasticoCuerpos()
    // COMPO.bordesEntornoInfinitos(entorno)
    COMPO.entorno.rebotarCircunferenciasConBorde()
    COMPO.moverCuerpos()
    // COMPO.contactoSimpleCuerpos()

    // Quad.trazar(Render, { colorTrazo: 'white', colorRelleno: 'white' })
    Render.renderizarFormas(Cuerpos);
    // Quad.trazar(Render)
    // let final: number = Date.now() - inicio
    // console.clear()
    // console.log('Duración de cálculo promedio: ', tiempoPromedio(final))
    requestAnimationFrame(animar)
}
animar()

