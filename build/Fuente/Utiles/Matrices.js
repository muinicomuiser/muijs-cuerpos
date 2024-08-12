"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matriz = void 0;
const Matematica_js_1 = require("./Matematica.js");
/**
 *Índices de la matriz de 2X2 en el arreglo.
 * * +-        -+                       +-              -+
 * | a11    a12 |      a11 = [0][0]     | [0][0]  [0][1] |
 * |            |      a12 = [0][1]     |                |
 * | a21    a22 |      a21 = [1][0]     | [1][0]  [1][1] |
 * +-          -+      a22 = [1][1]     +-              -+
 */
//Considerar hacer un objeto Matriz con fila: number[] y columna: number[]
class Matriz {
    static esMatriz(matriz) {
        let numColumnas = matriz[0].length;
        for (let fila of matriz) {
            if (fila.length != numColumnas) {
                return false;
            }
        }
        return true;
    }
    /**Compara las dimensiones de dos matrices.
     * Retorna true si su dimensión es la misma y false si es distinta.
    */
    static compararDimension(matrizUno, matrizDos) {
        if (matrizUno.length != matrizDos.length) {
            return false;
        }
        for (let i in matrizUno) {
            if (matrizUno[i].length != matrizDos[i].length) {
                return false;
            }
        }
        return true;
    }
    /**Retorna una matriz nula con el número de filas y columnas ingresado.*/
    static nula(filas, columnas) {
        if (!Number.isInteger(filas) || !Number.isInteger(columnas) || filas <= 0 || columnas <= 0) {
            throw new Error("El método Matriz.nula() solo admite números enteros positivos como argumentos.");
        }
        else {
            let matrizNula = [];
            for (let i = 0; i < filas; i++) {
                matrizNula.push([]);
                for (let j = 0; j < columnas; j++) {
                    matrizNula[i].push(0);
                }
            }
            return matrizNula;
        }
    }
    /**Retorna una matriz identidad de la dimensión ingresada.*/
    static identidad(dimension) {
        if (!Number.isInteger(dimension) || dimension <= 0) {
            throw new Error("El método Matriz.identidad() solo admite números enteros positivos como argumento.");
        }
        else {
            let matrizIdentidad = this.escalar(dimension, 1);
            return matrizIdentidad;
        }
    }
    /**Retorna una matriz escalar.*/
    static escalar(dimension, escalar) {
        if (!Number.isInteger(dimension) || dimension <= 0) {
            throw new Error("El método Matriz.escalar() solo admite números enteros positivos como argumentos.");
        }
        else if (escalar == 0) {
            throw new Error("El valor del escalar debe ser distinto de cero.");
        }
        else {
            let matrizEscalar = [];
            for (let i = 0; i < dimension; i++) {
                matrizEscalar.push([]);
                for (let j = 0; j < dimension; j++) {
                    if (i == j) {
                        matrizEscalar[i].push(escalar);
                    }
                    else {
                        matrizEscalar[i].push(0);
                    }
                }
            }
            return matrizEscalar;
        }
    }
    /**Retorna una copia traspuesta de la matriz ingresada.*/
    static traspuesta(matriz) {
        let traspuesta = this.nula(matriz[0].length, matriz.length);
        for (let i in traspuesta) {
            for (let j in traspuesta[i]) {
                traspuesta[i][j] = matriz[j][i];
                // traspuesta[i][j] += matriz[j][i];
            }
        }
        return traspuesta;
    }
    /**Suma dos matrices y retorna el resultado como una matriz nueva.*/
    static suma(matrizUno, matrizDos) {
        let suma = [];
        if (!this.compararDimension(matrizUno, matrizDos)) {
            throw new Error("Las matrices ingresadas deben tener la misma dimensión");
        }
        for (let i in matrizUno) {
            suma.push([]);
            for (let j in matrizUno[i]) {
                // suma[i].push(matrizUno[i][j] - matrizDos[i][j]);
                suma[i].push(Matematica_js_1.Matematica.suma(matrizUno[i][j], +matrizDos[i][j]));
            }
        }
        return suma;
    }
    /**Resta dos matrices y retorna el resultado como una matriz nueva.*/
    static resta(matrizUno, matrizDos) {
        let resta = [];
        if (!this.compararDimension(matrizUno, matrizDos)) {
            throw new Error("Las matrices ingresadas deben tener la misma dimensión");
        }
        for (let i in matrizUno) {
            resta.push([]);
            for (let j in matrizUno[i]) {
                // resta[i].push(matrizUno[i][j] - matrizDos[i][j]);
                resta[i].push(Matematica_js_1.Matematica.suma(matrizUno[i][j], -matrizDos[i][j]));
            }
        }
        return resta;
    }
    static productoEscalar(matriz, escalar) {
        if (escalar == 0) {
            throw new Error("El valor del escalar debe ser distinto de cero.");
        }
        if (!this.esMatriz(matriz)) {
            throw new Error("Las filas de la matriz deben tener la misma cantidad de elementos");
        }
        let matrizEscalada = [];
        for (let i in matriz) {
            matrizEscalada.push([]);
            for (let elemento of matriz[i]) {
                matrizEscalada[i].push(Matematica_js_1.Matematica.multiplicacion(elemento, escalar));
            }
        }
        return matrizEscalada;
    }
    static productoMatriz(matrizUno, matrizDos) {
        if (matrizUno[0].length != matrizDos.length) {
            throw new Error("El número de columnas de la primera matriz debe ser igual al número de filas de la segunda matriz.");
        }
        if (!this.esMatriz(matrizUno) || !this.esMatriz(matrizDos)) {
            throw new Error("Las filas de la matriz deben tener la misma cantidad de elementos");
        }
        let producto = Matriz.nula(matrizUno.length, matrizDos[0].length);
        for (let i in producto) {
            for (let j in producto[i]) {
                for (let posicion = 0; posicion < matrizUno[0].length; posicion++) {
                    let multiplicacion = Matematica_js_1.Matematica.multiplicacion(matrizUno[i][posicion], matrizDos[posicion][j]);
                    producto[i][j] = Matematica_js_1.Matematica.suma(producto[i][j], multiplicacion);
                }
            }
        }
        return producto;
    }
    static rotarPunto2D(punto, angulo) {
        let puntoRotado = { x: punto.x, y: punto.y };
        let matrizRotacion = [[Math.cos(angulo), -Math.sin(angulo)], [Math.sin(angulo), Math.cos(angulo)]];
        let matrizRotado = this.productoMatriz(matrizRotacion, [[punto.x], [punto.y]]);
        puntoRotado.x = matrizRotado[0][0];
        puntoRotado.y = matrizRotado[1][0];
        return puntoRotado;
    }
    static trasladarPunto2D(punto, vector) {
        let matrizRotado = Matriz.suma([[punto.x], [punto.y]], [[vector.x], [vector.y]]);
        let puntoTrasladado = { x: matrizRotado[0][0], y: matrizRotado[0][1] };
        return puntoTrasladado;
    }
}
exports.Matriz = Matriz;
