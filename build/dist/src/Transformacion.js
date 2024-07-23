import { Vector } from "./Vector.js";
export class Transformacion {
    constructor(x = 0, y = 0, rotacion = 0) {
        this.posicion = Vector.crear(x, y);
        this.rotacion = rotacion;
    }
    transformarConjuntoVectores(vectores) {
        let vectoresTransformados = [];
        for (let vector of vectores) {
            let x = vector.x * Math.cos(this.rotacion) - vector.y * Math.sin(this.rotacion) + this.posicion.x;
            let y = vector.x * Math.sin(this.rotacion) + vector.y * Math.cos(this.rotacion) + this.posicion.y;
            vectoresTransformados.push(Vector.crear(x, y));
        }
        return vectoresTransformados;
    }
    transformarVector(vector) {
        let x = vector.x * Math.cos(this.rotacion) - vector.y * Math.sin(this.rotacion) + this.posicion.x;
        let y = vector.x * Math.sin(this.rotacion) + vector.y * Math.cos(this.rotacion) + this.posicion.y;
        return Vector.crear(x, y);
    }
    desplazarVectores(vectores) {
        let vectoresTransformados = [];
        for (let vector of vectores) {
            let x = vector.x + this.posicion.x;
            let y = vector.y + this.posicion.y;
            vectoresTransformados.push(Vector.crear(x, y));
        }
        return vectoresTransformados;
    }
}
