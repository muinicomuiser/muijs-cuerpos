import { Composicion, Cuerpo, Entorno, Forma, Fuerza, Geometria, ManejadorEventos, Matematica, Restriccion } from "../Fuente/mui.js";
const COMPO = Composicion.crearConIDCanvas('canvas');
let ancho = window.visualViewport.width < 600 ? window.visualViewport.width : 600;
let alto = window.visualViewport.height < 600 ? window.visualViewport.height : 600;
// let ancho: number = window.innerWidth < 600 ? window.innerWidth : 600;
// let alto: number = window.innerHeight < 600 ? window.innerHeight : 600;
COMPO.tamanoCanvas(ancho, alto);
const Render = COMPO.render;
Render.colorCanvas = 'black';
window.visualViewport.height;
//CUERPOS
//Formas generadoras
const RADIOGENERADORA = Matematica.aleatorioEntero(180, 220);
const RADIOGENERADORADOS = Matematica.aleatorioEntero(80, 150);
const NUMEROCUERPOSFUERA = Matematica.aleatorioEntero(0, 60);
const NUMEROCUERPOSCENTRO = Matematica.aleatorioEntero(0, 120) + (NUMEROCUERPOSFUERA == 0 ? 1 : 0);
const FormaGeneradora = Forma.poligono(Render.centroCanvas.x, Render.centroCanvas.y, NUMEROCUERPOSFUERA, RADIOGENERADORA, { rotacion: Geometria.gradoARadian(Matematica.aleatorioEntero(0, 360)) });
const FormaGeneradoraDos = Forma.poligono(Render.centroCanvas.x, Render.centroCanvas.y, NUMEROCUERPOSCENTRO, RADIOGENERADORADOS, { rotacion: Geometria.gradoARadian(Matematica.aleatorioEntero(0, 360)) });
//Cuerpos
const RADIOCUERPO = 8;
const RADIOCUERPODOS = 4;
const Circunferencias = [];
FormaGeneradora.verticesTransformados.forEach((vertice) => {
    let circunferencia = Cuerpo.circunferencia(vertice.x, vertice.y, RADIOCUERPO);
    circunferencia.estiloGrafico = { colorRelleno: 'brown', colorTrazo: 'darkblue' };
    circunferencia.masa = 80;
    Circunferencias.push(circunferencia);
});
FormaGeneradoraDos.verticesTransformados.forEach((vertice) => {
    let circunferencia = Cuerpo.circunferencia(vertice.x, vertice.y, RADIOCUERPODOS);
    circunferencia.estiloGrafico = { colorRelleno: 'pink', colorTrazo: 'blue' };
    circunferencia.masa = 10;
    Circunferencias.push(circunferencia);
});
//cuerpo atractor
const MagnitudAtraccion = 0.05;
const RADIOATRACTOR = 30;
const Atractor = Cuerpo.circunferencia(Render.centroCanvas.x, Render.centroCanvas.y, RADIOATRACTOR);
Atractor.masa = 5000;
Atractor.estiloGrafico = { colorRelleno: 'orange', colorTrazo: 'purple', rellenada: true };
Atractor.fijo = false;
//Se integran todos los cuerpos a la composición
COMPO.agregarCuerpos(...Circunferencias, Atractor);
COMPO.nivelesQuadTree = 6;
COMPO.trazarQuadTree = true;
//Frontera del canvas
const Frontera = Entorno.crearEntornoCanvas(Render.canvas);
Frontera.cuerpo.masa = 10000000000;
Frontera.cuerpo.estiloGrafico = { colorTrazo: 'white', grosorTrazo: 4 };
COMPO.usarfpsNativos = true;
COMPO.tick = 10;
COMPO.animacion(() => {
    // let inicio: number = Date.now()
    Circunferencias.forEach((circunferencia) => circunferencia.aceleracion = Fuerza.atraer(circunferencia, Atractor, MagnitudAtraccion));
    Frontera.colisionConBorde(...Circunferencias, Atractor);
    COMPO.moverCuerpos();
    // COMPO.contactoSimpleCuerpos()
    COMPO.reboteElasticoCuerpos();
    COMPO.cuerpos.forEach((cuerpo) => {
        cuerpo.velocidad = Restriccion.limitarVelocidad(cuerpo, 10);
        cuerpo.velocidad = cuerpo.velocidad.escalar(0.999);
    });
    // console.log(Date.now() - inicio)
}, () => {
    Render.limpiarCanvas(0.6);
    Render.trazar(Frontera.cuerpo);
    COMPO.renderizarCuerpos();
});
ManejadorEventos.eventoMouseEnCanvas('click', COMPO.render.canvas, () => COMPO.trazarQuadTree = !COMPO.trazarQuadTree);
