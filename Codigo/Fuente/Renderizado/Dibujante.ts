import { Forma } from "../GeometriaPlana/Formas.js";
import { Geometria } from "../Utiles/Geometria.js";
import { Punto } from "../GeometriaPlana/Punto.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { TipoFormas } from "../GeometriaPlana/TipoFormas.js";
import { OpcionesTexto } from "./OpcionesTexto.js";
import { Celda } from "../Cuadricula/Celda.js";

/**MÓDULO DE DIBUJO         
 * Instancia una herramienta dibujante.         
 * Métodos para definir colores hsla y rgba, dibujar objetos tipo Forma y escribir.         
 */
export class Dibujante {

    /**Color de la línea al dibujar.*/
    colorTrazo: string;

    /**Color de las formas rellenadas. */
    colorRelleno: string;

    colorCelda: string;

    protected _colorFondo: string;

    /**Grosor de la línea al dibujar.*/
    grosorTrazo: number;

    /**Grosor de la línea al dibujar un vector.*/
    grosorVector: number;

    /**Color de la línea de los vectores.*/
    colorVectores: string;

    opacidad: number;

    /**Interfaz de dibujo sobre el canvas. 2D*/
    context: CanvasRenderingContext2D;

    /**Opciones de color, tamaño, fuente, opacidad y alineación.*/
    opcionesTexto: OpcionesTexto = { color: "red", tamano: 10, fuente: "calibri", opacidad: 1, alineacion: "right" };

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.colorTrazo = "blue";
        this.colorRelleno = "skyblue";
        this.colorCelda = "blue"
        this._colorFondo = "white";
        this.grosorTrazo = 1;
        this.opacidad = 1;
        this.colorVectores = "red"
        this.grosorVector = 1;
    }

    /**
     * Retorna un string con el color en formato HSL.            
     * (hue) recibe grados entre 0 y 360,
     * (saturation) y (lightness) reciben porcentajes.
     */
    static colorHSL(hue: number, saturation: number, lightness: number) {
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    /**
     * Retorna un string con el color en formato HSLA.           
     * (hue) recibe grados entre 0 y 360,
     * (saturation) y (lightness) reciben porcentajes, y (alpha)
     * valores entre 0 y 1.
     */
    static colorHSLA(hue: number, saturation: number, lightness: number, alpha: number) {
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
    }

    /**
     * Retorna un string con el color en formato RGB.            
     * (red), (green) y (blue) reciben valores entre 0 y 255.
     */
    static colorRGB(red: number, green: number, blue: number) {
        return `rgb(${red}, ${green}, ${blue})`;
    }

    /**
     * Retorna un string con el color en formato RGBA.           
     * (red), (green) y (blue) reciben valores entre 0 y 255,
     * y (alpha) valores entre 0 y 1.
     */
    static colorRGBA(red: number, green: number, blue: number, alpha: number) {
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }


    /**Traza en el canvas la forma ingresada como argumento.*/
    trazar(forma: Forma): void {
        if (forma.tipo == TipoFormas.circunferencia) {
            this.pathCircunferencia(forma);
        }
        else if (forma.tipo == TipoFormas.poligono) {
            this.pathPoligono(forma);
        }
        else if (forma.tipo == TipoFormas.linea) {
            this.pathLinea(forma);
        }
        this.context.strokeStyle = this.colorTrazo;
        if (forma.colorTrazo) {
            this.context.strokeStyle = forma.colorTrazo;
        }
        if (forma.tipo == TipoFormas.vector) {
            this.pathLinea(forma);
            this.context.strokeStyle = this.colorVectores;
        }
        this.context.lineWidth = forma.grosorTrazo;
        this.context.globalAlpha = this.opacidad;
        this.context.stroke();
    }


    /**Rellena en el canvas la forma ingresada como argumento.*/
    rellenar(forma: Forma): void {
        if (forma.tipo == TipoFormas.circunferencia) {
            this.pathCircunferencia(forma);
        }
        if (forma.tipo == TipoFormas.poligono) {
            this.pathPoligono(forma);
        }
        if (forma.tipo == TipoFormas.linea) {
            this.pathPoligono(forma);
        }
        this.context.fillStyle = this.colorRelleno;
        if (forma.colorRelleno) {
            this.context.fillStyle = forma.colorRelleno;
        }
        this.context.globalAlpha = this.opacidad;
        this.context.fill();
    }

    /**Rellena en el canvas la forma ingresada como argumento.*/
    rellenarCelda(celda: Celda): void {
        this.context.beginPath();
        this.context.globalAlpha = this.opacidad;
        this.context.fillStyle = this.colorCelda;
        if (celda.color) {
            this.context.fillStyle = celda.color;
        }
        this.context.fillRect((celda.x - 1) * celda.tamano, (celda.y - 1) * celda.tamano, celda.tamano, celda.tamano);
        this.context.globalAlpha = 1;
    }

    /** Traza en el canvas el vector ingresado como argumento.      
     * Usa como color el atributo colorVectores.
     */
    trazarVector(vector: Vector): void {
        let origen: Punto = vector.origen;
        let extremo: Punto = { x: vector.origen.x + vector.x, y: vector.origen.y + vector.y };
        this.context.beginPath();
        this.context.moveTo(origen.x, origen.y);
        this.context.lineTo(extremo.x, extremo.y);

        this.context.lineWidth = this.grosorVector;
        this.context.globalAlpha = this.opacidad;
        this.context.strokeStyle = this.colorVectores;
        this.context.stroke();
    }


    /**Rellena un texto en el canvas en la posicion ingresada.*/
    escribir(texto: string, posicionX: number, posicionY: number): void {
        this.context.textAlign = this.opcionesTexto.alineacion!;
        this.context.font = `${this.opcionesTexto.tamano}px ${this.opcionesTexto.fuente}`;
        // this.context.font = `${this.opcionesTexto.grosor} ${this.opcionesTexto.tamano}px ${this.opcionesTexto.fuente}`;
        this.context.globalAlpha = this.opcionesTexto.opacidad!;
        this.context.fillStyle = this.opcionesTexto.color!;
        this.context.fillText(texto, posicionX, posicionY);
    }


    /**Método interno.        
    * Crea un recorrido para una forma con id "circunferencia", usando el método .arc de la interfaz context.      
    */
    protected pathCircunferencia(forma: Forma): void {
        this.context.beginPath();
        this.context.arc(forma.posicion.x, forma.posicion.y, forma.radioTransformado, 0, Geometria.DOS_PI);
    }


    /**Método interno.        
    * Crea un recorrido para una forma con id "poligono". Registra líneas entre cada vértice del polígono.      
    */
    protected pathPoligono(forma: Forma) {
        this.context.beginPath();
        this.context.moveTo(forma.verticesTransformados[0].x, forma.verticesTransformados[0].y);
        for (let vertice of forma.verticesTransformados) {
            this.context.lineTo(vertice.x, vertice.y);
        }
        this.context.closePath();
    }


    /**Método interno.        
    * Crea un recorrido para una forma con id "linea". Registra una línea entre los dos vértices.      
    */
    protected pathLinea(forma: Forma) {
        this.context.beginPath();
        this.context.moveTo(forma.verticesTransformados[0].x, forma.verticesTransformados[0].y);
        for (let vertice of forma.verticesTransformados) {
            this.context.lineTo(vertice.x, vertice.y);
        }
    }
}