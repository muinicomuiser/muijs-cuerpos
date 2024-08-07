import { Matematica } from "./Matematica.js";
import { Punto } from "../GeometriaPlana/Punto.js";
/**
 *Índices de la matriz de 2X2 en el arreglo.
 * * +-        -+                       +-              -+
 * | a11    a12 |      a11 = [0][0]     | [0][0]  [0][1] | 
 * |            |      a12 = [0][1]     |                | 
 * | a21    a22 |      a21 = [1][0]     | [1][0]  [1][1] |
 * +-          -+      a22 = [1][1]     +-              -+
 */

//Considerar hacer un objeto Matriz con fila: number[] y columna: number[]

export class Matriz{
    static esMatriz(matriz: number[][]): boolean{
        let numColumnas: number = matriz[0].length;
        for(let fila of matriz){
            if(fila.length != numColumnas){
                return false;
            }
        }
        return true;
    }

    /**Compara las dimensiones de dos matrices.     
     * Retorna true si su dimensión es la misma y false si es distinta.
    */
    static compararDimension(matrizUno: number[][], matrizDos: number[][]){
        if(matrizUno.length != matrizDos.length){
            return false
        }
        for(let i in matrizUno){
            if(matrizUno[i].length != matrizDos[i].length){
                return false
            }
        }
        return true;
    }

    /**Retorna una matriz nula con el número de filas y columnas ingresado.*/
    static nula(filas: number, columnas: number): number[][]{
        if(!Number.isInteger(filas) || !Number.isInteger(columnas) || filas <= 0 || columnas <= 0){
            throw new Error("El método Matriz.nula() solo admite números enteros positivos como argumentos.");
        }
        else {
            let matrizNula: number[][] = [];            
            for(let i: number = 0; i < filas; i++){
                matrizNula.push([]);
                for(let j: number = 0; j < columnas; j++){
                    matrizNula[i].push(0)
                }
            }
            return matrizNula;
        }
    }

    /**Retorna una matriz identidad de la dimensión ingresada.*/
    static identidad(dimension: number): number[][]{
        if(!Number.isInteger(dimension) || dimension <= 0){
            throw new Error("El método Matriz.identidad() solo admite números enteros positivos como argumento.");
        }
        else {
            let matrizIdentidad: number[][] = this.escalar(dimension, 1);            
            return matrizIdentidad;
        }
    }

    /**Retorna una matriz escalar.*/
    static escalar(dimension: number, escalar: number): number[][]{
        if(!Number.isInteger(dimension) || dimension <= 0){
            throw new Error("El método Matriz.escalar() solo admite números enteros positivos como argumentos.");
        }else if(escalar == 0){
            throw new Error("El valor del escalar debe ser distinto de cero.");
        }
        else {
            let matrizEscalar: number[][] = [];            
            for(let i: number = 0; i < dimension; i++){
                matrizEscalar.push([]);
                for(let j: number = 0; j < dimension; j++){
                    if(i == j){
                        matrizEscalar[i].push(escalar);
                    }
                    else{
                        matrizEscalar[i].push(0);
                    }                    
                }
            }
            return matrizEscalar;
        }
    }

    /**Retorna una copia traspuesta de la matriz ingresada.*/
    static traspuesta(matriz: number[][]): number[][]{
        let traspuesta: number[][] = this.nula(matriz[0].length, matriz.length);
        for(let i in traspuesta){
            for(let j in traspuesta[i]){
                traspuesta[i][j] = matriz[j][i];
                // traspuesta[i][j] += matriz[j][i];
            }
        } 
        return traspuesta;
    }

    /**Suma dos matrices y retorna el resultado como una matriz nueva.*/
    static suma(matrizUno: number[][], matrizDos: number[][]): number[][]{
        let suma: number[][] = [];
        if(!this.compararDimension(matrizUno, matrizDos)){
            throw new Error("Las matrices ingresadas deben tener la misma dimensión");
        }
        for(let i in matrizUno){
            suma.push([]);
            for(let j in matrizUno[i]){
                // suma[i].push(matrizUno[i][j] - matrizDos[i][j]);
                suma[i].push(Matematica.suma(matrizUno[i][j], + matrizDos[i][j]));
            }
        }
        return suma;
    } 

    /**Resta dos matrices y retorna el resultado como una matriz nueva.*/
    static resta(matrizUno: number[][], matrizDos: number[][]): number[][]{
        let resta: number[][] = [];
        if(!this.compararDimension(matrizUno, matrizDos)){
            throw new Error("Las matrices ingresadas deben tener la misma dimensión");
        }
        for(let i in matrizUno){
            resta.push([]);
            for(let j in matrizUno[i]){
                // resta[i].push(matrizUno[i][j] - matrizDos[i][j]);
                resta[i].push(Matematica.suma(matrizUno[i][j], - matrizDos[i][j]));
            }
        }
        return resta;
    }

    
    static productoEscalar(matriz: number[][], escalar: number): number[][]{
        if(escalar == 0){
            throw new Error("El valor del escalar debe ser distinto de cero.")
        }
        if(!this.esMatriz(matriz)){
            throw new Error("Las filas de la matriz deben tener la misma cantidad de elementos");
        }
        let matrizEscalada: number[][] = [];
        for(let i in matriz){
            matrizEscalada.push([]);
            for(let elemento of matriz[i]){
                matrizEscalada[i].push(Matematica.multiplicacion(elemento, escalar));
            }
        }
        return matrizEscalada;
    }
    static productoMatriz(matrizUno: number [][], matrizDos: number[][]): number[][]{
        if(matrizUno[0].length != matrizDos.length){
            throw new Error("El número de columnas de la primera matriz debe ser igual al número de filas de la segunda matriz.")
        }
        if(!this.esMatriz(matrizUno) || !this.esMatriz(matrizDos)){
            throw new Error("Las filas de la matriz deben tener la misma cantidad de elementos");
        }
        let producto: number[][] = Matriz.nula(matrizUno.length, matrizDos[0].length);
        for(let i in producto){
            for(let j in producto[i]){
                for(let posicion: number = 0; posicion < matrizUno[0].length; posicion++){
                    let multiplicacion: number = Matematica.multiplicacion(matrizUno[i][posicion], matrizDos[posicion][j]);
                    producto[i][j] = Matematica.suma(producto[i][j], multiplicacion)
                }
            }
        }
        return producto;
    }
    static rotarPunto2D(punto: Punto, angulo: number): Punto{
        let puntoRotado: Punto = {x: punto.x, y: punto.y};
        let matrizRotacion: number[][] = [[Math.cos(angulo), -Math.sin(angulo)],[Math.sin(angulo), Math.cos(angulo)]];
        let matrizRotado: number[][] = this.productoMatriz(matrizRotacion, [[punto.x],[punto.y]]);
        puntoRotado.x = matrizRotado[0][0];
        puntoRotado.y = matrizRotado[1][0];
        return puntoRotado;
    }
    static trasladarPunto2D(punto: Punto, vector: Punto): Punto{
        let matrizRotado: number[][] = Matriz.suma([[punto.x],[punto.y]], [[vector.x],[vector.y]])
        let puntoTrasladado: Punto = {x:matrizRotado[0][0], y: matrizRotado[0][1]};
        return puntoTrasladado;
    }
}