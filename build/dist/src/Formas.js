import { Matematica } from "./Matematica.js";
import { Matriz } from "./Matrices.js";
import { Vector } from "./Vector.js";
//POR INTEGRAR
//  Para una forma personalizada, ya sea abierta o cerrada, agragar un método para calcular su radio o su centro
export class Forma {
    constructor(x, y, lados, radio, vertices) {
        this._centro = Vector.segunComponentes(x, y);
        this._lados = lados;
        this._radio = radio;
        if (vertices) {
            this._vertices = vertices;
        }
        else {
            this.crearVertices();
        }
    }
    get id() {
        return this._id;
    }
    get centro() {
        let centro = Vector.segunComponentes(this._centro.x, this._centro.y);
        return centro;
    }
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
    set id(nuevaId) {
        this._id = nuevaId;
    }
    set centro(nuevoCentro) {
        this._centro = Vector.clonar(nuevoCentro);
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
            let xx = Math.cos(angulo) * this._radio + this._centro.x;
            let yy = Math.sin(angulo) * this._radio + this._centro.y;
            let vertice = Vector.segunComponentes(xx, yy);
            nVertices.push(vertice);
        }
        this._vertices = nVertices;
    }
    //Agregar control de errores para índices mayores al número de vértices
    moverVertice(indice, punto) {
        this._vertices[indice] = Vector.segunComponentes(punto.x, punto.y);
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
        let ver1 = Vector.segunComponentes(Matematica.sumaSegura(base / 2, x), Matematica.sumaSegura(altura / 2, y));
        let ver2 = Vector.segunComponentes(Matematica.sumaSegura(-base / 2, x), Matematica.sumaSegura(altura / 2, y));
        let ver3 = Vector.segunComponentes(Matematica.sumaSegura(-base / 2, x), Matematica.sumaSegura(-altura / 2, y));
        let ver4 = Vector.segunComponentes(Matematica.sumaSegura(base / 2, x), Matematica.sumaSegura(-altura / 2, y));
        let rectVertices = [ver1, ver2, ver3, ver4];
        rectangulo.vertices = rectVertices;
        return rectangulo;
    }
    static recta(puntoUno, puntoDos) {
        let centro = Vector.segunComponentes(puntoUno.x / 2 + puntoDos.x / 2, puntoUno.y / 2 + puntoDos.y / 2);
        let vertices = [Vector.segunComponentes(puntoUno.x, puntoUno.y), Vector.segunComponentes(puntoDos.x, puntoDos.y)];
        let linea = new Forma(centro.x, centro.y, 2, 1);
        linea.vertices = vertices;
        linea.id = "linea";
        return linea;
    }
    static trazo(vertices) {
        let centro = { x: 0, y: 0 };
        for (let punto of vertices) {
            centro.x += punto.x / vertices.length;
            centro.y += punto.y / vertices.length;
        }
        let trazo = new Forma(centro.x, centro.y, vertices.length - 1, undefined, vertices);
        trazo.id = "linea";
        return trazo;
    }
    //Mueve la forma ubicando el centro en el punto ingresado
    ubicar(punto) {
        let dx = this._centro.x - punto.x;
        let dy = this._centro.y - punto.y;
        let vectorReubicacion = Vector.segunComponentes(dx, dy);
        for (let vertice of this._vertices) {
            let verticeInicial = Vector.clonar(vertice);
            vertice = Vector.suma(verticeInicial, vectorReubicacion);
            // vertice.x -= dx;
            // vertice.y -= dy;
        }
        this._centro = Vector.segunComponentes(punto.x, punto.y);
    }
    rotarSegunOrigen(angulo) {
        for (let vertice of this._vertices) {
            let rotado = Matriz.rotarPunto2D(vertice, angulo);
            vertice = Vector.segunComponentes(rotado.x, rotado.y);
            // vertice = Matriz.rotarPunto2D(vertice, angulo);
            // vertice.x = rotado.x;
            // vertice.y = rotado.y;
        }
        // let nuevoCentro: Punto = Matriz.rotarPunto2D(this._centro, angulo);
        let nuevoCentro = Matriz.rotarPunto2D({ x: this.centro.x, y: this.centro.y }, angulo);
        this._centro = Vector.segunComponentes(nuevoCentro.x, nuevoCentro.y);
    }
    rotarSegunCentro(angulo) {
        let centro = { x: this._centro.x, y: this._centro.y };
        let origen = { x: 0, y: 0 };
        this.ubicar(origen);
        this.rotarSegunOrigen(angulo);
        this.ubicar(centro);
    }
    rotarSegunPunto(punto, angulo) {
        let dx = this._centro.x - punto.x;
        let dy = this._centro.y - punto.y;
        let centroRotacion = { x: dx, y: dy };
        this.ubicar(centroRotacion);
        this.rotarSegunOrigen(angulo);
        centroRotacion = { x: this._centro.x + punto.x, y: this._centro.y + punto.y };
        this.ubicar(centroRotacion);
    }
    trasladar(vector) {
        let nuevoCentro = { x: vector.x, y: vector.y };
        this.ubicar(nuevoCentro);
    }
    mover(vector) {
        let vectorSuma = Vector.suma(this._centro, vector);
        this.ubicar(vectorSuma);
    }
}
