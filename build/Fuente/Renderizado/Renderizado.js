import { Vector } from "../GeometriaPlana/Vector.js";
import { Dibujante } from "./Dibujante.js";
/**MÓDULO DE RENDERIZADO
 * Extiende las funciones de Dibujante.
 * Permite trabajar con conjuntos de formas y sobre el canvas.
 * Se instancia usando el canvas.
 */
export class Renderizado extends Dibujante {
    _canvas;
    constructor(canvas) {
        super(canvas.getContext("2d"));
        this._canvas = canvas;
    }
    /**Traza un conjunto de formas.*/
    trazarFormas(formas) {
        for (let forma of formas) {
            forma.trazar(this);
        }
    }
    /**Rellena un conjunto de formas.*/
    rellenarFormas(formas) {
        for (let forma of formas) {
            forma.rellenar(this);
        }
    }
    /**Borra el contenido del canvas.
     * Si se especifica opacidad, pinta el canvas completo usando como color el atributo colorFondo y con la opacidad especificada.
     */
    limpiarCanvas(opacidad) {
        if (opacidad) {
            this.context.globalAlpha = opacidad;
            this.context.fillStyle = this.colorFondo;
            this.context.fillRect(0, 0, this._canvas.width, this._canvas.height);
            this.context.globalAlpha = this.opacidad;
            this.context.fillStyle = this.color;
        }
        else {
            this.context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }
    }
    /**Traza las normales de una forma geométrica.*/
    trazarNormales(forma) {
        forma.normales.forEach((normal) => {
            let normalTrazable = Vector.clonar(normal);
            normalTrazable.origen = Vector.suma(forma.posicion, Vector.escalar(Vector.normalizar(normal), forma.apotema));
            this.trazarVector(normalTrazable);
        });
    }
}
