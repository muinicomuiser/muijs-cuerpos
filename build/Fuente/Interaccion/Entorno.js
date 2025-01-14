//Fricción, bordes, gravedad
import { Contenedor } from "../Fisicas/Contenedor.js";
import { Cuerpo } from "../Fisicas/Cuerpo.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Interaccion } from "./Interaccion.js";
export class Entorno extends Contenedor {
    constructor(canvas, cuerpo) {
        super(cuerpo);
        this.canvas = canvas;
        this.alto = this.canvas.height;
        this.ancho = this.canvas.width;
        this.cuerpo.fijo = true;
    }
    get normales() {
        return Vector.clonarConjunto(this.cuerpo.normales);
    }
    /**Crea un entorno con un cuerpo del tamaño del canvas.
     * Un entorno funciona como un cuerpo contenedor.
     */
    static crearEntornoCanvas(canvas) {
        let cuerpoEntorno = Cuerpo.poligonoSegunVertices([Vector.crear(canvas.width, canvas.height), Vector.crear(0, canvas.height), Vector.crear(0, 0), Vector.crear(canvas.width, 0)]);
        return new Entorno(canvas, cuerpoEntorno);
    }
    /**Mueve un vector que ha excedido las coordenadas de alguno de los bordes al borde opuesto.
     * Convierte al entorno en un entorno infinito.
    */
    envolverBorde(vector) {
        let x = vector.x;
        let y = vector.y;
        if (x > this.ancho) {
            x -= this.ancho;
        }
        if (x < 0) {
            x += this.ancho;
        }
        if (y > this.alto) {
            y -= this.alto;
        }
        if (y < 0) {
            y += this.alto;
        }
        return Vector.crear(x, y);
    }
    colisionConBorde(...cuerpos) {
        return Interaccion.reboteCircunferenciasConEntorno(cuerpos, this.cuerpo);
    }
}
