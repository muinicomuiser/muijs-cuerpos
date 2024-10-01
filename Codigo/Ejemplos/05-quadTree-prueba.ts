import { QuadTree } from "../Fuente/Interaccion/QuadTree.js";
import { Composicion, Cuerpo, Entorno, Forma, Fuerza, ManejadorEventos, Matematica, Renderizado, Restriccion, Vector } from "../Fuente/mui.js";

const COMPO: Composicion = Composicion.crearConIDCanvas('canvas');
COMPO.tamanoCanvas(1080, 1080);
const Render: Renderizado = COMPO.render;
Render.colorCanvas = 'black';
let Circulitos: Forma[] = []
let Quad: QuadTree = new QuadTree(0, 0, Render.anchoCanvas, Render.altoCanvas);

// for (let i: number = 0; i < 1450; i++) {
//     const circu: Forma = Forma.circunferencia(Matematica.aleatorioEntero(0, Render.anchoCanvas), Matematica.aleatorioEntero(0, Render.anchoCanvas), 2);
//     Circulitos.push(circu);
//     Quad.insertarPunto(circu.posicion)
// }
// Render.trazarFormas(Circulitos)
// console.log(Quad)
// Quad.trazar(Render)

ManejadorEventos.eventoMouseEnCanvas('click', Render.canvas, (evento) => {
    Render.limpiarCanvas();
    let MouseX: number = evento.offsetX;
    let MouseY: number = evento.offsetY;
    // Circulitos = [];
    // Quad = new QuadTree(0, 0, Render.anchoCanvas, Render.altoCanvas)
    const circu: Forma = Forma.circunferencia(MouseX, MouseY, 3);
    Circulitos.push(circu);
    circu.estiloGrafico = { colorRelleno: 'red', colorTrazo: 'red' }
    Quad.insertarPunto(circu.posicion)

    // for (let i: number = 0; i < 150; i++) {
    //     const circu: Forma = Forma.circunferencia(Matematica.aleatorioEntero(MouseX - 250, MouseX + 250), Matematica.aleatorioEntero(MouseY - 250, MouseY + 250), 3);
    //     Circulitos.push(circu);
    //     circu.estiloGrafico = { colorRelleno: 'red', colorTrazo: 'red' }
    //     Quad.insertarPunto(circu.posicion)
    // }
    Render.renderizarFormas(Circulitos)
    Quad.trazar(Render, { colorTrazo: 'white' })
})
