/**
        =============================================
                 * MÓDULO DE CUERPOS *
        =============================================
        Trabaja usando objetos de tipo Forma.

        Crea cuerpos geométricos con masa y densidad.

        Contiene métodos para mover según velocidad y aceleración.

 */

import { Forma } from "../GeometriaPlana/Formas.js";
import { Transformacion } from "../GeometriaPlana/Transformacion.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Dibujante } from "../Renderizado/Dibujante.js";

//TAREAS
    //Una propiedad que defina si es necesario actualizar la posición y la rotación.
    //Un solo método para aplicar transformar y actualizar transformaciones
    //Buscar un modo de anclar un vértice a otro vector. Así se puede acoplar un ala a otro cuerpo. Método anclar(vector)


/**MÓDULO DE CUERPOS    
 * Trabaja usando objetos de tipo Forma.
 */
export class Cuerpo extends Forma{
    protected _velocidad: Vector = Vector.cero();
    protected _aceleracion: Vector = Vector.cero()
    protected _rotarSegunVelocidad: boolean = false;
    protected _fijo: boolean = false;
    protected _masa: number = 1;
    protected _densidad: number = 1;
    private constructor(){
        super();
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
    get verticesTransformados(): Vector[]{
        if(this._rotarSegunVelocidad == true){
            this._transformacion.rotacion = Vector.angulo(this._velocidad) - Vector.angulo(this._vertices[0]);
        }
        let verticesTransformados = this._transformacion.transformarConjuntoVectores(this._vertices);
        return verticesTransformados;
    }
    set velocidad(velocidad: Vector){
        this._velocidad = Vector.clonar(velocidad);
    }
    set aceleracion(aceleracion: Vector){
        this._aceleracion = Vector.clonar(aceleracion);
    }
    set masa(masa: number){
        this._masa = masa;
    }
    set densidad(densidad: number){
        this._densidad = densidad;
    } 
    set fijo(fijo: boolean){
        this._fijo = fijo;
    }
    set rotarSegunVelocidad(opcion: boolean){
        this._rotarSegunVelocidad = opcion;
    }

    
    public trazarVelocidad(dibujante: Dibujante): void{
        let vectorVelocidad: Vector = Vector.clonar(this._velocidad);  
        vectorVelocidad = Vector.escalar(Vector.normalizar(vectorVelocidad), this._radio);
        vectorVelocidad.origen = this._transformacion.posicion;
        dibujante.trazarVector(vectorVelocidad);
    }

    private static cuerpoSegunForma(forma: Forma): Cuerpo{
        let cuerpo: Cuerpo = new Cuerpo();
        cuerpo.vertices = forma.vertices;
        cuerpo.transformacion = forma.transformacion;
        cuerpo.lados = forma.lados;
        cuerpo.radio = forma.radio;   
        cuerpo.tipo = forma.tipo;  
        return cuerpo;   
    }

    /**Retorna un cuerpo geométrico regular.     
     * El radio corresponde a la distancia entre el centro y cualquiera de sus vértices.*/
    static poligono(x: number, y: number, lados: number, radio: number, masa: number = 1, densidad: number = 1){
        let poliForma: Forma = super.poligono(x, y, lados, radio);
        let poligono: Cuerpo = Cuerpo.cuerpoSegunForma(poliForma);
        poligono.masa = masa;
        poligono.densidad = densidad;
        poligono.fijo = false;
        return poligono; 
    }

    
    /**Retorna un cuerpo geométrico regular.     
     * El radio corresponde a la distancia entre el centro y cualquiera de sus vértices.*/
    static poligonoSegunVertices(vertices: Vector[], masa: number = 1, densidad: number = 1){
        let poliForma: Forma = super.poligonoSegunVertices(vertices);
        let poligono: Cuerpo = Cuerpo.cuerpoSegunForma(poliForma);
        poligono.masa = masa;
        poligono.densidad = densidad;
        poligono.fijo = false;
        return poligono; 
    }

    /**Retorna un cuerpo rectangular.*/
    static rectangulo(x: number, y: number, base: number, altura: number, masa: number = 1, densidad: number = 1){
        let rectForma: Forma = super.rectangulo(x, y, base, altura);
        let rectangulo: Cuerpo = Cuerpo.cuerpoSegunForma(rectForma);
        rectangulo.masa = masa;
        rectangulo.densidad = densidad;
        rectangulo.fijo = false;
        return rectangulo;
    }


    /**Retorna un cuerpo con forma de circunferencia.*/
    static circunferencia(x: number, y: number, radio: number, masa: number = 1, densidad: number= 1): Cuerpo {
        let circuloForma: Forma = super.circunferencia(x, y, radio);
        let circunferencia: Cuerpo = Cuerpo.cuerpoSegunForma(circuloForma);
        circunferencia.masa = masa;
        circunferencia.densidad = densidad;
        circunferencia.fijo = false;
        return circunferencia;
    }


    /**Suma la velocidad y la aceleración a la posición.*/
    public mover(): void{
        this._velocidad = Vector.suma(this._velocidad, this._aceleracion);
        this._transformacion.posicion = Vector.suma(this._transformacion.posicion, this._velocidad);
    }
}