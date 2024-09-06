//REPENSAR ESTA CLASE


import { Cuerpo } from "./Cuerpo.js";
import { Forma } from "../GeometriaPlana/Formas.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Interaccion } from "../Interaccion/Interaccion.js";

export class Contenedor {
    cuerpo: Cuerpo;
    cuerpos: Cuerpo[] = []
    constructor(cuerpo: Cuerpo) {
        this.cuerpo = cuerpo;
        this.cuerpo.fijo = true;
    }

    get normales(): Vector[] {
        return Vector.clonarConjunto(this.cuerpo.normales)
    }

    crearContenedor(cuerpo: Cuerpo): Contenedor {
        return new Contenedor(cuerpo);
    }

    rebotarConBorde(cuerpos: Cuerpo[]): Cuerpo[] {
        let cuerposRebotados: Cuerpo[] = Interaccion.reboteCircunferenciasConEntorno(cuerpos, this.cuerpo)
        return cuerposRebotados;
    }

    mover(): void {
        this.cuerpo.mover()
    }
}