/**
        =============================================
                 * MÓDULO DE CUERPOS *
        =============================================
        Trabaja usando objetos de tipo Forma.

        Crea cuerpos geométricos con masa y densidad.

        Contiene métodos para mover según velocidad y aceleración.

 */

import { Forma } from "../GeometriaPlana/Formas.js";
import { Matematica } from "../Utiles/Matematica.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Punto } from "../GeometriaPlana/Punto.js";
import { Dibujante } from "../Renderizado/Dibujante.js";
import { Transformacion } from "../GeometriaPlana/Transformacion.js";

//TAREAS
    //Una propiedad que defina si es necesario actualizar la posición y la rotación.
    //Un solo método para aplicar transformar y actualizar transformaciones
    //Buscar un modo de anclar un vértice a otro vector. Así se puede acoplar un ala a otro cuerpo. Método anclar(vector)


/**MÓDULO DE CUERPOS    
 * Trabaja usando objetos de tipo Forma.
 */
export class Cuerpo extends Forma{
    _masa: number;
    _densidad: number;
    _velocidad: Vector;
    _aceleracion: Vector;
    _fijo: boolean;
    _rotarSegunVelocidad: boolean;
    protected constructor(x: number, y: number, lados: number = 0, radio: number = 0, masa: number = 1, densidad: number = 1, fijo: boolean = false){
        super(x, y, lados, radio);
        this._masa = masa;
        this._densidad = densidad;
        this._velocidad = Vector.cero();
        this._velocidad.origen = this._transformacion.posicion;
        this._aceleracion = Vector.cero();
        this._fijo = fijo;
        this._rotarSegunVelocidad = false;
    }
    get fijo(): boolean{
        return this._fijo;
    }
    get masa(): number{
        return this._masa;
    }
    get densidad(): number{
        return this._densidad;
    }
    get velocidad(): Vector{
        return Vector.clonar(this._velocidad)
    }
    get aceleracion(): Vector{
        return Vector.clonar(this._aceleracion);
    }
    set velocidad(velocidad: Vector){
        this._velocidad = Vector.clonar(velocidad);
    }
    set aceleracion(aceleracion: Vector){
        this._aceleracion = Vector.clonar(aceleracion);
    }
    set fijo(fijo: boolean){
        this._fijo = fijo;
    }
    set escala(escala: number){
        this.transformacion.escala = escala;
        super.escalar(escala);
    }
    set rotarSegunVelocidad(opcion: boolean){
        this._rotarSegunVelocidad = opcion;
    }

    
    public trazarVelocidad(dibujante: Dibujante): void{
        let vectorVelocidad: Vector = Vector.clonar(this._velocidad);  
        vectorVelocidad = Vector.escalar(Vector.normalizar(vectorVelocidad), this.radio);
        vectorVelocidad.origen = this._transformacion.posicion;
        dibujante.trazarVector(vectorVelocidad);
    }


    /**Retorna un cuerpo geométrico regular.     
     * El radio corresponde a la distancia entre el centro y cualquiera de sus vértices.*/
    static poligono(x: number, y: number, lados: number, radio: number, masa: number = 1, densidad: number = 1){
        let poli: Forma = super.poligono(x, y, lados, radio);
        let poligono: Cuerpo = new Cuerpo(x, y, lados, radio, masa, densidad);
        poligono.id = poli.id;
        return poligono; 
    }


    /**Retorna un cuerpo rectangular.*/
    static rectangulo(x: number, y: number, base: number, altura: number, masa: number = 1, densidad: number= 1){
        let rect: Forma = super.rectangulo(x, y, base, altura);
        let rectangulo: Cuerpo = new Cuerpo(x, y, 4, rect.radio, masa);
        rectangulo.vertices = rect.vertices;
        rectangulo.id = "poligono";
        return rectangulo;
    }


    /**Retorna un cuerpo con forma de circunferencia.*/
    static circunferencia(x: number, y: number, radio: number, masa: number = 1, densidad: number= 1, fijo: boolean = false): Cuerpo {
        let circulo: Forma = super.circunferencia(x, y, radio);
        let circunferencia: Cuerpo = new Cuerpo(x, y, circulo.lados, circulo.radio, masa, densidad, fijo);
        circunferencia.id = circulo.id;
        circunferencia.lados = circulo.lados;
        return circunferencia;
    }


    /**Suma la velocidad y la aceleración a la posición y aplica las transformaciones de escala, rotación y posición.*/
    public mover(): void{
        this._velocidad = Vector.suma(this._velocidad, this._aceleracion);
        this._transformacion.posicion = Vector.suma(this._transformacion.posicion, this._velocidad);
        this.actualizarTransformacion();
    }
    

    /**Aplica las transformaciones de escala, rotación y posición.*/
    public actualizarTransformacion(): void{
        if(this._rotarSegunVelocidad == true){
            let anguloTransformacionVelocidad: number = Vector.angulo(this._velocidad) - Vector.angulo(this._vertices[0]);
            this._transformacion.rotacion += anguloTransformacionVelocidad;
            this.aplicarTransformacion();
            this._transformacion.rotacion -= anguloTransformacionVelocidad;
        }
        else{
            this.aplicarTransformacion();
        }
    }
}