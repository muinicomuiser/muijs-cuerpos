//REPENSAR ESTA CLASE
import { Vector } from "../GeometriaPlana/Vector.js";
import { Interaccion } from "../Interaccion/Interaccion.js";
export class Contenedor {
    constructor(cuerpo) {
        this.cuerposContenidos = [];
        this.cuerpo = cuerpo;
        this.cuerpo.fijo = true;
    }
    /**Retorna el conjunto de vectores normales de cada arista del contenedor. */
    get normales() {
        return Vector.clonarConjunto(this.cuerpo.normales);
    }
    /**Retorna un objeto Contenedor a partir de un cuerpo.*/
    static crearContenedor(cuerpo) {
        return new Contenedor(cuerpo);
    }
    /**Agrega cuerpos al conjunto de cuerpos que estarán dentro del contenedor.*/
    agregarCuerposContenidos(...cuerpos) {
        this.cuerposContenidos.push(...cuerpos);
    }
    rebotarCircunferenciasConBorde() {
        Interaccion.reboteCircunferenciasConEntorno(this.cuerposContenidos, this.cuerpo);
    }
    /**Suma la aceleración a la velocidad y la velocidad a la posición.*/
    mover() {
        this.cuerpo.mover();
    }
}
