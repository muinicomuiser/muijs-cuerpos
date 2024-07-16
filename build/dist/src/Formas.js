import { Matematica } from "./Matematica.js";
import { Matriz } from "./Matrices.js";
export class Forma {
    constructor(posicionX, posicionY, lados, radio) {
        this._posicion = { x: posicionX, y: posicionY };
        this._lados = lados;
        this._radio = radio;
        this.crearVertices();
    }
    get id() {
        return this._id;
    }
    get posicion() {
        let punto = { x: this._posicion.x, y: this._posicion.y };
        return punto;
    }
    // get posicion(): Punto{
    //     return this._posicion!;
    // }
    get lados() {
        return this._lados;
    }
    get radio() {
        return this._radio;
    }
    get vertices() {
        let copiaVertices = [];
        for (let vertice of this._vertices) {
            let punto = { x: vertice.x, y: vertice.y };
            copiaVertices.push(punto);
        }
        return copiaVertices;
    }
    // get vertices(): Punto[]{
    //     return this._vertices!;
    // }
    set id(nuevaId) {
        this._id = nuevaId;
    }
    set posicion(nuevaPosicion) {
        this._posicion = nuevaPosicion;
    }
    set lados(numeroLados) {
        this._lados = numeroLados;
    }
    set radio(nuevoRadio) {
        this._radio = nuevoRadio;
    }
    set vertices(vertices) {
        this._vertices = vertices;
    }
    crearVertices() {
        let theta = Matematica.DOS_PI / this._lados;
        let offset = theta * 0.5;
        let nVertices = [];
        for (let i = 0; i < this._lados; i += 1) {
            let angulo = offset + (i * theta);
            let xx = Math.cos(angulo) * this._radio + this._posicion.x;
            let yy = Math.sin(angulo) * this._radio + this._posicion.y;
            let vertice = { x: xx, y: yy };
            nVertices.push(vertice);
        }
        this._vertices = nVertices;
    }
    moverVertice(i, punto) {
        this._vertices[i - 1].x = punto.x;
        this._vertices[i - 1].y = punto.y;
    }
    static poligono(x, y, lados, radio) {
        let nuevoPoligono = new Forma(x, y, lados, radio);
        nuevoPoligono.id = "poligono";
        return nuevoPoligono;
    }
    static circunferencia(x, y, radio) {
        let lados = 10 + Matematica.truncar(radio / 10, 0);
        if (lados % 2 == 1) {
            lados++;
        }
        if (lados > 30) {
            lados = 30;
        }
        let nuevaCircunferencia = new Forma(x, y, lados, radio);
        nuevaCircunferencia.id = "circunferencia";
        return nuevaCircunferencia;
    }
    static rectangulo(x, y, base, altura) {
        let rectangulo = new Forma(x, y, 4, Matematica.hipotenusa(base * 0.5, altura * 0.5));
        rectangulo.id = "poligono";
        let ver1 = { x: base / 2 + x, y: altura / 2 + y };
        let ver2 = { x: -base / 2 + x, y: altura / 2 + y };
        let ver3 = { x: -base / 2 + x, y: -altura / 2 + y };
        let ver4 = { x: base / 2 + x, y: -altura / 2 + y };
        let rectVertices = [ver1, ver2, ver3, ver4];
        rectangulo.vertices = rectVertices;
        return rectangulo;
    }
    static linea(puntoUno, puntoDos) {
        let centro = { x: puntoUno.x / 2 + puntoDos.x / 2, y: puntoUno.y / 2 + puntoDos.y / 2 };
        let vertices = [puntoUno, puntoDos];
        let linea = new Forma(centro.x, centro.y, 2, 1);
        linea.vertices = vertices;
        linea.id = "linea";
        return linea;
    }
    //Mueve la forma ubicando el centro en el punto ingresado
    ubicar(punto) {
        let dx = this._posicion.x - punto.x;
        let dy = this._posicion.y - punto.y;
        for (let vertice of this._vertices) {
            vertice.x -= dx;
            vertice.y -= dy;
        }
        this._posicion.x = punto.x;
        this._posicion.y = punto.y;
    }
    rotarSegunOrigen(angulo) {
        for (let vertice of this._vertices) {
            vertice = Matriz.rotarPunto2D(vertice, -angulo);
        }
        this._posicion = Matriz.rotarPunto2D(this._posicion, -angulo);
    }
    rotarSegunCentro(angulo) {
        let centroX = this._posicion.x;
        let centroY = this._posicion.y;
        let centro = { x: centroX, y: centroY };
        let origen = { x: 0, y: 0 };
        this.ubicar(origen);
        this.rotarSegunOrigen(angulo);
        this.ubicar(centro);
    }
    rotarSegunPunto(punto, angulo) {
        let dx = this._posicion.x - punto.x;
        let dy = this._posicion.y - punto.y;
        let centroRotacion = { x: dx, y: dy };
        this.ubicar(centroRotacion);
        this.rotarSegunOrigen(angulo);
        centroRotacion = { x: this._posicion.x + punto.x, y: this._posicion.y + punto.y };
        this.ubicar(centroRotacion);
    }
}
