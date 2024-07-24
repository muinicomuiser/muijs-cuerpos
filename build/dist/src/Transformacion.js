import { Vector } from "./Vector.js";
export class Transformacion {
    constructor(x = 0, y = 0, rotacion = 0, escala = 1) {
        this.posicion = Vector.crear(x, y);
        this.rotacion = rotacion;
        this.escala = escala;
    }
    transformarConjuntoVectores(vectores) {
        let vectoresTransformados = Vector.clonarConjunto(vectores);
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
    transformarVector(vector) {
        let x = vector.x * Math.cos(this.rotacion) - vector.y * Math.sin(this.rotacion) + this.posicion.x;
        let y = vector.x * Math.sin(this.rotacion) + vector.y * Math.cos(this.rotacion) + this.posicion.y;
        return Vector.crear(x, y);
    }
    desplazarVectores(vectores) {
        let vectoresDesplazados = [];
        for (let vector of vectores) {
            let x = vector.x + this.posicion.x;
            let y = vector.y + this.posicion.y;
            vectoresDesplazados.push(Vector.crear(x, y));
        }
        return vectoresDesplazados;
    }
    escalarVectores(vectores) {
        let vectoresEscalados = [];
        for (let vector of vectores) {
            let vectorEscalado = Vector.escalar(vector, this.escala);
            vectoresEscalados.push(vectorEscalado);
        }
        return vectoresEscalados;
    }
    rotarVectores(vectores) {
        let vectoresRotados = [];
        for (let vector of vectores) {
            let x = vector.x * Math.cos(this.rotacion) - vector.y * Math.sin(this.rotacion);
            let y = vector.x * Math.sin(this.rotacion) + vector.y * Math.cos(this.rotacion);
            vectoresRotados.push(Vector.crear(x, y));
        }
        return vectoresRotados;
    }
}
