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
export class Transformacion {
    escala;
    rotacion;
    posicion;
    constructor(x = 0, y = 0, rotacion = 0, escala = 1) {
        this.escala = escala;
        this.rotacion = rotacion;
        this.posicion = Vector.crear(x, y);
    }
    /**Retorna el arreglo de vectores resultante de aplicar las transformaciones de escala, rotación y desplazamiento
     * sobre un arreglo de vectores de entrada.
     * Permite aumentar puntualmente la rotación en un ángulo específico sin modificar la propiedad de rotación de la transformación.*/
    transformarConjuntoVectores(vectores) {
        let vectoresTransformados = Vector.clonarConjunto(vectores);
        vectoresTransformados = this.aplicarEscalaVectores(vectoresTransformados);
        vectoresTransformados = this.aplicarRotacionVectores(vectoresTransformados);
        vectoresTransformados = this.aplicarDesplazamientoVectores(vectoresTransformados);
        return vectoresTransformados;
    }
    /**Escala cada uno de los vectores del arreglo ingresado y los retorna en un arreglo nuevo.*/
    aplicarEscalaVectores(vectores) {
        let vectoresEscalados = [];
        for (let vector of vectores) {
            let vectorEscalado = Vector.escalar(vector, this.escala);
            vectoresEscalados.push(vectorEscalado);
        }
        return vectoresEscalados;
    }
    /**Desplaza cada uno de los vectores del arreglo ingresado y los retorna en un arreglo nuevo.*/
    aplicarDesplazamientoVectores(vectores) {
        let vectoresDesplazados = [];
        for (let vector of vectores) {
            let x = vector.x + this.posicion.x;
            let y = vector.y + this.posicion.y;
            vectoresDesplazados.push(Vector.crear(x, y));
        }
        return vectoresDesplazados;
    }
    /**Rota cada uno de los vectores del arreglo ingresado según el ángulo de rotación almacenado y los retorna en un arreglo nuevo.
    */
    aplicarRotacionVectores(vectores) {
        let vectoresRotados = [];
        for (let vector of vectores) {
            let x = vector.x * Math.cos(this.rotacion) - vector.y * Math.sin(this.rotacion);
            let y = vector.x * Math.sin(this.rotacion) + vector.y * Math.cos(this.rotacion);
            vectoresRotados.push(Vector.crear(x, y));
        }
        return vectoresRotados;
    }
    /**Rota cada uno de los vectores de un arreglo según el ángulo ingresado y los retorna en un arreglo nuevo.
    */
    static rotarVectores(vectores, angulo) {
        let vectoresRotados = [];
        for (let vector of vectores) {
            let x = vector.x * Math.cos(angulo) - vector.y * Math.sin(angulo);
            let y = vector.x * Math.sin(angulo) + vector.y * Math.cos(angulo);
            vectoresRotados.push(Vector.crear(x, y));
        }
        return vectoresRotados;
    }
}
