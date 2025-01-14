import { Composicion, Cuerpo, Forma, Fuerza, Geometria, Vector } from "../Fuente/mui.js";
const COMPO = Composicion.crearConIDCanvas('canvas');
COMPO.tamanoCanvas(1080, 1080);
//ATRACTORES
const NUMERO_ATRACTORES = 1;
const RADIO_ORIGEN_ATRACTORES = 100;
const RADIO_ATRACTORES = 20;
const CENTRO_ORIGEN_ATRACTORES = { x: COMPO.render.centroCanvas.x + 120, y: COMPO.render.centroCanvas.y };
const MAGNITUD_ATRACCION = 1;
const FormaOrigenAtractores = Forma.poligono(CENTRO_ORIGEN_ATRACTORES.x, CENTRO_ORIGEN_ATRACTORES.y, NUMERO_ATRACTORES, RADIO_ORIGEN_ATRACTORES);
FormaOrigenAtractores.rotacion = Geometria.PI_MEDIO;
const Atractores = [];
FormaOrigenAtractores.verticesTransformados.forEach((vertice) => {
    const atractor = Cuerpo.circunferencia(vertice.x, vertice.y, RADIO_ATRACTORES);
    atractor.estiloGrafico = {
        rellenada: true,
        trazada: false
    };
    Atractores.push(atractor);
});
//CUERPOS
const NUMERO_CUERPOS = 200;
const RADIO_ORIGEN_CUERPOS = 70;
const RADIO_CUERPOS = 30;
const CENTRO_ORIGEN_CUERPOS = { x: COMPO.render.centroCanvas.x, y: COMPO.render.centroCanvas.y };
const FormaOrigenCuerpos = Forma.poligono(CENTRO_ORIGEN_CUERPOS.x, CENTRO_ORIGEN_CUERPOS.y, NUMERO_CUERPOS, RADIO_ORIGEN_CUERPOS);
const Cuerpos = [];
FormaOrigenCuerpos.verticesTransformados.forEach((vertice) => {
    const cuerpo = Cuerpo.circunferencia(vertice.x, vertice.y, RADIO_CUERPOS);
    cuerpo.estiloGrafico = {
        grosorTrazo: 1,
        rellenada: false,
        colorTrazo: 'violet',
        colorRelleno: 'darkred',
    };
    Cuerpos.push(cuerpo);
});
COMPO.agregarCuerpos(...Atractores, ...Cuerpos);
COMPO.renderizarCuerpos();
function atraer() {
    Cuerpos.forEach((cuerpo) => {
        cuerpo.aceleracion = Vector.cero();
        Atractores.forEach((atractor) => {
            cuerpo.aceleracion = cuerpo.aceleracion.sumar(Fuerza.atraer(cuerpo, atractor, MAGNITUD_ATRACCION));
        });
    });
}
COMPO.usarfpsNativos = true;
// COMPO.tick = 40
COMPO.animacion(() => {
    Atractores.forEach(atractor => atractor.rotarSegunPunto(COMPO.render.centroCanvas, 0.02));
    atraer();
    COMPO.moverCuerpos();
}, () => {
    COMPO.render.limpiarCanvas();
    COMPO.renderizarCuerpos();
});
