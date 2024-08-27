import { Punto } from "../GeometriaPlana/Punto.js";
import { Dibujante } from "../mui.js";


export class Celda{
    posicion: Punto;
    tamano: number;
    color: string;
    estado: number;

    constructor(posicionX: number, posicionY: number, tamano: number, estado: number = 1, color: string = ''){
        this.posicion = {x: posicionX, y: posicionY};
        this.tamano = tamano;
        this.color = color;
        this.estado = estado;
    }

    get x(): number{
        return this.posicion.x;
    }
    get y(): number{
        return this.posicion.y;
    }

    rellenar(dibujante: Dibujante): void{
        dibujante.rellenarCelda(this);
    }


}

// Distancia. Métrica máxima. Distancia vecindad
// En matemáticas, la distancia de Chebyshov (o métrica máxima, o métrica L∞) es una métrica1​ definida en un espacio 
// vectorial donde la distancia entre dos puntos (representados por sus vectores) es la mayor de sus diferencias a lo 
// largo de cualquiera de sus dimensiones coordenadas.

// Número de celdas de la vecindad de Moore
// (2r + 1)2 - 1
// Siendo r la distancia métrica.