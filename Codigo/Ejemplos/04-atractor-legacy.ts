import { Composicion, Cuerpo, Forma, Fuerza, Geometria, Punto, Vector } from "../Fuente/mui.js";

const COMPO: Composicion = Composicion.crearConIDCanvas('canvas');
COMPO.tamanoCanvas(1080, 1080);

//ATRACTORES
const NUMERO_ATRACTORES: number = 1;
const RADIO_ORIGEN_ATRACTORES: number = 100;
const RADIO_ATRACTORES: number = 20;
const CENTRO_ORIGEN_ATRACTORES: Punto = { x: COMPO.render.centroCanvas.x + 120, y: COMPO.render.centroCanvas.y }
const MAGNITUD_ATRACCION: number = 1;

const FormaOrigenAtractores: Forma = Forma.poligono(CENTRO_ORIGEN_ATRACTORES.x, CENTRO_ORIGEN_ATRACTORES.y, NUMERO_ATRACTORES, RADIO_ORIGEN_ATRACTORES);
FormaOrigenAtractores.rotacion = Geometria.PI_MEDIO;
const Atractores: Cuerpo[] = []
FormaOrigenAtractores.verticesTransformados.forEach((vertice) => {
    const atractor: Cuerpo = Cuerpo.circunferencia(vertice.x, vertice.y, RADIO_ATRACTORES);
    atractor.estiloGrafico = {
        rellenada: true,
        trazada: false

    }
    Atractores.push(atractor)
})


//CUERPOS
const NUMERO_CUERPOS: number = 200;
const RADIO_ORIGEN_CUERPOS: number = 70;
const RADIO_CUERPOS: number = 30;
const CENTRO_ORIGEN_CUERPOS: Punto = { x: COMPO.render.centroCanvas.x, y: COMPO.render.centroCanvas.y }

const FormaOrigenCuerpos: Forma = Forma.poligono(CENTRO_ORIGEN_CUERPOS.x, CENTRO_ORIGEN_CUERPOS.y, NUMERO_CUERPOS, RADIO_ORIGEN_CUERPOS)
const Cuerpos: Cuerpo[] = []
FormaOrigenCuerpos.verticesTransformados.forEach((vertice) => {
    const cuerpo: Cuerpo = Cuerpo.circunferencia(vertice.x, vertice.y, RADIO_CUERPOS)
    cuerpo.estiloGrafico = {
        grosorTrazo: 1,
        rellenada: false,
        colorTrazo: 'violet',
        colorRelleno: 'darkred',
    }
    Cuerpos.push(cuerpo)
})

COMPO.agregarCuerpos(...Atractores, ...Cuerpos)
COMPO.renderizarCuerpos()
function atraer() {
    Cuerpos.forEach((cuerpo) => {
        cuerpo.aceleracion = Vector.cero()
        Atractores.forEach((atractor) => {
            cuerpo.aceleracion = Vector.suma(cuerpo.aceleracion, Fuerza.atraer(cuerpo, atractor, MAGNITUD_ATRACCION))
        })
    })
}
COMPO.usarfpsNativos = true;
// COMPO.tick = 40
COMPO.animacion(() => {
    Atractores.forEach(atractor => atractor.rotarSegunPunto(COMPO.render.centroCanvas, 0.02))
    atraer()
    COMPO.moverCuerpos()
}, () => {
    COMPO.render.limpiarCanvas()
    COMPO.renderizarCuerpos()
})