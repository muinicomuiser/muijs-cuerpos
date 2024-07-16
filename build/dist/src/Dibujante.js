import { Matematica } from "./Matematica.js";
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
    }
    get color() {
        return this._color;
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
        this._context.lineWidth = this._grosorTrazo;
        this._context.globalAlpha = this._opacidad;
        this._context.stroke();
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
    pathCircunferencia(forma) {
        this._context.beginPath();
        this._context.arc(forma.posicion.x, forma.posicion.y, forma.radio, 0, Matematica.DOS_PI);
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
