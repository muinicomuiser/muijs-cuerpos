import { Punto } from "./Punto.js";
import { Vector } from "./Vector.js";
export class Transformacion{
    posicion: Punto;
    rotacion: number;
    constructor(x: number = 0, y: number = 0, rotacion: number = 0){
        this.posicion = {x: x, y: y};
        this.rotacion = rotacion;
    }
    transformarConjuntoVectores(vectores: Vector[]): Vector[]{
        let vectoresTransformados: Vector[] = [];
        for(let vector of vectores){            
            let x: number = vector.x*(Math.cos(this.rotacion) + Math.sin(this.rotacion)) + this.posicion.x;
            let y: number = vector.y*(-Math.sin(this.rotacion) + Math.cos(this.rotacion)) + this.posicion.y;
            vectoresTransformados.push(Vector.crear(x, y));
        }
        return vectoresTransformados;
    }
    transformarVector(vector: Vector): Vector{
        let x: number = vector.x*(Math.cos(this.rotacion) + Math.sin(this.rotacion)) + this.posicion.x;
        let y: number = vector.y*(-Math.sin(this.rotacion) + Math.cos(this.rotacion)) + this.posicion.y;
        return Vector.crear(x, y);
    }
}