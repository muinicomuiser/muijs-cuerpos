import { Matematica } from "../Utiles/Matematica.js";
import { TipoFormas } from "../GeometriaPlana/TipoFormas.js";
//POR INCORPORAR:
//  Throw de errores para valores incompatibles
//  Opacidad, letras
export class Dibujante {
    _color;
    _colorFondo;
    _grosorTrazo;
    _opacidad;
    _colorVectores;
    _context;
    constructor(context) {
        this._context = context;
        this._color = "black";
        this._colorFondo = "white";
        this._grosorTrazo = 1;
        this._opacidad = 1;
        this._colorVectores = "red";
    }
    get color() {
        return this._color;
    }
    get colorFondo() {
        return this._colorFondo;
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
    set colorFondo(color) {
        this._colorFondo = color;
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
    /**Borra el contenido del canvas.
     * Si se especifica opacidad, pinta el canvas completo usando como color el atributo colorFondo y con la opacidad especificada.
     */
    limpiarCanvas(canvas, opacidad) {
        if (opacidad) {
            this._context.globalAlpha = opacidad;
            this._context.fillStyle = this._colorFondo;
            this._context.fillRect(0, 0, canvas.width, canvas.height);
            this._context.globalAlpha = this._opacidad;
            this._context.fillStyle = this._color;
        }
        else {
            this._context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    /**Traza en el canvas la forma ingresada como argumento.*/
    trazar(forma) {
        if (forma.tipo == TipoFormas.circunferencia) {
            this.pathCircunferencia(forma);
            this._context.strokeStyle = forma.color;
        }
        if (forma.tipo == TipoFormas.poligono) {
            this.pathPoligono(forma);
            this._context.strokeStyle = forma.color;
        }
        if (forma.tipo == TipoFormas.linea) {
            this.pathLinea(forma);
            this._context.strokeStyle = forma.color;
        }
        // this._context.strokeStyle = this._color;
        if (forma.tipo == TipoFormas.vector) {
            this.pathLinea(forma);
            this._context.strokeStyle = this._colorVectores;
        }
        this._context.lineWidth = this._grosorTrazo;
        this._context.globalAlpha = this._opacidad;
        this._context.stroke();
        this._context.strokeStyle = this._color;
    }
    /**Rellena en el canvas la forma ingresada como argumento.*/
    rellenar(forma) {
        if (forma.tipo == TipoFormas.circunferencia) {
            this.pathCircunferencia(forma);
            this._context.fillStyle = forma.color;
        }
        if (forma.tipo == TipoFormas.poligono) {
            this.pathPoligono(forma);
            this._context.fillStyle = forma.color;
        }
        if (forma.tipo == TipoFormas.linea) {
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
    trazarVector(vector) {
        let origen = vector.origen;
        let extremo = { x: vector.origen.x + vector.x, y: vector.origen.y + vector.y };
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
    escribir(texto, posicionX, posocionY, tamano, grosor = 500, fuente = "calibri", alineacion = "center") {
        this._context.textAlign = alineacion;
        this._context.font = `${grosor} ${tamano}px ${fuente}`;
        this._context.globalAlpha = this._opacidad;
        this._context.fillStyle = this._color;
        this._context.fillText(texto, posicionX, posocionY);
    }
    /**Método interno.
    * Crea un recorrido para una forma con id "circunferencia", usando el método .arc de la interfaz context.
    */
    pathCircunferencia(forma) {
        this._context.beginPath();
        this._context.arc(forma.posicion.x, forma.posicion.y, forma.radioTransformado, 0, Matematica.DOS_PI);
    }
    /**Método interno.
    * Crea un recorrido para una forma con id "poligono". Registra líneas entre cada vértice del polígono.
    */
    pathPoligono(forma) {
        this._context.beginPath();
        this._context.moveTo(forma.verticesTransformados[0].x, forma.verticesTransformados[0].y);
        for (let vertice of forma.verticesTransformados) {
            this._context.lineTo(vertice.x, vertice.y);
        }
        this._context.closePath();
    }
    /**Método interno.
    * Crea un recorrido para una forma con id "linea". Registra una línea entre los dos vértices.
    */
    pathLinea(forma) {
        this._context.beginPath();
        this._context.moveTo(forma.verticesTransformados[0].x, forma.verticesTransformados[0].y);
        for (let vertice of forma.verticesTransformados) {
            this._context.lineTo(vertice.x, vertice.y);
        }
    }
}
