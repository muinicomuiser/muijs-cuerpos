import { Composicion, Cuerpo, Entorno, Forma, Fuerza, Contenedor } from "../Fuente/mui.js";
const COMPO = Composicion.crearConIDCanvas('canvas');
COMPO.tamanoCanvas(1080, 1080);
const Render = COMPO.render;
Render.colorCanvas = 'black';
//Contenedor
const RADIOCONTENEDOR = 200;
const contenedor = Contenedor.crearContenedor(Cuerpo.circunferencia(Render.centroCanvas.x, Render.centroCanvas.y, RADIOCONTENEDOR));
//Cuerpos
const NUMEROCUERPOS = 2;
const RADIOCUERPOS = 10;
const cuerpos = [];
const formaGeneradora = Forma.poligono(Render.centroCanvas.x, Render.centroCanvas.y, NUMEROCUERPOS, 100);
formaGeneradora.verticesTransformados.forEach((vertice) => {
    cuerpos.push(Cuerpo.circunferencia(vertice.x, vertice.y, RADIOCUERPOS));
});
cuerpos.forEach((cuerpo) => cuerpo.colorTrazo = 'white');
COMPO.agregarCuerpos(...cuerpos);
contenedor.agregarCuerposContenidos(...cuerpos);
//Entorno
const entorno = Entorno.crearEntornoCanvas(Render.canvas);
entorno.agregarCuerposContenidos(contenedor.cuerpo);
//Gravedad
const atractorGravedad = Cuerpo.circunferencia(Render.centroCanvas.x, 5000, 1);
contenedor.cuerpo.fijo = false;
function animar() {
    // Render.limpiarCanvas()
    cuerpos.forEach((cuerpo) => {
        cuerpo.aceleracion = Fuerza.atraer(cuerpo, atractorGravedad, 0.05);
        cuerpo.velocidad = cuerpo.velocidad.escalar(0.99);
    });
    contenedor.cuerpo.aceleracion = Fuerza.atraer(contenedor.cuerpo, atractorGravedad, 0.1);
    contenedor.cuerpo.velocidad = contenedor.cuerpo.velocidad.escalar(0.99);
    contenedor.mover();
    entorno.rebotarCircunferenciasConBorde();
    atractorGravedad.rotarSegunPunto(Render.centroCanvas, 0.02);
    // entorno.cuerpo.rotar(0.01)
    COMPO.reboteElasticoCuerpos();
    contenedor.rebotarCircunferenciasConBorde();
    COMPO.moverCuerpos();
    // contenedor.cuerpo.trazar(Render)
    // entorno.cuerpo.trazar(Render)
    COMPO.trazarCuerpos();
    requestAnimationFrame(animar);
}
animar();
