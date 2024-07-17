import { Forma } from "./Formas.js";
import { Matematica } from "./Matematica.js";
import { Punto } from "./Punto.js";
//POR INCORPORAR:
//  Formato de colores (rgba, hsla, hex)
//  Throw de errores, por valores incompatibles
//  Opacidad, letras
export class Dibujante {
    constructor(context) {
        this._context = context;
        this._color = "black";
        this._grosorTrazo = 1;
        this._opacidad = 1;
        this._colorVectores = "red";
    }
    get color() {
        return this._color;
    }
    get colorVectores() {
        return this._colorVectores;
    }
    get grosorTrazo() {
        return this._grosorTrazo;
    }
    get opacidad() {
        return this._opacidad;
    }
    set color(color) {
        this._color = color;
    }
    set colorVectores(color) {
        this._colorVectores = color;
    }
    set grosorTrazo(grosor) {
        this._grosorTrazo = grosor;
    }
    set opacidad(opacidad) {
        this._opacidad = opacidad;
    }
    trazar(forma) {
        if (forma.id == "circunferencia") {
            this.pathCircunferencia(forma);
        }
        if (forma.id == "poligono") {
            this.pathPoligono(forma);
        }
        if (forma.id == "linea") {
            this.pathLinea(forma);
        }
        this._context.strokeStyle = this._color;
        if (forma.id == "vector") {
            this.pathLinea(forma);
            this._context.strokeStyle = this._colorVectores;
        }
        this._context.lineWidth = this._grosorTrazo;
        this._context.globalAlpha = this._opacidad;
        this._context.stroke();
        this._context.strokeStyle = this._color;
    }
    rellenar(forma) {
        if (forma.id == "circunferencia") {
            this.pathCircunferencia(forma);
        }
        if (forma.id == "poligono") {
            this.pathPoligono(forma);
        }
        if (forma.id == "linea") {
            this.pathPoligono(forma);
        }
        this._context.fillStyle = this._color;
        this._context.globalAlpha = this._opacidad;
        this._context.fill();
    }
    trazarVector(vector) {
        let origen = vector.origen;
        let punta = Punto.crear(vector.x + origen.x, vector.y + origen.y);
        let trazoVector = Forma.recta(origen, punta);
        trazoVector.id = "vector";
        this.trazar(trazoVector);
    }
    pathCircunferencia(forma) {
        this._context.beginPath();
        this._context.arc(forma.centro.x, forma.centro.y, forma.radio, 0, Matematica.DOS_PI);
    }
    pathPoligono(forma) {
        this._context.beginPath();
        this._context.moveTo(forma.vertices[0].x, forma.vertices[0].y);
        for (let vertice of forma.vertices) {
            this._context.lineTo(vertice.x, vertice.y);
        }
        this._context.closePath();
    }
    pathLinea(forma) {
        this._context.beginPath();
        this._context.moveTo(forma.vertices[0].x, forma.vertices[0].y);
        for (let vertice of forma.vertices) {
            this._context.lineTo(vertice.x, vertice.y);
        }
    }
}
