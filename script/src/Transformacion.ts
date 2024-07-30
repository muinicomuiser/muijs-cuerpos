/**
        =============================================
                * MÓDULO DE TRANSFORMACIONES *
        =============================================
        Trabaja sobre conjuntos de vectores.

        Almacena las transformaciones como atributos.

        Siempre retorna copias nuevas de los conjuntos de vectores ingresados.

 */

import { Vector } from "./Vector.js";

/**Aplica transformaciones de escala, rotación y desplazamiento sobre arreglos de vectores.        
 * Siempre retorna copias nuevas de los arreglos.       
 * Almacena en sus atributos los valores de las transformaciones que aplica.
 */
export class Transformacion{
    escala: number;
    rotacion: number;
    posicion: Vector;
    constructor(x: number = 0, y: number = 0, rotacion: number = 0, escala: number = 1){
        this.escala = escala;
        this.rotacion = rotacion;
        this.posicion = Vector.crear(x, y);
    }

    /**Retorna el arreglo de vectores resultante de aplicar las transformaciones de escala, rotación y desplazamiento
     * sobre un arreglo de vectores de entrada.*/
    transformarConjuntoVectores(vectores: Vector[]): Vector[]{
        let vectoresTransformados: Vector[] = Vector.clonarConjunto(vectores);
        vectoresTransformados = this.escalarVectores(vectoresTransformados);
        vectoresTransformados = this.rotarVectores(vectoresTransformados);
        vectoresTransformados = this.desplazarVectores(vectoresTransformados);
        return vectoresTransformados;
    }

    /**Escala cada uno de los vectores del arreglo ingresado y los retorna en un arreglo nuevo.*/
    escalarVectores(vectores: Vector[]): Vector[]{
        let vectoresEscalados: Vector[] = [];
        for(let vector of vectores){
            let vectorEscalado: Vector = Vector.escalar(vector, this.escala);
            vectoresEscalados.push(vectorEscalado);
        }
        return vectoresEscalados;
    }

    /**Desplaza cada uno de los vectores del arreglo ingresado y los retorna en un arreglo nuevo.*/
    desplazarVectores(vectores: Vector[]): Vector[]{
        let vectoresDesplazados: Vector[] = [];
        for(let vector of vectores){            
            let x: number = vector.x + this.posicion.x;
            let y: number = vector.y + this.posicion.y;
            vectoresDesplazados.push(Vector.crear(x, y));
        }
        return vectoresDesplazados;
    }

    /**Rota cada uno de los vectores del arreglo ingresado y los retorna en un arreglo nuevo.*/
    rotarVectores(vectores: Vector[]): Vector[]{
        let vectoresRotados: Vector[] = [];
        for(let vector of vectores){            
            let x: number = vector.x*Math.cos(this.rotacion) - vector.y*Math.sin(this.rotacion);
            let y: number = vector.x*Math.sin(this.rotacion) + vector.y*Math.cos(this.rotacion);
            vectoresRotados.push(Vector.crear(x, y));
        }
        return vectoresRotados;
    }
}