import { Vector } from "../GeometriaPlana/Vector.js";
import { Dibujante } from "./Dibujante.js";
export class Renderizado extends Dibujante {
    _canvas;
    constructor(canvas) {
        super(canvas.getContext("2d"));
        this._canvas = canvas;
    }
    trazarFormas(formas) {
        for (let forma of formas) {
            forma.trazar(this);
        }
    }
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
            this._context.globalAlpha = opacidad;
            this._context.fillStyle = this._colorFondo;
            this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
            this._context.globalAlpha = this._opacidad;
            this._context.fillStyle = this._color;
        }
        else {
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }
    }
    trazarNormales(forma) {
        let saltoColor = 360 / forma.normales.length;
        let color = 0;
        forma.normales.forEach((normal) => {
            // let normalTrazable: Vector = Vector.escalar(Vector.normalizar(normal), forma.radioTransformado);
            let normalTrazable = normal;
            this.colorVectores = Renderizado.colorHSL(color, 100, 50);
            this.colorTexto = Renderizado.colorHSL(color, 100, 50);
            normalTrazable.origen = Vector.suma(forma.posicion, Vector.escalar(Vector.normalizar(normal), forma.apotema));
            this.trazarVector(normalTrazable);
            color += saltoColor;
        });
    }
}
