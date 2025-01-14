import { Geometria } from "../Utiles/Geometria.js";
import { TipoFormas } from "../GeometriaPlana/TipoFormas.js";
/**MÓDULO DE DIBUJO
 * Instancia una herramienta dibujante.
 * Métodos para definir colores hsla y rgba, dibujar objetos tipo Forma y escribir.
 */
export class Dibujante {
    constructor(context) {
        // opcionesCelda:
        /**Opciones del método en que se graficará.
         * 'colorTrazo', 'colorRelleno', 'trazada', 'rellenada', 'grosorTrazo' y 'opacidad'.
        */
        this.estiloForma = {
            colorTrazo: 'blue',
            colorRelleno: "skyblue",
            trazada: true,
            rellenada: true,
            grosorTrazo: 1,
            opacidad: 1,
        };
        /**Opciones de 'color', 'tamano', 'fuente', 'opacidad' y 'alineacion'.*/
        this.estiloTexto = {
            color: "red",
            tamano: 10,
            fuente: "calibri",
            opacidad: 1,
            alineacion: "right"
        };
        /**Opciones del método en que se graficará.
        * 'color' y 'grosorTrazo'.
        */
        this.estiloVector = {
            color: "red",
            grosorTrazo: 1,
        };
        this.context = context;
        this.colorCelda = "blue";
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
    recorrerPath(forma) {
        if (forma.tipo == TipoFormas.circunferencia) {
            this.pathCircunferencia(forma);
        }
        else if (forma.tipo == TipoFormas.poligono) {
            this.pathPoligono(forma);
        }
        else if (forma.tipo == TipoFormas.linea || forma.tipo == TipoFormas.vector) {
            this.pathLinea(forma);
        }
    }
    /**Traza en el canvas la forma ingresada como argumento.*/
    trazar(forma) {
        this.recorrerPath(forma);
        if (forma.tipo == TipoFormas.vector) {
            this.context.strokeStyle = this.estiloVector.color;
        }
        else {
            if (forma.colorTrazo) {
                this.context.strokeStyle = forma.colorTrazo;
            }
            else {
                this.context.strokeStyle = this.estiloForma.colorTrazo;
            }
            if (forma.opacidad) {
                this.context.globalAlpha = forma.opacidad;
            }
            else {
                this.context.globalAlpha = this.estiloForma.opacidad;
            }
            if (forma.grosorTrazo) {
                this.context.lineWidth = forma.grosorTrazo;
            }
            else {
                this.context.lineWidth = this.estiloForma.grosorTrazo;
            }
        }
        this.context.stroke();
    }
    /**Rellena en el canvas la forma ingresada como argumento.*/
    rellenar(forma) {
        this.recorrerPath(forma);
        if (forma.opacidad) {
            this.context.globalAlpha = forma.opacidad;
        }
        else {
            this.context.globalAlpha = this.estiloForma.opacidad;
        }
        if (forma.colorRelleno) {
            this.context.fillStyle = forma.colorRelleno;
        }
        else {
            this.context.fillStyle = this.estiloForma.colorRelleno;
        }
        this.context.fill();
    }
    /**Rellena y/o traza una forma, según su estilo gráfico.*/
    renderizar(forma) {
        if (forma.rellenada) {
            this.rellenar(forma);
        }
        if (forma.trazada) {
            this.trazar(forma);
        }
    }
    /**Rellena en el canvas la celda ingresada como argumento.*/
    rellenarCelda(celda) {
        this.context.beginPath();
        this.context.clearRect((celda.columna - 1) * celda.tamano, (celda.fila - 1) * celda.tamano, celda.tamano, celda.tamano);
        this.context.globalAlpha = this.estiloForma.opacidad;
        this.context.fillStyle = this.colorCelda;
        if (celda.color) {
            this.context.fillStyle = celda.color;
        }
        this.context.fillRect((celda.columna - 1) * celda.tamano, (celda.fila - 1) * celda.tamano, celda.tamano, celda.tamano);
        this.context.globalAlpha = 1;
    }
    /** Traza en el canvas el vector ingresado como argumento.
     * Usa como color el atributo .estiloVector.color.
     */
    trazarVector(vector) {
        let origen = vector.origen;
        let extremo = { x: vector.origen.x + vector.x, y: vector.origen.y + vector.y };
        this.context.beginPath();
        this.context.moveTo(origen.x, origen.y);
        this.context.lineTo(extremo.x, extremo.y);
        this.context.lineWidth = this.estiloVector.grosorTrazo;
        this.context.globalAlpha = this.estiloForma.opacidad;
        this.context.strokeStyle = this.estiloVector.color;
        this.context.stroke();
    }
    /**Rellena un texto en el canvas en la posicion ingresada.
     * Usa como opciones gráficas el atributo .estiloTexto
    */
    escribir(texto, posicionX, posicionY) {
        this.context.textAlign = this.estiloTexto.alineacion;
        this.context.font = `${this.estiloTexto.tamano}px ${this.estiloTexto.fuente}`;
        // this.context.font = `${this.opcionesTexto.grosor} ${this.opcionesTexto.tamano}px ${this.opcionesTexto.fuente}`;
        this.context.globalAlpha = this.estiloTexto.opacidad;
        this.context.fillStyle = this.estiloTexto.color;
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
