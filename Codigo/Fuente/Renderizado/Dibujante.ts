import { Forma } from "../GeometriaPlana/Formas.js";
import { Geometria } from "../Utiles/Geometria.js";
import { Punto } from "../GeometriaPlana/Punto.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { TipoFormas } from "../GeometriaPlana/TipoFormas.js";
//POR INCORPORAR:
//  Throw de errores para valores incompatibles
//  Opacidad, letras
export class Dibujante{
    protected _color: string;
    protected _colorFondo: string;
    protected _colorTexto: string;
    protected _grosorTrazo: number;
    protected _grosorVector: number;
    protected _opacidad: number;
    protected _colorVectores: string;
    protected _context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D){
        this._context = context;
        this._color = "black";
        this._colorFondo = "white";
        this._colorTexto = "white";
        this._grosorTrazo = 1;
        this._opacidad = 1;
        this._colorVectores = "red"
        this._grosorVector = 1;
    }
    get color(): string{
        return this._color;
    }
    get colorFondo(): string{
        return this._colorFondo;
    }
    get colorTexto(): string{
        return this._colorTexto;
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
    set colorFondo(color: string){
        this._colorFondo = color;
    }
    set colorTexto(color: string){
        this._colorTexto = color;
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
    set grosorVector(grosor: number){
        this._grosorVector = grosor;
    }
    /**
     * Retorna un string con el color en formato HSL.            
     * (hue) recibe grados entre 0 y 360,
     * (saturation) y (lightness) reciben porcentajes.
     */
    static colorHSL(hue: number, saturation: number, lightness: number){
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    /**
     * Retorna un string con el color en formato HSLA.           
     * (hue) recibe grados entre 0 y 360,
     * (saturation) y (lightness) reciben porcentajes, y (alpha)
     * valores entre 0 y 1.
     */
    static colorHSLA(hue: number, saturation: number, lightness: number, alpha: number){
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
    }
    /**
     * Retorna un string con el color en formato RGB.            
     * (red), (green) y (blue) reciben valores entre 0 y 255.
     */
    static colorRGB(red: number, green: number, blue: number){
        return `rgb(${red}, ${green}, ${blue})`;
    }
    /**
     * Retorna un string con el color en formato RGBA.           
     * (red), (green) y (blue) reciben valores entre 0 y 255,
     * y (alpha) valores entre 0 y 1.
     */
    static colorRGBA(red: number, green: number, blue: number, alpha: number){
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }


    /**Traza en el canvas la forma ingresada como argumento.*/
    trazar(forma: Forma): void{
        if(forma.tipo == TipoFormas.circunferencia){
            this.pathCircunferencia(forma);
            this._context.strokeStyle = forma.color;
        }
        if(forma.tipo == TipoFormas.poligono){
            this.pathPoligono(forma);
            this._context.strokeStyle = forma.color;
        }
        if(forma.tipo == TipoFormas.linea){
            this.pathLinea(forma);
            this._context.strokeStyle = forma.color;
        }        
        // this._context.strokeStyle = this._color;
        if(forma.tipo == TipoFormas.vector){
            this.pathLinea(forma);
            this._context.strokeStyle = this._colorVectores;
        }
        this._context.lineWidth = this._grosorTrazo;
        this._context.globalAlpha = this._opacidad;
        this._context.stroke();
        this._context.strokeStyle = this._color;
    }

    /**Rellena en el canvas la forma ingresada como argumento.*/
    rellenar(forma: Forma): void{
        if(forma.tipo == TipoFormas.circunferencia){
            this.pathCircunferencia(forma);
            this._context.fillStyle = forma.color;
        }
        if(forma.tipo == TipoFormas.poligono){
            this.pathPoligono(forma);
            this._context.fillStyle = forma.color;
        }
        if(forma.tipo == TipoFormas.linea){
            this.pathPoligono(forma);
            this._context.fillStyle = forma.color;
        }
        // this._context.fillStyle = this._color;
        this._context.globalAlpha = this._opacidad;
        this._context.fill();
    }

    /** Traza en el canvas el vector ingresado como argumento.      
     * Usa como color el atributo colorVectores.
     */
    trazarVector(vector: Vector): void{
        let origen: Punto = vector.origen;
        let extremo: Punto = {x: vector.origen.x + vector.x, y:vector.origen.y + vector.y};
        this._context.beginPath();
        this._context.moveTo(origen.x, origen.y);
        this._context.lineTo(extremo.x, extremo.y);
        
        this._context.lineWidth = this._grosorVector;
        this._context.globalAlpha = this._opacidad;
        this._context.strokeStyle = this._colorVectores;
        this._context.stroke();
    }

    /**Rellena un texto en el canvas según los argumentos ingresados.       
     * Recibe tamaño en pixeles, grosor en un rango de 100 a 900 (como el font-weight de CSS), alineacion como instrucción de 
     * CSS de text-align ("center", "left", "right") y fuente como font-family.      
     */
    escribir(texto: string, posicionX: number, posicionY: number, tamano: number, grosor: number = 500, alineacion: CanvasTextAlign = "center", fuente: string = "calibri"): void{
        this._context.textAlign = alineacion;
        this._context.font = `${grosor} ${tamano}px ${fuente}`;
        this._context.globalAlpha = this._opacidad;
        this._context.fillStyle = this._colorTexto;
        this._context.fillText(texto, posicionX, posicionY);
    }

    /**Método interno.        
    * Crea un recorrido para una forma con id "circunferencia", usando el método .arc de la interfaz context.      
    */
    protected pathCircunferencia(forma: Forma): void{
        this._context.beginPath();
        this._context.arc(forma.posicion.x, forma.posicion.y, forma.radioTransformado, 0, Geometria.DOS_PI);
    }

    /**Método interno.        
    * Crea un recorrido para una forma con id "poligono". Registra líneas entre cada vértice del polígono.      
    */
    protected pathPoligono(forma: Forma){
        this._context.beginPath();
        this._context.moveTo(forma.verticesTransformados[0].x, forma.verticesTransformados[0].y);
        for (let vertice of forma.verticesTransformados){
            this._context.lineTo(vertice.x, vertice.y);
        }
        this._context.closePath();
    }

    /**Método interno.        
    * Crea un recorrido para una forma con id "linea". Registra una línea entre los dos vértices.      
    */
    protected pathLinea(forma: Forma){
        this._context.beginPath();
        this._context.moveTo(forma.verticesTransformados[0].x, forma.verticesTransformados[0].y);
        for (let vertice of forma.verticesTransformados){
            this._context.lineTo(vertice.x, vertice.y);
        }
    }    
}