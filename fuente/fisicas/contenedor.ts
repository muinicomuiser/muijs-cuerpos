//REPENSAR ESTA CLASE

import { Vector } from "../geometria-plana/vector";
import { Interaccion } from "../interaccion/interaccion";
import { Cuerpo } from "./cuerpo";

export class Contenedor {
    cuerpo: Cuerpo;
    cuerposContenidos: Cuerpo[] = []
    constructor(cuerpo: Cuerpo) {
        this.cuerpo = cuerpo;
        this.cuerpo.fijo = true;
    }

    /**Retorna el conjunto de vectores normales de cada arista del contenedor. */
    get normales(): Vector[] {
        return Vector.clonarConjunto(this.cuerpo.normales)
    }

    /**Retorna un objeto Contenedor a partir de un cuerpo.*/
    static crearContenedor(cuerpo: Cuerpo): Contenedor {
        return new Contenedor(cuerpo);
    }

    /**Agrega cuerpos al conjunto de cuerpos que estarán dentro del contenedor.*/
    agregarCuerposContenidos(...cuerpos: Cuerpo[]) {
        this.cuerposContenidos.push(...cuerpos)
    }


    rebotarCircunferenciasConBorde() {
        Interaccion.reboteCircunferenciasConEntorno(this.cuerposContenidos, this.cuerpo)
    }

    /**Suma la aceleración a la velocidad y la velocidad a la posición.*/
    mover(): void {
        this.cuerpo.mover()
    }
}