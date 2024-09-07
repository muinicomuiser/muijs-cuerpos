import { Dibujante } from "../Renderizado/Dibujante.js";
import { Matematica } from "../Utiles/Matematica.js";
import { Celda } from "./Celda.js";

export class Cuadricula {

    filas: number;
    columnas: number;
    /**La dimensión del lado de una celda cuadrada.*/
    tamanoCelda: number;
    celdas: Celda[][] = []
    /**El número de estados posibles que puede adoptar cada celda.*/
    estados: number;
    private _colorCeldas: string = 'blue';

    constructor(columnas: number, filas: number, tamanoCelda: number, estados: number) {
        this.filas = filas;
        this.columnas = columnas;
        this.tamanoCelda = tamanoCelda;
        this.celdas = this.crearCeldas();
        this.estados = estados;
    }

    /**Retorna el ancho de la cuadrícula (la multiplicación del número de columnas por el tamaño de cada celda).*/
    get anchoCuadricula(): number {
        return this.columnas * this.tamanoCelda
    }

    /**Retorna el alto de la cuadrícula (la multiplicación del número de filas por el tamaño de cada celda).*/
    get altoCuadricula(): number {
        return this.filas * this.tamanoCelda
    }

    /**Ajusta el color con que se pintarán las celdas.*/
    set colorCeldas(color: string) {
        if (this._colorCeldas != color) {
            this._colorCeldas = color;
            this.celdas.forEach((celdas) => { celdas.forEach((celda) => celda.color = color) });
        }
    }

    private crearCeldas(): Celda[][] {
        let celdasNuevas: Celda[][] = [];
        for (let columna: number = 1; columna <= this.columnas; columna++) {
            celdasNuevas.push([])
            for (let fila: number = 1; fila <= this.filas; fila++) {
                let celda: Celda = new Celda(columna, fila, this.tamanoCelda);
                celda.color = this._colorCeldas;
                celdasNuevas[columna - 1].push(celda);
            }
        }
        return celdasNuevas;
    }

    /**Pinta todas las celdas de la cuadrícula. Asigna la opacidad de acuerdo al estado de cada celda.*/
    rellenarCeldas(dibujante: Dibujante): void {
        this.celdas.forEach((celdas) => {
            celdas.forEach((celda) => {
                dibujante.estiloForma.opacidad = (celda.estado / (this.estados - 1));
                celda.rellenar(dibujante);
            })
        })
    }

    /**Retorna la celda ubicada en la posicion (columna, fila) respecto a la cuadrícula.*/
    celdaSegunCoordenada(columna: number, fila: number): Celda {
        return this.celdas[columna - 1][fila - 1];
    }

    /**Retorna la celda ubicada en la posición del mouse sobre el canvas.*/
    celdaEnPosicionMouse(mouseX: number, mouseY: number): Celda {
        let indiceColumna: number = Math.floor(mouseX / this.tamanoCelda);
        let indiceFila: number = Math.floor(mouseY / this.tamanoCelda);
        return this.celdas[indiceColumna][indiceFila];
    }

    /**Asigna un estado aleatorio a cada celda de la cuadrícula.*/
    estadosAleatorios(): void {
        if (this.estados == 1) {
            this.celdas.forEach((celdas) => celdas.forEach((celda) => celda.estado = 1));
        }
        else {
            this.celdas.forEach((celdas) => celdas.forEach((celda) => celda.estado = Matematica.aleatorioEntero(0, this.estados - 1)));
        }
    }
}