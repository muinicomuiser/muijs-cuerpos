import { Forma } from "./Formas.js";
import { Matematica } from "./Matematica.js";
//POR INCORPORAR:
//  Throw de errores para valores incompatibles
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
    /**
     * Retorna un string con el color en formato HSL.
     *
     * (hue) recibe grados entre 0 y 360,
     * (saturation) y (lightness) reciben porcentajes.
     */
    static colorHSL(hue, saturation, lightness) {
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    /**
     * Retorna un string con el color en formato HSLA.
     *
     * (hue) recibe grados entre 0 y 360,
     * (saturation) y (lightness) reciben porcentajes, y (alpha)
     * valores entre 0 y 1.
     */
    static colorHSLA(hue, saturation, lightness, alpha) {
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
    }
    /**
     * Retorna un string con el color en formato RGB.
     *
     * (red), (green) y (blue) reciben valores entre 0 y 255.
     */
    static colorRGB(red, green, blue) {
        return `rgb(${red}, ${green}, ${blue})`;
    }
    /**
     * Retorna un string con el color en formato RGBA.
     *
     * (red), (green) y (blue) reciben valores entre 0 y 255,
     * y (alpha) valores entre 0 y 1.
     */
    static colorRGBA(red, green, blue, alpha) {
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
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
        let extremo = { x: vector.origen.x + vector.x, y: vector.origen.y + vector.y };
        let trazoVector = Forma.recta(origen, extremo);
        trazoVector.id = "vector";
        this.trazar(trazoVector);
    }
    pathCircunferencia(forma) {
        this._context.beginPath();
        this._context.arc(forma.transformacion.posicion.x, forma.transformacion.posicion.y, forma.radio, 0, Matematica.DOS_PI);
    }
    pathPoligono(forma) {
        this._context.beginPath();
        this._context.moveTo(forma.verticesTransformados[0].x, forma.verticesTransformados[0].y);
        for (let vertice of forma.verticesTransformados) {
            this._context.lineTo(vertice.x, vertice.y);
        }
        this._context.closePath();
    }
    pathLinea(forma) {
        this._context.beginPath();
        this._context.moveTo(forma.verticesTransformados[0].x, forma.verticesTransformados[0].y);
        for (let vertice of forma.verticesTransformados) {
            this._context.lineTo(vertice.x, vertice.y);
        }
    }
}
