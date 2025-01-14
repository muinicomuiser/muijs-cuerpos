import { Composicion, Cuerpo, Entorno, Matematica, Vector } from "../Fuente/mui.js";
const COMPO = Composicion.crearConIDCanvas('canvas');
COMPO.tamanoCanvas(1920, 1080);
const Render = COMPO.render;
Render.colorCanvas = 'black';
const entorno = Entorno.crearEntornoCanvas(Render.canvas);
COMPO.entorno = entorno;
const NumeroCuerpos = 5000;
let Cuerpos = [];
const RadioCuerpo = 3;
for (let i = 0; i < NumeroCuerpos; i++) {
    const cuerpito = Cuerpo.circunferencia(Matematica.aleatorioEntero(0, Render.anchoCanvas), Matematica.aleatorioEntero(0, Render.altoCanvas), 1.5 * RadioCuerpo * Math.random() + RadioCuerpo);
    cuerpito.masa = Math.pow(cuerpito.radio, 5);
    cuerpito.estiloGrafico = { rellenada: true, colorRelleno: 'white', colorTrazo: 'white' };
    cuerpito.velocidad = Vector.crear(Matematica.aleatorio(-1, 1), Matematica.aleatorio(-1, 1));
    Cuerpos.push(cuerpito);
}
COMPO.agregarCuerpos(...Cuerpos);
COMPO.entorno.agregarCuerposContenidos(...Cuerpos);
//Sección para temporizar los cálculos
let contadorTick = 0;
let tiempoTranscurrido = 0;
function tiempoPromedio(deltaTick) {
    tiempoTranscurrido += deltaTick;
    contadorTick++;
    return tiempoTranscurrido / contadorTick;
}
function animar() {
    // let inicio: number = Date.now()
    Render.limpiarCanvas();
    COMPO.reboteElasticoCuerpos();
    // COMPO.bordesEntornoInfinitos(entorno)
    COMPO.entorno.rebotarCircunferenciasConBorde();
    COMPO.moverCuerpos();
    // COMPO.contactoSimpleCuerpos()
    // Quad.trazar(Render, { colorTrazo: 'white', colorRelleno: 'white' })
    Render.renderizarFormas(Cuerpos);
    // Quad.trazar(Render)
    // let final: number = Date.now() - inicio
    // console.clear()
    // console.log('Duración de cálculo promedio: ', tiempoPromedio(final))
    requestAnimationFrame(animar);
}
animar();
