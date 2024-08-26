import { Forma } from "../GeometriaPlana/Formas.js";
import { Geometria } from "../Utiles/Geometria.js";
import { Punto } from "../GeometriaPlana/Punto.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { TipoFormas } from "../GeometriaPlana/TipoFormas.js";
/**MÓDULO DE DIBUJO         
 * Instancia una herramienta dibujante.         
 * Métodos para definir colores hsla y rgba, dibujar objetos tipo Forma y escribir.         
 */

export class Dibujante{
    
    color: string;
    colorFondo: string;
    colorTexto: string;
    grosorTrazo: number;
    grosorVector: number;
    opacidad: number;
    colorVectores: string;
    context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D){
        this.context = context;
        this.color = "blue";
        this.colorFondo = "white";
        this.colorTexto = "blue";
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
        }
        else if(forma.tipo == TipoFormas.poligono){
            this.pathPoligono(forma);
        }
        else if(forma.tipo == TipoFormas.linea){
            this.pathLinea(forma);
        }        
        this.context.strokeStyle = this.color;
        if(forma.color){
            this.context.strokeStyle = forma.color;
        }
        if(forma.tipo == TipoFormas.vector){
            this.pathLinea(forma);
            this.context.strokeStyle = this.colorVectores;
        }
        this.context.lineWidth = this.grosorTrazo;
        this.context.globalAlpha = this.opacidad;
        this.context.stroke();
    }


    /**Rellena en el canvas la forma ingresada como argumento.*/
    rellenar(forma: Forma): void{
        if(forma.tipo == TipoFormas.circunferencia){
            this.pathCircunferencia(forma);
        }
        if(forma.tipo == TipoFormas.poligono){
            this.pathPoligono(forma);
        }
        if(forma.tipo == TipoFormas.linea){
            this.pathPoligono(forma);
        }
        this.context.fillStyle = this.color;
        if(forma.color){
            this.context.fillStyle = forma.color;
        }
        this.context.globalAlpha = this.opacidad;
        this.context.fill();
    }


    /** Traza en el canvas el vector ingresado como argumento.      
     * Usa como color el atributo colorVectores.
     */
    trazarVector(vector: Vector): void{
        let origen: Punto = vector.origen;
        let extremo: Punto = {x: vector.origen.x + vector.x, y:vector.origen.y + vector.y};
        this.context.beginPath();
        this.context.moveTo(origen.x, origen.y);
        this.context.lineTo(extremo.x, extremo.y);
        
        this.context.lineWidth = this.grosorVector;
        this.context.globalAlpha = this.opacidad;
        this.context.strokeStyle = this.colorVectores;
        this.context.stroke();
    }


    /**Rellena un texto en el canvas según los argumentos ingresados.       
     * Recibe tamaño en pixeles, grosor en un rango de 100 a 900 (como el font-weight de CSS), alineacion como instrucción de 
     * CSS de text-align ("center", "left", "right") y fuente como font-family.      
     */
    escribir(texto: string, posicionX: number, posicionY: number, tamano: number, grosor: number = 500, alineacion: CanvasTextAlign = "center", fuente: string = "calibri"): void{
        this.context.textAlign = alineacion;
        this.context.font = `${grosor} ${tamano}px ${fuente}`;
        this.context.globalAlpha = this.opacidad;
        this.context.fillStyle = this.colorTexto;
        this.context.fillText(texto, posicionX, posicionY);
    }


    /**Método interno.        
    * Crea un recorrido para una forma con id "circunferencia", usando el método .arc de la interfaz context.      
    */
    protected pathCircunferencia(forma: Forma): void{
        this.context.beginPath();
        this.context.arc(forma.posicion.x, forma.posicion.y, forma.radioTransformado, 0, Geometria.DOS_PI);
    }


    /**Método interno.        
    * Crea un recorrido para una forma con id "poligono". Registra líneas entre cada vértice del polígono.      
    */
    protected pathPoligono(forma: Forma){
        this.context.beginPath();
        this.context.moveTo(forma.verticesTransformados[0].x, forma.verticesTransformados[0].y);
        for (let vertice of forma.verticesTransformados){
            this.context.lineTo(vertice.x, vertice.y);
        }
        this.context.closePath();
    }


    /**Método interno.        
    * Crea un recorrido para una forma con id "linea". Registra una línea entre los dos vértices.      
    */
    protected pathLinea(forma: Forma){
        this.context.beginPath();
        this.context.moveTo(forma.verticesTransformados[0].x, forma.verticesTransformados[0].y);
        for (let vertice of forma.verticesTransformados){
            this.context.lineTo(vertice.x, vertice.y);
        }
    }    
}