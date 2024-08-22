
//Fricción, bordes, gravedad

import { Cuerpo } from "../Fisicas/Cuerpo.js";
import { Forma } from "../GeometriaPlana/Formas.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Interaccion } from "./Interaccion.js";

export class Entorno{
    private canvas: HTMLCanvasElement;
    private alto: number;
    private ancho: number;
    cuerpo: Cuerpo;
    constructor(canvas: HTMLCanvasElement, cuerpo?: Cuerpo){
        this.canvas = canvas;
        this.alto = this.canvas.height;
        this.ancho = this.canvas.width;
        if(cuerpo){
            this.cuerpo = cuerpo;
        }
        else{
            this.cuerpo = Cuerpo.poligonoSegunVertices([Vector.crear(this.ancho, this.alto), Vector.crear(0, this.alto), Vector.crear(0, 0), Vector.crear(this.ancho, 0)]);
        }
        this.cuerpo.fijo = true;
    }

    get normales(): Vector[]{
        return Vector.clonarConjunto(this.cuerpo.normales)
    }
        /**Mueve un vector que ha excedido las coordenadas de alguno de los bordes al borde opuesto.        
         * Convierte al entorno en un entorno infinito.
        */
        envolverBorde(vector: Vector): Vector{
            let x: number = vector.x;
            let y: number = vector.y;
            if(x > this.ancho){
                x -= this.ancho
            }
            if(x < 0){
                x += this.ancho
            }
            if(y > this.alto){
                y -= this.alto
            }
            if(y < 0){
                y += this.alto
            }
            return Vector.crear(x, y)
        }

        rebotarConBorde(cuerpos: Cuerpo[]): Cuerpo[]{
            let cuerposRebotados: Cuerpo[] = Interaccion.reboteCircunferenciasConEntorno(cuerpos, this.cuerpo)
            return cuerposRebotados;
        }
}