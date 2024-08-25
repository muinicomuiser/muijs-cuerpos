import { Vector } from "./Vector.js";
import { Transformacion } from "./Transformacion.js";
import { Geometria } from "../Utiles/Geometria.js";
import { TipoFormas } from "./TipoFormas.js";
//POR INTEGRAR
// Para una forma personalizada, ya sea abierta o cerrada, agregar un método para calcular su radio o su centro
// Función de escalar, reflejar
// SUMAR FORMAS
//Agregar propiedad de vértices transformados, normales rotadas y apotema, para no estar calculándolo en cada momento,
//ademas de una propiedad que avise cuando haya que aplicar la transformación.
export class Forma {
    _vertices = [];
    _verticesTransformados = [];
    _transformacion = new Transformacion();
    transformar = true;
    radio = 0;
    lados = 0;
    color = "";
    tipo = TipoFormas.poligono;
    constructor() { }
    /**Retorna el valor del radio con la transformación de escala aplicada.*/
    get radioTransformado() {
        let radioTransformado = this.radio * this._transformacion.escala;
        return radioTransformado;
    }
    /**Retorna una copia de la transformación de la forma.*/
    get transformacion() {
        return new Transformacion(this._transformacion.posicion.x, this._transformacion.posicion.y, this._transformacion.rotacion, this._transformacion.escala);
    }
    /**Retorna una copia del vector de la posición después de aplicar las transformaciones*/
    get posicion() {
        let posicion = Vector.clonar(this._transformacion.posicion);
        return posicion;
    }
    /**Retorna el ángulo de rotación actual de la forma.*/
    get rotacion() {
        return this._transformacion.rotacion;
    }
    get escala() {
        return this._transformacion.escala;
    }
    /**Retorna el arreglo de vértices sin transformaciones.*/
    get vertices() {
        return Vector.clonarConjunto(this._vertices);
    }
    /**Retorna el arreglo de vértices después de aplicar las transformaciones de escala, rotación y desplazamiento..*/
    get verticesTransformados() {
        if (this.transformar) {
            this.transformarVertices();
        }
        return Vector.clonarConjunto(this._verticesTransformados);
    }
    /**Retorna un conjunto de vectores normales de cada arista del polígono.
     * El orden de las aristas es en senttipoo horario.
    */
    get normales() {
        let normales = [];
        for (let i = 0; i < this.verticesTransformados.length; i++) {
            if (i != this.verticesTransformados.length - 1) {
                let normal = Vector.normal(this.verticesTransformados[i], this.verticesTransformados[i + 1]);
                normales.push(normal);
            }
            else {
                let normal = Vector.normal(this.verticesTransformados[i], this.verticesTransformados[0]);
                normales.push(normal);
            }
        }
        return normales;
    }
    /**Retorna la distancia entre el centro del polígono y el punto más cercano de sus aristas.*/
    get apotema() {
        if (this.tipo == TipoFormas.circunferencia) {
            return this.radioTransformado;
        }
        return Math.cos(Math.PI / this.lados) * this.radio;
    }
    set transformacion(transformacion) {
        this.transformar = true;
        this._transformacion = transformacion;
    }
    set posicion(nuevaPosicion) {
        this.transformar = true;
        this._transformacion.posicion = Vector.clonar(nuevaPosicion);
    }
    /**Modifica el valor de la rotación de la figura con respecto a su forma sin transformaciones.*/
    set rotacion(rotacion) {
        this.transformar = true;
        this._transformacion.rotacion = rotacion;
    }
    set escala(nuevaEscala) {
        this.transformar = true;
        this._transformacion.escala = nuevaEscala;
    }
    set vertices(vertices) {
        this._vertices = Vector.clonarConjunto(vertices);
    }
    crearVertices() {
        if (this.lados == 0) {
            return [];
        }
        let theta = Geometria.DOS_PI / this.lados;
        let offset = theta * 0.5;
        let nVertices = [];
        for (let i = 0; i < this.lados; i++) {
            let angulo = offset + (i * theta);
            let xx = Math.cos(angulo) * this.radio;
            let yy = Math.sin(angulo) * this.radio;
            let vertice = Vector.crear(xx, yy);
            nVertices.push(vertice);
        }
        return nVertices;
    }
    //Agregar control de errores para índices mayores al número de vértices
    moverVertice(indice, punto) {
        this._vertices[indice] = Vector.crear(punto.x, punto.y);
    }
    //--
    static poligono(x, y, lados, radio) {
        let nuevoPoligono = new Forma();
        nuevoPoligono.lados = lados;
        nuevoPoligono.radio = radio;
        nuevoPoligono.vertices = nuevoPoligono.crearVertices();
        nuevoPoligono.tipo = TipoFormas.poligono;
        nuevoPoligono.iniciarTransformacion(x, y);
        return nuevoPoligono;
    }
    static circunferencia(x, y, radio) {
        let nuevaCircunferencia = new Forma();
        nuevaCircunferencia.radio = radio;
        let lados = 10 + Math.trunc(radio / 10);
        if (lados % 2 == 1) {
            lados++;
        }
        if (lados > 30) {
            lados = 30;
        }
        nuevaCircunferencia.lados = lados;
        nuevaCircunferencia.vertices = nuevaCircunferencia.crearVertices();
        nuevaCircunferencia.tipo = TipoFormas.circunferencia;
        nuevaCircunferencia.iniciarTransformacion(x, y);
        return nuevaCircunferencia;
    }
    static rectangulo(x, y, base, altura) {
        let rectangulo = new Forma();
        rectangulo.lados = 4;
        rectangulo.radio = Geometria.hipotenusa(base * 0.5, altura * 0.5);
        let ver1 = Vector.crear(base / 2, altura / 2);
        let ver2 = Vector.crear(-base / 2, altura / 2);
        let ver3 = Vector.crear(-base / 2, -altura / 2);
        let ver4 = Vector.crear(base / 2, -altura / 2);
        let rectVertices = [ver1, ver2, ver3, ver4];
        rectangulo.vertices = rectVertices;
        rectangulo.tipo = TipoFormas.poligono;
        rectangulo.iniciarTransformacion(x, y);
        return rectangulo;
    }
    /**Crea una recta centrada en el origen y con la posición ingresada almacenada en su registro de transformación.*/
    static recta(puntoUno, puntoDos) {
        let linea = new Forma();
        linea.lados = 1;
        linea.radio = Geometria.distanciaEntrePuntos(puntoUno, puntoDos) / 2;
        let centro = Vector.crear(puntoUno.x / 2 + puntoDos.x / 2, puntoUno.y / 2 + puntoDos.y / 2);
        let vertices = [Vector.crear(puntoUno.x - centro.x, puntoUno.y - centro.y), Vector.crear(puntoDos.x - centro.x, puntoDos.y - centro.y)];
        linea.vertices = vertices;
        linea.tipo = TipoFormas.linea;
        linea.iniciarTransformacion(centro.x, centro.y);
        return linea;
    }
    /**
     * Crea un conjunto de rectas a partir de un grupo de vértices.
     * Calcula el centro de los vértices, centra la forma en el origen y almacena
     * el centro en el registro de transformación.
     */
    static trazo(vertices) {
        let centro = Vector.crear(0, 0);
        let trazo = new Forma();
        let verticesTrazo = [];
        trazo.lados = vertices.length - 1;
        for (let vertice of vertices) {
            centro = Vector.suma(centro, Vector.escalar(vertice, 1 / vertices.length));
        }
        for (let vertice of vertices) {
            verticesTrazo.push(Vector.resta(vertice, centro));
        }
        trazo.vertices = verticesTrazo;
        trazo.tipo = TipoFormas.linea;
        trazo.iniciarTransformacion(centro.x, centro.y);
        return trazo;
    }
    /**
     * Crea un polígono a partir de un grupo de vértices.
     * Calcula el centro de los vértices, centra la forma en el origen y almacena
     * el centro en el registro de transformación.
     */
    static poligonoSegunVertices(vertices) {
        let centro = Vector.crear(0, 0);
        let poligono = new Forma();
        let verticesPoligono = [];
        poligono.lados = vertices.length - 1;
        for (let vertice of vertices) {
            centro = Vector.suma(centro, Vector.escalar(vertice, 1 / vertices.length));
        }
        for (let vertice of vertices) {
            verticesPoligono.push(Vector.resta(vertice, centro));
        }
        poligono.vertices = verticesPoligono;
        poligono.tipo = TipoFormas.poligono;
        poligono.iniciarTransformacion(centro.x, centro.y);
        return poligono;
    }
    iniciarTransformacion(x, y) {
        this._transformacion.posicion = Vector.crear(x, y);
    }
    transformarVertices() {
        this._verticesTransformados = this._transformacion.transformarConjuntoVectores(this._vertices);
        console.log("transformacion");
        this.transformar = false;
    }
    /**Suma el ángulo ingresado al ángulo de rotación de la figura.*/
    rotar(angulo) {
        this._transformacion.rotacion += angulo;
        this.transformar = true;
    }
    /**Suma el vector ingresado al vector de posición de la figura.*/
    desplazar(vector) {
        this._transformacion.posicion = Vector.suma(this._transformacion.posicion, vector);
    }
    rotarSegunOrigen(angulo) {
        this._transformacion.posicion = Vector.rotar(this._transformacion.posicion, angulo);
    }
    rotarSegunPunto(punto, angulo) {
        let vectorAcomodador = Vector.crear(punto.x, punto.y);
        this._transformacion.posicion = Vector.resta(this._transformacion.posicion, vectorAcomodador);
        this.rotarSegunOrigen(angulo);
        this._transformacion.posicion = Vector.suma(this._transformacion.posicion, vectorAcomodador);
    }
    trazar(dibujante) {
        dibujante.trazar(this);
    }
    rellenar(dibujante) {
        dibujante.rellenar(this);
    }
}
