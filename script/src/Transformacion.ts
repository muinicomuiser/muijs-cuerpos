import { Vector } from "./Vector.js";
export class Transformacion{
    posicion: Vector;
    rotacion: number;
    escala: number;
    constructor(x: number = 0, y: number = 0, rotacion: number = 0, escala: number = 1){
        this.posicion = Vector.crear(x, y);
        this.rotacion = rotacion;
        this.escala = escala;
    }
    transformarConjuntoVectores(vectores: Vector[]): Vector[]{
        let vectoresTransformados: Vector[] = Vector.clonarConjunto(vectores);
        vectoresTransformados = this.escalarVectores(vectoresTransformados);
        vectoresTransformados = this.rotarVectores(vectoresTransformados);
        vectoresTransformados = this.desplazarVectores(vectoresTransformados);
        return vectoresTransformados;
    }
    // transformarConjuntoVectores(vectores: Vector[]): Vector[]{
    //     let vectoresTransformados: Vector[] = [];
    //     for(let vector of vectores){            
    //         let x: number = vector.x*Math.cos(this.rotacion) - vector.y*Math.sin(this.rotacion) + this.posicion.x;
    //         let y: number = vector.x*Math.sin(this.rotacion) + vector.y*Math.cos(this.rotacion) + this.posicion.y;
    //         vectoresTransformados.push(Vector.crear(x, y));
    //     }
    //     return vectoresTransformados;
    // }
    transformarVector(vector: Vector): Vector{
        let x: number = vector.x*Math.cos(this.rotacion) - vector.y*Math.sin(this.rotacion) + this.posicion.x;
        let y: number = vector.x*Math.sin(this.rotacion) + vector.y*Math.cos(this.rotacion) + this.posicion.y;
        return Vector.crear(x, y);
    }
    desplazarVectores(vectores: Vector[]): Vector[]{
        let vectoresDesplazados: Vector[] = [];
        for(let vector of vectores){            
            let x: number = vector.x + this.posicion.x;
            let y: number = vector.y + this.posicion.y;
            vectoresDesplazados.push(Vector.crear(x, y));
        }
        return vectoresDesplazados;
    }
    escalarVectores(vectores: Vector[]): Vector[]{
        let vectoresEscalados: Vector[] = [];
        for(let vector of vectores){
            let vectorEscalado: Vector = Vector.escalar(vector, this.escala);
            vectoresEscalados.push(vectorEscalado);
        }
        return vectoresEscalados;
    }
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