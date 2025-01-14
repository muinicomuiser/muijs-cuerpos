import { Vector } from "../GeometriaPlana/Vector.js";
import { Matematica } from "../Utiles/Matematica.js";
import { Celda } from "./Celda.js";
export class Cuadricula {
    constructor(columnas, filas, tamanoCelda, estados) {
        this._bordesInfinitos = false;
        this.celdas = [];
        this._colorCeldas = 'blue';
        this.filas = filas;
        this.columnas = columnas;
        this.tamanoCelda = tamanoCelda;
        this.celdas = this.crearCeldas();
        this.estados = estados;
    }
    /**Retorna el ancho de la cuadrícula (la multiplicación del número de columnas por el tamaño de cada celda).*/
    get anchoCuadricula() {
        return this.columnas * this.tamanoCelda;
    }
    /**Retorna el alto de la cuadrícula (la multiplicación del número de filas por el tamaño de cada celda).*/
    get altoCuadricula() {
        return this.filas * this.tamanoCelda;
    }
    set bordesInfinitos(borderInfinitos) {
        this._bordesInfinitos = borderInfinitos;
        this.celdas = this.crearCeldas();
    }
    /**Ajusta el color con que se pintarán las celdas.*/
    set colorCeldas(color) {
        if (this._colorCeldas != color) {
            this._colorCeldas = color;
            this.celdas.forEach((celdas) => { celdas.forEach((celda) => celda.color = color); });
        }
    }
    crearCeldas() {
        let celdasNuevas = [];
        for (let columna = 1; columna <= this.columnas; columna++) {
            celdasNuevas.push([]);
            for (let fila = 1; fila <= this.filas; fila++) {
                let celda = new Celda(columna, fila, this.tamanoCelda);
                celda.color = this._colorCeldas;
                celda.posicionVecinos = this.determinarVecinosPorCelda(celda);
                // celda.determinarVecinos(this.columnas, this.filas)
                celdasNuevas[columna - 1].push(celda);
            }
        }
        return celdasNuevas;
    }
    /**Retorna un arreglo con las posiciones de los vecinos de la celda ingresada.
     * Permite definir si las celdas de los bordes incluirán o a las celdas de los bordes opuestos de la cuadrícula entre sus vecinos.
     */
    determinarVecinosPorCelda(celda) {
        const posicionesVecinos = [];
        for (let col = -celda.distanciaVecindad; col <= celda.distanciaVecindad; col++) {
            for (let fil = -celda.distanciaVecindad; fil <= celda.distanciaVecindad; fil++) {
                if (!(col == 0 && fil == 0)) {
                    if (this._bordesInfinitos) {
                        let vecinoX = (celda.columna + col) <= this.columnas ? celda.columna + col : celda.columna + col - this.columnas;
                        vecinoX = vecinoX > 0 ? vecinoX : vecinoX + this.columnas;
                        let vecinoY = (celda.fila + fil) <= this.filas ? celda.fila + fil : celda.fila + fil - this.filas;
                        vecinoY = vecinoY > 0 ? vecinoY : vecinoY + this.filas;
                        posicionesVecinos.push(Vector.crear(vecinoX, vecinoY));
                    }
                    else {
                        if (fil + celda.fila > 0 && fil + celda.fila <= this.filas && col + celda.columna > 0 && col + celda.columna <= this.columnas) {
                            posicionesVecinos.push(Vector.crear(celda.columna + col, celda.fila + fil));
                        }
                    }
                }
            }
        }
        return posicionesVecinos;
    }
    /**Retorna un arreglo de tuplas con el número de vecinos de la celda que están en cada estado posible.
     * [[estado, número de vecinos en ese estado], [estado, número de vecinos en ese estado]...]
     */
    estadosVecinosPorCelda(celda) {
        let vecinos = this.celdas[celda.columna - 1][celda.fila - 1].posicionVecinos;
        let listaEstados = [];
        for (let estado = 0; estado < this.estados; estado++) {
            listaEstados.push([estado, 0]);
        }
        vecinos.forEach(vecino => {
            listaEstados[this.celdaSegunCoordenada(vecino.x, vecino.y).estado][1]++;
        });
        return listaEstados;
    }
    /**Pinta todas las celdas de la cuadrícula. Asigna la opacidad de acuerdo al estado de cada celda.*/
    rellenarCeldas(dibujante) {
        this.celdas.forEach((celdas) => {
            celdas.forEach((celda) => {
                dibujante.estiloForma.opacidad = (celda.estado / (this.estados - 1));
                celda.rellenar(dibujante);
            });
        });
    }
    /**Retorna la celda ubicada en la posicion (columna, fila) respecto a la cuadrícula.*/
    celdaSegunCoordenada(columna, fila) {
        return this.celdas[columna - 1][fila - 1];
    }
    /**Retorna la celda ubicada en la posición del mouse sobre el canvas.*/
    celdaEnPosicionMouse(mouseX, mouseY) {
        let indiceColumna = Math.floor(mouseX / this.tamanoCelda);
        let indiceFila = Math.floor(mouseY / this.tamanoCelda);
        return this.celdas[indiceColumna][indiceFila];
    }
    /**Asigna un estado aleatorio a cada celda de la cuadrícula.*/
    estadosAleatorios() {
        if (this.estados == 1) {
            this.celdas.forEach((celdas) => celdas.forEach((celda) => celda.estado = 1));
        }
        else {
            this.celdas.forEach((celdas) => celdas.forEach((celda) => celda.estado = Matematica.aleatorioEntero(0, this.estados - 1)));
        }
    }
    /**Asigna un estado aleatorio a cada celda de la cuadrícula.*/
    estadosCero() {
        this.celdas.forEach((celdas) => celdas.forEach((celda) => celda.estado = 0));
    }
    /**Asigna el estado máximo a cada celda de la cuadrícula.*/
    estadosMaximos() {
        if (this.estados == 1) {
            this.celdas.forEach((celdas) => celdas.forEach((celda) => celda.estado = 1));
        }
        else {
            this.celdas.forEach((celdas) => celdas.forEach((celda) => celda.estado = this.estados - 1));
        }
    }
}
