
//Fricción, bordes, gravedad

import { Vector } from "../GeometriaPlana/Vector.js";

export class Entorno{
    private canvas: HTMLCanvasElement;
    private alto: number;
    private ancho: number;
    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        this.alto = this.canvas.height;
        this.ancho = this.canvas.width;
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
}