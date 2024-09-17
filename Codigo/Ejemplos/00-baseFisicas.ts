import { Composicion, Cuerpo, Entorno, Forma, Fuerza, Geometria, Matematica, Renderizado, Restriccion, Vector } from "../Fuente/mui.js";

const COMPO: Composicion = Composicion.crearConIDCanvas('canvas');
let ancho: number = window.innerWidth < 600 ? window.innerWidth : 600;
let alto: number = window.innerHeight < 600 ? window.innerHeight : 600;
COMPO.tamanoCanvas(ancho, alto)
const Render: Renderizado = COMPO.render;
Render.colorCanvas = 'black'

//CUERPOS
//Formas generadoras
const RADIOGENERADORA: number = Matematica.aleatorioEntero(180, 220);
const RADIOGENERADORADOS: number = Matematica.aleatorioEntero(80, 150);
const NUMEROCUERPOSFUERA: number = Matematica.aleatorioEntero(0, 40);
const NUMEROCUERPOSCENTRO: number = Matematica.aleatorioEntero(0, 80) + (NUMEROCUERPOSFUERA == 0 ? 1 : 0);
const FormaGeneradora: Forma = Forma.poligono(Render.centroCanvas.x, Render.centroCanvas.y, NUMEROCUERPOSFUERA, RADIOGENERADORA, { rotacion: Geometria.gradoARadian(Matematica.aleatorioEntero(0, 360)) })
const FormaGeneradoraDos: Forma = Forma.poligono(Render.centroCanvas.x, Render.centroCanvas.y, NUMEROCUERPOSCENTRO, RADIOGENERADORADOS, { rotacion: Geometria.gradoARadian(Matematica.aleatorioEntero(0, 360)) })

//Cuerpos
const RADIOCUERPO: number = 8;
const RADIOCUERPODOS: number = 4;
const Circunferencias: Cuerpo[] = []

FormaGeneradora.verticesTransformados.forEach((vertice) => {
    let circunferencia: Cuerpo = Cuerpo.circunferencia(vertice.x, vertice.y, RADIOCUERPO)
    circunferencia.estiloGrafico = { colorRelleno: 'brown', colorTrazo: 'darkblue' }
    circunferencia.masa = 80
    Circunferencias.push(circunferencia);
})

FormaGeneradoraDos.verticesTransformados.forEach((vertice) => {
    let circunferencia: Cuerpo = Cuerpo.circunferencia(vertice.x, vertice.y, RADIOCUERPODOS)
    circunferencia.estiloGrafico = { colorRelleno: 'pink', colorTrazo: 'blue' }
    circunferencia.masa = 10
    Circunferencias.push(circunferencia);
})


//cuerpo atractor
const MagnitudAtraccion: number = 0.02;
const RADIOATRACTOR: number = 30
const Atractor: Cuerpo = Cuerpo.circunferencia(Render.centroCanvas.x, Render.centroCanvas.y, RADIOATRACTOR)
Atractor.masa = 5000
Atractor.estiloGrafico = { colorRelleno: 'orange', colorTrazo: 'purple', rellenada: true }
Atractor.fijo = false;


//Se integran todos los cuerpos a la composición
COMPO.agregarCuerpos(...Circunferencias, Atractor);


//Frontera del canvas
const Frontera: Entorno = Entorno.crearEntornoCanvas(Render.canvas);
Frontera.cuerpo.masa = 10000000000;
Frontera.cuerpo.estiloGrafico = { colorTrazo: 'white', grosorTrazo: 4 }


//Animación
function animar() {
    Render.limpiarCanvas()

    Circunferencias.forEach((circunferencia) => circunferencia.aceleracion = Fuerza.atraer(circunferencia, Atractor, MagnitudAtraccion))
    Frontera.colisionConBorde(...Circunferencias, Atractor);
    COMPO.moverCuerpos()
    // COMPO.contactoSimpleCuerpos()
    COMPO.reboteElasticoCuerpos()

    COMPO.cuerpos.forEach((cuerpo) => {
        cuerpo.velocidad = Restriccion.limitarVelocidad(cuerpo, 10)
        cuerpo.velocidad = Vector.escalar(cuerpo.velocidad, 0.999)
    })

    Render.trazar(Frontera.cuerpo);
    COMPO.renderizarCuerpos();
    requestAnimationFrame(animar)
}
animar()