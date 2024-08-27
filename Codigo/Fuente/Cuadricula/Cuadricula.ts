import { Dibujante } from "../mui.js";
import { Renderizado } from "../Renderizado/Renderizado.js";
import { Matematica } from "../Utiles/Matematica.js";
import { Celda } from "./Celda.js";

export class Cuadricula{

    filas: number;
    columnas: number;
    tamanoCelda: number;
    celdas: Celda[] = []
    estados: number; 
    _colorCeldas: string = '';

    constructor(filas: number, columnas: number, tamanoCelda: number, estados: number){
        this.filas = filas;
        this.columnas = columnas;
        this.tamanoCelda = tamanoCelda;
        this.celdas = this.crearCeldas();
        this.estados = estados;
    }

    get anchoCuadricula(): number{
        return this.columnas * this.tamanoCelda
    }
    
    get altoCuadricula(): number{
        return this.filas * this.tamanoCelda
    }

    set colorCeldas(color: string){
        this.celdas.forEach((celda)=> celda.color = color);
        this._colorCeldas = color
    }

    crearCeldas(): Celda[]{
        let celdasNuevas: Celda[] = [];
        for(let fila: number = 1; fila <= this.filas; fila++){
            for(let columna: number = 1; columna <= this.columnas; columna++){
                let celda: Celda = new Celda(columna, fila, this.tamanoCelda);
                celdasNuevas.push(celda);
            }
        }
        return celdasNuevas;
    }

    rellenarCeldas(dibujante: Dibujante): void{
        this.celdas.forEach((celda)=> {
            dibujante.opacidad = (celda.estado / (this.estados - 1));
            celda.rellenar(dibujante);
        })
    }

    estadosAleatorios(): void{
        this.celdas.forEach((celda)=>celda.estado = Matematica.aleatorioEntero(0, this.estados - 1));
    }
}