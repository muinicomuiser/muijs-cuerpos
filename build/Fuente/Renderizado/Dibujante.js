import { Geometria } from "../Utiles/Geometria.js";
import { TipoFormas } from "../GeometriaPlana/TipoFormas.js";
/**MÓDULO DE DIBUJO
 * Instancia una herramienta dibujante.
 * Métodos para definir colores hsla y rgba, dibujar objetos tipo Forma y escribir.
 */
export class Dibujante {
    color;
    colorFondo;
    colorTexto;
    grosorTrazo;
    grosorVector;
    opacidad;
    colorVectores;
    context;
    constructor(context) {
        this.context = context;
        this.color = "blue";
        this.colorFondo = "white";
        this.colorTexto = "blue";
        this.grosorTrazo = 1;
        this.opacidad = 1;
        this.colorVectores = "red";
        this.grosorVector = 1;
    }
    /**
     * Retorna un string con el color en formato HSL.
     * (hue) recibe grados entre 0 y 360,
     * (saturation) y (lightness) reciben porcentajes.
     */
    static colorHSL(hue, saturation, lightness) {
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    /**
     * Retorna un string con el color en formato HSLA.
     * (hue) recibe grados entre 0 y 360,
     * (saturation) y (lightness) reciben porcentajes, y (alpha)
     * valores entre 0 y 1.
     */
    static colorHSLA(hue, saturation, lightness, alpha) {
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
    }
    /**
     * Retorna un string con el color en formato RGB.
     * (red), (green) y (blue) reciben valores entre 0 y 255.
     */
    static colorRGB(red, green, blue) {
        return `rgb(${red}, ${green}, ${blue})`;
    }
    /**
     * Retorna un string con el color en formato RGBA.
     * (red), (green) y (blue) reciben valores entre 0 y 255,
     * y (alpha) valores entre 0 y 1.
     */
    static colorRGBA(red, green, blue, alpha) {
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }
    /**Traza en el canvas la forma ingresada como argumento.*/
    trazar(forma) {
        if (forma.tipo == TipoFormas.circunferencia) {
            this.pathCircunferencia(forma);
            this.context.strokeStyle = forma.color;
        }
        if (forma.tipo == TipoFormas.poligono) {
            this.pathPoligono(forma);
            this.context.strokeStyle = forma.color;
        }
        if (forma.tipo == TipoFormas.linea) {
            this.pathLinea(forma);
            this.context.strokeStyle = forma.color;
        }
        // this.context.strokeStyle = this.color;
        if (forma.tipo == TipoFormas.vector) {
            this.pathLinea(forma);
            this.context.strokeStyle = this.colorVectores;
        }
        this.context.lineWidth = this.grosorTrazo;
        this.context.globalAlpha = this.opacidad;
        this.context.stroke();
        this.context.strokeStyle = this.color;
    }
    /**Rellena en el canvas la forma ingresada como argumento.*/
    rellenar(forma) {
        if (forma.tipo == TipoFormas.circunferencia) {
            this.pathCircunferencia(forma);
            this.context.fillStyle = forma.color;
        }
        if (forma.tipo == TipoFormas.poligono) {
            this.pathPoligono(forma);
            this.context.fillStyle = forma.color;
        }
        if (forma.tipo == TipoFormas.linea) {
            this.pathPoligono(forma);
            this.context.fillStyle = forma.color;
        }
        // this.context.fillStyle = this.color;
        this.context.globalAlpha = this.opacidad;
        this.context.fill();
    }
    /** Traza en el canvas el vector ingresado como argumento.
     * Usa como color el atributo colorVectores.
     */
    trazarVector(vector) {
        let origen = vector.origen;
        let extremo = { x: vector.origen.x + vector.x, y: vector.origen.y + vector.y };
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
    escribir(texto, posicionX, posicionY, tamano, grosor = 500, alineacion = "center", fuente = "calibri") {
        this.context.textAlign = alineacion;
        this.context.font = `${grosor} ${tamano}px ${fuente}`;
        this.context.globalAlpha = this.opacidad;
        this.context.fillStyle = this.colorTexto;
        this.context.fillText(texto, posicionX, posicionY);
    }
    /**Método interno.
    * Crea un recorrido para una forma con id "circunferencia", usando el método .arc de la interfaz context.
    */
    pathCircunferencia(forma) {
        this.context.beginPath();
        this.context.arc(forma.posicion.x, forma.posicion.y, forma.radioTransformado, 0, Geometria.DOS_PI);
    }
    /**Método interno.
    * Crea un recorrido para una forma con id "poligono". Registra líneas entre cada vértice del polígono.
    */
    pathPoligono(forma) {
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
    pathLinea(forma) {
        this.context.beginPath();
        this.context.moveTo(forma.verticesTransformados[0].x, forma.verticesTransformados[0].y);
        for (let vertice of forma.verticesTransformados) {
            this.context.lineTo(vertice.x, vertice.y);
        }
    }
}
