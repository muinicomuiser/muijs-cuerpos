import { Dibujante } from "./Dibujante.js";
/**MÓDULO DE RENDERIZADO
 * Extiende las funciones de Dibujante.
 * Permite trabajar con conjuntos de formas y sobre el canvas.
 * Se instancia usando el canvas.
 */
export class Renderizado extends Dibujante {
    constructor(canvas) {
        super(canvas.getContext("2d"));
        this._anchoCanvas = 500;
        this._altoCanvas = 500;
        this._colorFondo = 'black';
        this.canvas = canvas;
        this.canvas.style.backgroundColor = this._colorFondo;
        this.canvas.width = this._anchoCanvas;
        this.canvas.height = this._altoCanvas;
    }
    /**Retorna la medida horizontal del canvas.*/
    get anchoCanvas() {
        return this._anchoCanvas;
    }
    /**Retorna la media vertical del canvas. */
    get altoCanvas() {
        return this._altoCanvas;
    }
    /**Retorna un punto ubicado en el centro del canvas.*/
    get centroCanvas() {
        return { x: this.anchoCanvas / 2, y: this.altoCanvas / 2 };
    }
    /**Retorna el color del canvas.*/
    get colorCanvas() {
        return this._colorFondo;
    }
    /**Modifica la medida horizontal del canvas.*/
    set anchoCanvas(ancho) {
        this._anchoCanvas = ancho;
        this.canvas.width = this._anchoCanvas;
    }
    /**Modifica la medida vertical del canvas. */
    set altoCanvas(alto) {
        this._altoCanvas = alto;
        this.canvas.height = this._altoCanvas;
    }
    /**Modifica el color del canvas.*/
    set colorCanvas(color) {
        this._colorFondo = color;
        this.canvas.style.backgroundColor = this._colorFondo;
    }
    /**Retorna una instancia de renderizado usando como parámetro el id de un canvas presente en el documento HTML. */
    static crearConIdCanvas(idCanvas) {
        const CANVAS = document.getElementById(idCanvas);
        let nuevoRenderizador = new Renderizado(CANVAS);
        return nuevoRenderizador;
    }
    /**Retorna una instancia de renderizado usando como parámetro el canvas presente en el documento HTML. */
    static crearConCanvas(canvas) {
        const nuevoRender = new Renderizado(canvas);
        return nuevoRender;
    }
    /**Traza un conjunto de formas.*/
    trazarFormas(formas) {
        for (let forma of formas) {
            forma.trazar(this);
        }
    }
    /**Rellena un conjunto de formas.*/
    rellenarFormas(formas) {
        for (let forma of formas) {
            forma.rellenar(this);
        }
    }
    /**Rellena y/o traza, según el caso, un conjunto de formas.*/
    renderizarFormas(formas) {
        for (let forma of formas) {
            if (forma.rellenada) {
                this.rellenar(forma);
                // forma.rellenar(this);
            }
            if (forma.trazada) {
                this.trazar(forma);
                // forma.trazar(this);
            }
        }
    }
    /**Borra el contenido del canvas.
     * Si se especifica opacidad, pinta el canvas completo usando como color el atributo colorCanvas y con la opacidad especificada.
     */
    limpiarCanvas(opacidad) {
        if (opacidad != undefined) {
            this.context.globalAlpha = opacidad;
            this.context.fillStyle = this._colorFondo;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.globalAlpha = this.estiloForma.opacidad;
        }
        else {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    /**Traza las normales de una forma geométrica.*/
    trazarNormales(forma) {
        forma.normales.forEach((normal) => {
            let normalTrazable = normal.clonar();
            normalTrazable.origen = forma.posicion.sumar(normal.normalizar().escalar(forma.apotema));
            this.trazarVector(normalTrazable);
        });
    }
}
