import { Forma } from "../GeometriaPlana/Formas.js";
import { Matematica } from "../Utiles/Matematica.js";
import { Punto } from "../GeometriaPlana/Punto.js";
import { Vector } from "../GeometriaPlana/Vector.js";
//POR INCORPORAR:
//  Throw de errores para valores incompatibles
//  Opacidad, letras
export class Dibujante{
    _color: string;
    _colorFondo: string;
    _grosorTrazo: number;
    _opacidad: number;
    _colorVectores: string;
    protected _context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D){
        this._context = context;
        this._color = "black";
        this._colorFondo = "white";
        this._grosorTrazo = 1;
        this._opacidad = 1;
        this._colorVectores = "red"
    }
    get color(): string{
        return this._color;
    }
    get colorFondo(): string{
        return this._colorFondo;
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


    /**Borra el contenido del canvas.       
     * Si se especifica opacidad, pinta el canvas completo usando como color el atributo colorFondo y con la opacidad especificada.
     */
    limpiarCanvas(canvas: HTMLCanvasElement, opacidad?: number): void{
        if(opacidad){
            this._context.globalAlpha = opacidad;
            this._context.fillStyle = this._colorFondo;
            this._context.fillRect(0, 0, canvas.width, canvas.height);
            this._context.globalAlpha = this._opacidad;
            this._context.fillStyle = this._color;
        }
        else{
            this._context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    /**Traza en el canvas la forma ingresada como argumento.*/
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

    /**Rellena en el canvas la forma ingresada como argumento.*/
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

    /** Traza en el canvas el vector ingresado como argumento.      
     * Usa como color el atributo colorVectores.
     */
    trazarVector(vector: Vector): void{
        let origen: Punto = vector.origen;
        let extremo: Punto = {x: vector.origen.x + vector.x, y:vector.origen.y + vector.y};
        this._context.beginPath();
        this._context.moveTo(origen.x, origen.y);
        this._context.lineTo(extremo.x, extremo.y);
        
        this._context.lineWidth = this._grosorTrazo;
        this._context.globalAlpha = this._opacidad;
        this._context.strokeStyle = this._colorVectores;
        this._context.stroke();
    }

    /**Rellena un texto en el canvas según los argumentos ingresados.       
     * Recibe tamaño en pixeles, grosor en un rango de 100 a 900 (como el font-weight de CSS), fuente como font-family y alineacion como instrucción 
     * de CSS de text-align ("center", "left", "right").        
     */
    escribir(texto: string, posicionX: number, posocionY: number, tamano: number, grosor: number = 500, fuente: string = "calibri", alineacion: CanvasTextAlign = "center"): void{
        this._context.textAlign = alineacion;
        this._context.font = `${grosor} ${tamano}px ${fuente}`;
        this._context.globalAlpha = this._opacidad;
        this._context.fillStyle = this._color;
        this._context.fillText(texto, posicionX, posocionY);
    }

    /**Método interno.        
    * Crea un recorrido para una forma con id "circunferencia", usando el método .arc de la interfaz context.      
    */
    protected pathCircunferencia(forma: Forma): void{
        this._context.beginPath();
        this._context.arc(forma.posicion.x, forma.posicion.y, forma.radio, 0, Matematica.DOS_PI);
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