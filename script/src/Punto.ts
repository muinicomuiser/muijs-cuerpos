import { Matriz } from "./Matrices.js";
import { Vector } from "./Vector.js";
export class Punto{
    _x: number;
    _y: number;
    _id?: number;
    constructor(x: number, y: number, id?: number){
        this._x = x;
        this._y = y;
        if(id){
            this._id = id;
        }
    }
    get x(): number{
        return this._x;
    }
    get y(): number{
        return this._y;
    }
    get id(): number{
        return this._id!;
    }
    set x(x: number){
        this._x = x;
    }
    set y(y: number){
        this._y = y;
    }
    set id(id: number){
        this._id = id;
    }
    static crear(x: number, y: number): Punto{
        let punto: Punto = new Punto(x, y);
        return punto;
    }
    static origen(): Punto{
        return new Punto(0, 0);
    }
    static clonar(punto: Punto): Punto{
        let clon: Punto = new Punto(0, 0);
        clon.x += punto.x;
        clon.y += punto.y;
        return clon;
    }
    public rotar(angulo: number){
        return Matriz.rotarPunto2D(this, angulo);
    }
    
}
