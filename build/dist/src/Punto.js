// export type Punto = {
//     id?: number,
//     x: number,
//     y: number,
// }
export class Punto {
    constructor(x, y, id) {
        this._x = x;
        this._y = y;
        if (id) {
            this._id = id;
        }
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get id() {
        return this._id;
    }
    set x(x) {
        this._x = x;
    }
    set y(y) {
        this._y = y;
    }
    set id(id) {
        this._id = id;
    }
    static crear(x, y) {
        let punto = new Punto(x, y);
        return punto;
    }
    static origen() {
        return new Punto(0, 0);
    }
    static clonar(punto) {
        let clon = new Punto(0, 0);
        clon.x += punto.x;
        clon.y += punto.y;
        return clon;
    }
}
