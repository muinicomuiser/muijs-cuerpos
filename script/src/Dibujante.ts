import { Forma } from "./Formas.js";
import { Matriz } from "./Matrices.js";
import { Matematica } from "./Matematica.js";
import { Punto } from "./Punto.js";
import { Vector } from "./Vector.js";
//POR INCORPORAR:
//  Formato de colores (rgba, hsla, hex)
//  Throw de errores, por valores incompatibles
//  Opacidad, letras
export class Dibujante{
    _color: string;
    _grosorTrazo: number;
    _opacidad: number;
    _colorVectores: string;
    protected _context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D){
        this._context = context;
        this._color = "black";
        this._grosorTrazo = 1;
        this._opacidad = 1;
        this._colorVectores = "red"
    }

    get color(): string{
        return this._color;
    }
    get colorVectores(): string{
        return this._colorVectores;
    }
    get grosorTrazo(): number{
        return this._grosorTrazo;
    }
    get opacidad(): number{
        return this._opacidad
    }
    set color(color: string){
        this._color = color;
    }
    set colorVectores(color: string){
        this._colorVectores = color;
    }
    set grosorTrazo(grosor: number){
        this._grosorTrazo = grosor;
    }
    set opacidad(opacidad: number){
        this._opacidad = opacidad;
    }

    trazar(forma: Forma): void{
        if(forma.id == "circunferencia"){
            this.pathCircunferencia(forma);
        }
        if(forma.id == "poligono"){
            this.pathPoligono(forma);
        }
        if(forma.id == "linea"){
            this.pathLinea(forma);
        }        
        this._context.strokeStyle = this._color;
        if(forma.id == "vector"){
            this.pathLinea(forma);
            this._context.strokeStyle = this._colorVectores;
        }
        this._context.lineWidth = this._grosorTrazo;
        this._context.globalAlpha = this._opacidad;
        this._context.stroke();
        this._context.strokeStyle = this._color;
    }
    rellenar(forma: Forma): void{
        if(forma.id == "circunferencia"){
            this.pathCircunferencia(forma);
        }
        if(forma.id == "poligono"){
            this.pathPoligono(forma);
        }
        if(forma.id == "linea"){
            this.pathPoligono(forma);
        }
        this._context.fillStyle = this._color;
        this._context.globalAlpha = this._opacidad;
        this._context.fill();
    }
    trazarVector(vector: Vector): void{
        let origen: Punto = vector.origen;
        let extremo: Punto = vector.extremo;
        let trazoVector: Forma = Forma.recta(origen, extremo);
        trazoVector.id = "vector";
        this.trazar(trazoVector);
    }
    protected pathCircunferencia(forma: Forma): void{
        this._context.beginPath();
        this._context.arc(forma.centro.x, forma.centro.y, forma.radio, 0, Matematica.DOS_PI);
    }
    protected pathPoligono(forma: Forma){
        this._context.beginPath();
        this._context.moveTo(forma.vertices[0].x, forma.vertices[0].y);
        for (let vertice of forma.vertices){
            this._context.lineTo(vertice.x, vertice.y);
        }
        this._context.closePath();
    }
    protected pathLinea(forma: Forma){
        this._context.beginPath();
        this._context.moveTo(forma.vertices[0].x, forma.vertices[0].y);
        for (let vertice of forma.vertices){
            this._context.lineTo(vertice.x, vertice.y);
        }
    }
}