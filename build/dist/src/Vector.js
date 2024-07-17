import { Matematica } from "./Matematica.js";
//POR REVISAR
//Revisar métodos de recálculo de componentes, ángulo y magnitud
export class Vector {
    constructor(x, y, magnitud, angulo) {
        if (x && y) {
            this._x = x;
            this._y = y;
            this.calcularMagnitud();
            this.calcularAngulo();
        }
        else if (angulo && magnitud) {
            this._magnitud = magnitud;
            this._angulo = angulo;
            this.calcularComponentes();
        }
        this._origen = { x: 0, y: 0 };
        this._extremo = { x: this._x + this._origen.x, y: this._y + this._origen.y };
    }
    get origen() {
        let origen = { x: this._origen.x, y: this._origen.y };
        return origen;
    }
    get extremo() {
        let extremo = { x: this._extremo.x, y: this._extremo.y };
        return extremo;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get magnitud() {
        return this._magnitud;
    }
    get angulo() {
        return this._angulo;
    }
    set origen(origen) {
        this._origen.x = origen.x;
        this._origen.y = origen.y;
        this._extremo.x += origen.x;
        this._extremo.y += origen.y;
    }
    calcularMagnitud() {
        if (this._x == 0 && this._y == 0) {
            this._magnitud = 0;
        }
        else {
            this._magnitud = Matematica.raiz(Matematica.sumaSegura(Matematica.potencia(this._x, 2), Matematica.potencia(this._y, 2)), 2);
        }
    }
    calcularAngulo() {
        if (this._x == 0 && this._y >= 0) {
            this._angulo = Matematica.PI * 0.5;
        }
        else if (this._x == 0 && this._y < 0) {
            this._angulo = Matematica.PI * 1.5;
        }
        else {
            this._angulo = Math.atan(this._y / this._x);
        }
    }
    calcularComponentes() {
        this._x = Matematica.multiplicacionSegura(this._magnitud, Math.cos(this._angulo));
        this._y = Matematica.multiplicacionSegura(this._magnitud, Math.sin(this._angulo));
    }
    static segunComponentes(x, y) {
        return new Vector(x, y);
    }
    static segunAngulo(magnitud, angulo) {
        return new Vector(undefined, undefined, magnitud, angulo);
    }
    static segunPuntos(origen, extremo) {
        let vector = new Vector(extremo.x - origen.x, extremo.y - origen.y);
        return vector;
    }
    static clonar(vector) {
        return new Vector(vector.x, vector.y);
    }
    static suma(vectorUno, vectorDos) {
        let vectorSuma = new Vector(Matematica.sumaSegura(vectorUno.x, vectorDos.x), Matematica.sumaSegura(vectorUno.y, vectorDos.y));
        return vectorSuma;
    }
    static resta(vectorUno, vectorDos) {
        let vectorResta = new Vector(Matematica.sumaSegura(vectorUno.x, -vectorDos.x), Matematica.sumaSegura(vectorUno.y, -vectorDos.y));
        return vectorResta;
    }
    static escalar(vector, escalar) {
        let vectorEscalado = new Vector(Matematica.multiplicacionSegura(vector.x, escalar), Matematica.multiplicacionSegura(vector.y, escalar));
        return vectorEscalado;
    }
    static normalizar(vector) {
        let normalizado = Vector.segunComponentes(Matematica.divisionSegura(vector.x, vector.magnitud), Matematica.divisionSegura(vector.y, vector.magnitud));
        return normalizado;
    }
    static productoPunto(vectorUno, vectorDos) {
        let productoX = Matematica.multiplicacionSegura(vectorUno.x, vectorDos.x);
        let productoY = Matematica.multiplicacionSegura(vectorUno.y, vectorDos.y);
        let producto = Matematica.sumaSegura(productoX, productoY);
        return producto;
    }
    static anguloConVector(vectorUno, vectorDos) {
        let punto = Vector.productoPunto(vectorUno, vectorDos);
        let magnitudes = Matematica.multiplicacionSegura(vectorUno.magnitud, vectorDos.magnitud);
        return Math.acos(punto / magnitudes);
    }
}
