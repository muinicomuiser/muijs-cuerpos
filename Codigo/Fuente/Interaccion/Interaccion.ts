//Interacciones entre cuerpos.

import { Cinematica } from "../Fisicas/Cinematica.js";
import { Cuerpo } from "../Fisicas/Cuerpo.js";
import { TipoFormas } from "../GeometriaPlana/TipoFormas.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Geometria } from "../Utiles/Geometria.js";
import { Colision } from "./Colision.js";

export class Interaccion{
    /**Retorna una copia del conjunto de cuerpos con la resolución de rebote para cuerpos que han colisionado.      */
    static reboteEntreCuerpos(cuerpos: Cuerpo[]): Cuerpo[]{
        let cuerposRebotados: Cuerpo[] = [];
        for(let i: number = 0; i < cuerpos.length - 1; i++){
            for(let j: number = i+1; j < cuerpos.length; j++){
                if(Colision.detectar(cuerpos[i], cuerpos[j])){
                    let normales: Vector[] = Colision.normalesContacto(cuerpos[i], cuerpos[j]);
                    cuerpos[i].velocidad = Cinematica.reboteSimple(cuerpos[i], normales[1])
                    cuerpos[j].velocidad = Cinematica.reboteSimple(cuerpos[j], normales[0])
                    cuerpos[i].posicion = Vector.suma(cuerpos[i].posicion, Interaccion.resolverSolapamiento(cuerpos[i], cuerpos[j], normales[1]))
                    cuerpos[j].posicion = Vector.suma(cuerpos[j].posicion, Interaccion.resolverSolapamiento(cuerpos[j], cuerpos[i], normales[0]))
                    // cuerpos[j].posicion = Interaccion.resolverSolapamiento(cuerpos[j], normales[0])
                }
            }
        }
        return cuerpos;
        // return cuerposRebotados;
    }
    private static resolverSolapamiento(cuerpoUno: Cuerpo, cuerpoDos: Cuerpo, normal: Vector): Vector{
        let vectorDesplazamiento: Vector = Vector.normalizar(normal);
        let solapamiento: number = (cuerpoDos.radio + cuerpoUno.radio) - Geometria.distanciaEntrePuntos(cuerpoDos.posicion, cuerpoUno.posicion);
        vectorDesplazamiento = Vector.escalar(vectorDesplazamiento, solapamiento);
        return vectorDesplazamiento;
    }
}