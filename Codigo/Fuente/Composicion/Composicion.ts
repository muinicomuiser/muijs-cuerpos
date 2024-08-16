//Junta los cuerpos, interacciones, entorno, casos límite y renderizado.
//Debería estar acá la creación de canvas y contexto??

import { Cuerpo } from "../Fisicas/Cuerpo.js";
import { Vector } from "../GeometriaPlana/Vector.js";

export class Composicion{
    static actualizarMovimientoCuerpos(cuerpos: Cuerpo[]): Cuerpo[]{
        cuerpos.forEach((cuerpo)=>cuerpo.mover())
        return cuerpos;
    }
}