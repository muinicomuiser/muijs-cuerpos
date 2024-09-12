import { Composicion, Cuerpo, Forma } from "../Fuente/mui.js";

const COMPO: Composicion = new Composicion('canvas')
COMPO.tamanoCanvas(800, 800)
const Circulito: Cuerpo = Cuerpo.circunferencia(COMPO.render.centroCanvas.x, COMPO.render.centroCanvas.y, 200)
Circulito.estiloGrafico = { colorRelleno: 'skyblue' }
COMPO.agregarCuerpos(Circulito)
COMPO.renderizarCuerpos()