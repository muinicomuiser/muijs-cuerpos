/**
        =============================================
                 * MÓDULO DE CUERPOS *
        =============================================
        Trabaja usando objetos de tipo Forma.

        Crea cuerpos geométricos con masa y densidad.

        Contiene métodos para mover según velocidad y aceleración.

 */
import { Forma } from "../GeometriaPlana/Formas.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Geometria } from "../Utiles/Geometria.js";
//TAREAS
//Una propiedad que defina si es necesario actualizar la posición y la rotación.
//Un solo método para aplicar transformar y actualizar transformaciones
//Buscar un modo de anclar un vértice a otro vector. Así se puede acoplar un ala a otro cuerpo. Método anclar(vector)
/**MÓDULO DE CUERPOS
 * Trabaja usando objetos de tipo Forma.
 */
export class Cuerpo extends Forma {
    constructor() {
        super();
        this._velocidad = Vector.cero();
        this._aceleracion = Vector.cero();
        /**Determina si el cuerpo rotará o no según la dirección y sentido de su velocidad.*/
        this.rotarSegunVelocidad = false;
        /**Propiedad útil para determinar si un cuerpo será controlado por el usuario.*/
        this.controlable = false;
        /**Determina si un cuerpo se moverá o no producto de la interacción con otros cuerpos.*/
        this.fijo = false;
        this.masa = 1;
        this.densidad = 1;
        /**Propiedades para activar y desactivar acciones relacionadas con el control del movimiento de cuerpos por parte del usuario.*/
        this.controles = {
            arriba: false,
            abajo: false,
            izquierda: false,
            derecha: false,
            rotarIzquierda: false,
            rotarDerecha: false,
            rapidez: 1,
            anguloRotacion: Geometria.PI_MEDIO / 30
        };
    }
    /**Retorna una copia del vector velocidad.*/
    get velocidad() {
        return this._velocidad.clonar();
    }
    /**Retorna una copia del vector aceleración.*/
    get aceleracion() {
        return this._aceleracion.clonar();
    }
    get verticesTransformados() {
        if (this.rotarSegunVelocidad) {
            this.transformacionAnterior.rotacion = this._transformacion.rotacion;
            this.rotacion = this._velocidad.angulo - this._vertices[0].angulo;
            return super.verticesTransformados;
        }
        return super.verticesTransformados;
    }
    /**Modifica el vector velocidad.*/
    set velocidad(velocidad) {
        this._velocidad = velocidad.clonar();
    }
    /**Modifica el vector aceleración.*/
    set aceleracion(aceleracion) {
        this._aceleracion = aceleracion.clonar();
    }
    /**Retorna un cuerpo geométrico regular.
     * El radio corresponde a la distancia entre el centro y cualquiera de sus vértices.*/
    static poligono(x, y, lados, radio, opciones) {
        let poliForma = super.poligono(x, y, lados, radio);
        let poligono = Cuerpo.cuerpoSegunForma(poliForma);
        if (opciones) {
            Object.assign(poligono, opciones);
            // poligono.aplicarOpciones(opciones)
        }
        return poligono;
    }
    /**Retorna un cuerpo geométrico regular.
     * El radio corresponde a la distancia entre el centro y cualquiera de sus vértices.*/
    static poligonoSegunVertices(vertices, opciones) {
        let poliForma = super.poligonoSegunVertices(vertices);
        let poligono = Cuerpo.cuerpoSegunForma(poliForma);
        if (opciones) {
            Object.assign(poligono, opciones);
            // poligono.aplicarOpciones(opciones)
        }
        return poligono;
    }
    /**Retorna un cuerpo rectangular.*/
    static rectangulo(x, y, base, altura, opciones) {
        let rectForma = super.rectangulo(x, y, base, altura);
        let rectangulo = Cuerpo.cuerpoSegunForma(rectForma);
        if (opciones) {
            Object.assign(rectangulo, opciones);
            // rectangulo.aplicarOpciones(opciones)
        }
        return rectangulo;
    }
    /**Retorna un cuerpo con forma de circunferencia.*/
    static circunferencia(x, y, radio, opciones) {
        let circuloForma = super.circunferencia(x, y, radio);
        let circunferencia = Cuerpo.cuerpoSegunForma(circuloForma);
        if (opciones) {
            Object.assign(circuloForma, opciones);
        }
        return circunferencia;
    }
    /**Método auxiliar. Crea un cuerpo base a partir de una forma.*/
    static cuerpoSegunForma(forma) {
        let cuerpo = new Cuerpo();
        cuerpo.vertices = forma.vertices;
        cuerpo.transformacion = forma.transformacion;
        cuerpo.lados = forma.lados;
        cuerpo.radio = forma.radio;
        cuerpo.tipo = forma.tipo;
        return cuerpo;
    }
    /**Retorna una copia del cuerpo como un cuerpo nuevo.*/
    clonar() {
        const formaClonada = super.clonar();
        const cuerpoClonado = Cuerpo.cuerpoSegunForma(formaClonada);
        cuerpoClonado.masa = this.masa;
        cuerpoClonado.densidad = this.densidad;
        cuerpoClonado.fijo = this.fijo;
        cuerpoClonado.rotarSegunVelocidad = this.rotarSegunVelocidad;
        cuerpoClonado.controlable = this.controlable;
        return cuerpoClonado;
    }
    /**Suma la aceleración a la velocidad y la velocidad a la posición.*/
    mover() {
        if (!this.fijo) {
            this._velocidad = this._velocidad.sumar(this._aceleracion);
            this.posicion = this.posicion.sumar(this._velocidad);
        }
    }
    /**Traza el vector velocidad del cuerpo a partir de su centro.*/
    trazarVelocidad(dibujante) {
        let vectorVelocidad = this._velocidad.clonar();
        vectorVelocidad = vectorVelocidad.normalizar().escalar(this.radio);
        vectorVelocidad.origen = this._transformacion.posicion;
        dibujante.trazarVector(vectorVelocidad);
    }
    /**Aplica las transformaciones definidas para cada evento (de teclado, mouse u otro) sobre el cuerpo.*/
    usarControles() {
        if (this.controles.arriba) {
            this.posicion = this.posicion.sumar(this.normales[0].normalizar().escalar(this.controles.rapidez));
        }
        if (this.controles.abajo) {
            this.posicion = this.posicion.sumar(this.normales[0].normalizar().escalar(-this.controles.rapidez));
        }
        if (this.controles.izquierda) {
            this.posicion = this.posicion.sumar(Vector.izquierda(this.controles.rapidez));
        }
        if (this.controles.derecha) {
            this.posicion = this.posicion.sumar(Vector.derecha(this.controles.rapidez));
        }
        if (this.controles.rotarIzquierda) {
            this.rotacion -= this.controles.anguloRotacion;
        }
        if (this.controles.rotarDerecha) {
            this.rotacion += this.controles.anguloRotacion;
        }
    }
}
