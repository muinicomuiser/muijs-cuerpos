import { Forma } from "./Formas.js";
import { Matematica } from "./Matematica.js";
import { Punto } from "./Punto.js";
import { Vector } from "./Vector.js";
//POR INCORPORAR:
//  Throw de errores para valores incompatibles
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
    /**
     * Retorna un string con el color en formato HSL.
     * 
     * (hue) recibe grados entre 0 y 360,
     * (saturation) y (lightness) reciben porcentajes.
     */
    static colorHSL(hue: number, saturation: number, lightness: number){
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    /**
     * Retorna un string con el color en formato HSLA.
     * 
     * (hue) recibe grados entre 0 y 360,
     * (saturation) y (lightness) reciben porcentajes, y (alpha)
     * valores entre 0 y 1.
     */
    static colorHSLA(hue: number, saturation: number, lightness: number, alpha: number){
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
    }
    /**
     * Retorna un string con el color en formato RGB.
     * 
     * (red), (green) y (blue) reciben valores entre 0 y 255.
     */
    static colorRGB(red: number, green: number, blue: number){
        return `rgb(${red}, ${green}, ${blue})`;
    }
    /**
     * Retorna un string con el color en formato RGBA.
     * 
     * (red), (green) y (blue) reciben valores entre 0 y 255,
     * y (alpha) valores entre 0 y 1.
     */
    static colorRGBA(red: number, green: number, blue: number, alpha: number){
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }
    limpiarCanvas(canvas: HTMLCanvasElement): void{
        this._context.clearRect(0, 0, canvas.width, canvas.height);
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
        let extremo: Punto = {x: vector.origen.x + vector.x, y:vector.origen.y + vector.y};
        // let trazoVector: Forma = Forma.recta(origen, extremo);
        // trazoVector.id = "vector";
        // this.trazar(trazoVector);
        this._context.beginPath();
        this._context.moveTo(origen.x, origen.y);
        this._context.lineTo(extremo.x, extremo.y);
        
        this._context.lineWidth = this._grosorTrazo;
        this._context.globalAlpha = this._opacidad;
        this._context.strokeStyle = this._colorVectores;
        this._context.stroke();
    }
    protected pathCircunferencia(forma: Forma): void{
        this._context.beginPath();
        this._context.arc(forma.posicion.x, forma.posicion.y, forma.radio, 0, Matematica.DOS_PI);
    }
    protected pathPoligono(forma: Forma){
        this._context.beginPath();
        this._context.moveTo(forma.verticesTransformados[0].x, forma.verticesTransformados[0].y);
        for (let vertice of forma.verticesTransformados){
            this._context.lineTo(vertice.x, vertice.y);
        }
        this._context.closePath();
    }
    protected pathLinea(forma: Forma){
        this._context.beginPath();
        this._context.moveTo(forma.verticesTransformados[0].x, forma.verticesTransformados[0].y);
        for (let vertice of forma.verticesTransformados){
            this._context.lineTo(vertice.x, vertice.y);
        }
    }
}