import { Composicion, Forma, Renderizado } from "../Fuente/mui.js";

const COMPO: Composicion = Composicion.crearConIDCanvas('canvas');
COMPO.tamanoCanvas(1080, 1080)
const Render: Renderizado = COMPO.render;
Render.colorCanvas = 'black'

let formaPrueba: Forma = Forma.circunferencia(500, 500, 200);
formaPrueba.estiloGrafico = { colorRelleno: 'red', trazada: true, colorTrazo: 'green', opacidad: 1, rellenada: false, grosorTrazo: 10 }
Render.renderizarFormas([formaPrueba.clonar()])