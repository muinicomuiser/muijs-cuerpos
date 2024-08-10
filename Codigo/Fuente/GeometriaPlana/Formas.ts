import { Matematica } from "../Utiles/Matematica.js";
import { Punto } from "./Punto.js";
import { Vector } from "./Vector.js";
import { Transformacion } from "./Transformacion.js";
import { Dibujante } from "../Renderizado/Dibujante.js";
import { Geometria } from "../Utiles/Geometria.js";
//POR INTEGRAR
// Para una forma personalizada, ya sea abierta o cerrada, agragar un método para calcular su radio o su centro
// Función de escalar, reflejar
// SUMAR FORMAS

export class Forma{
    protected _id: string;
    protected _centro: Vector;
    protected _lados: number;
    protected _radio: number;
    protected _vertices: Vector[];
    protected _verticesTransformados: Vector[];
    protected _transformacion: Transformacion;
    protected _radioTransformado: number;
    protected _color: string;

    protected constructor(x: number, y: number, lados: number = 0, radio: number = 0){
        this._id = "";
        this._centro = Vector.cero();
        this._lados = lados;
        this._radio = radio;
        this._vertices = this.crearVertices();
        this._verticesTransformados = [];
        this._transformacion = new Transformacion(x, y);
        this.aplicarTransformacion();
        this._radioTransformado = this._radio*this._transformacion.escala;
        this._color = "blue";
    }

    /**Retorna un string que indica el tipo de forma geométrica.        
     * "poligono", "circunferencia", "linea"
    */
    get id(): string{
        return this._id;
    }

    /**Retorna una copia del vector de la posición después de aplicar las transformaciones*/
    get posicion(): Vector{
        let posicion: Vector = Vector.clonar(this._transformacion.posicion);
        return posicion;
    }

    /**Retorna el número de lados de la figura.*/
    get lados(): number{
        return this._lados;
    }

    /**Retorna el valor del radio con la transformación de escala aplicada.*/
    get radio(): number{
        this._radioTransformado = this._radio*this._transformacion.escala;
        return this._radioTransformado;
    }

    /**Retorna el arreglo de vértices sin transformaciones.*/
    get vertices(): Vector[]{
        return Vector.clonarConjunto(this._vertices);
    }

    /**Retorna el arreglo de vértices después de aplicar las transformaciones de escala, rotación y desplazamiento..*/
    get verticesTransformados(): Vector[]{
        return Vector.clonarConjunto(this._verticesTransformados);
    }

    /**Retorna una copia de la transformación de la forma.*/
    get transformacion(): Transformacion{
        return new Transformacion(this._transformacion.posicion.x, this._transformacion.posicion.y, this._transformacion.rotacion, this._transformacion.escala);
    }

    /**Retorna el ángulo de rotación actual de la forma.*/
    get rotacion(): number{
        return this._transformacion.rotacion;
    }

    /**Retorna un conjunto de vectores normales de cada arista del polígono.        
     * El orden de las aristas es en sentido horario.       
    */
    get normales(): Vector[]{
        let normales: Vector[] = [];
        for(let i: number = 0; i < this.verticesTransformados.length; i++){
            if(i != this.verticesTransformados.length - 1){
                let normal: Vector = Vector.normal(this.verticesTransformados[i], this.verticesTransformados[i+1]);
                normales.push(normal)
            }
            else{
                let normal: Vector = Vector.normal(this.verticesTransformados[i], this.verticesTransformados[0]);
                normales.push(normal)
                }
            }
            return normales;
    }

    
    get color(): string{
        return this._color;
    }
    set id(nuevaId: string){
        this._id = nuevaId;
    }
    set posicion(nuevaPosicion: Vector){
        this._transformacion.posicion = Vector.clonar(nuevaPosicion);
    }
    set escala(nuevaEscala: number){
        this._transformacion.escala = nuevaEscala;
    }

    /**Modifica el valor de la rotación de la figura con respecto a su forma sin transformaciones.*/
    set rotacion(rotacion: number){
        this._transformacion.rotacion = rotacion;
    }
   
    set lados(numeroLados: number){
        this._lados = numeroLados;
    }

    set radio(nuevoRadio: number){
        this._radio = nuevoRadio;
    }

    set vertices(vertices: Vector[]){
        this._vertices = Vector.clonarConjunto(vertices);
    }

    set color(color: string){
        this._color = color;
    }

    private crearVertices(): Vector[]{
        if(this._lados == 0){
            return [];
        }
        let theta = Matematica.DOS_PI / this._lados;
        let offset = theta * 0.5;
        let nVertices = [];
        for (let i: number = 0; i < this._lados; i ++) {
            let angulo = offset + (i * theta);
            let xx = Math.cos(angulo) * this._radio;
            let yy = Math.sin(angulo) * this._radio;
            let vertice: Vector = Vector.crear(xx, yy);
            nVertices.push(vertice);
        }
        return nVertices;
    }

    //Agregar control de errores para índices mayores al número de vértices
    public moverVertice(indice: number, punto: Punto){
        this._vertices[indice] = Vector.crear(punto.x, punto.y);
    }


    static poligono(x: number, y: number, lados: number, radio: number){
        let nuevoPoligono = new Forma(x, y, lados, radio);
        nuevoPoligono.id = "poligono";
        return nuevoPoligono;
    }


    static circunferencia(x: number, y: number, radio: number){
        let lados = 10 + Matematica.truncar(radio / 10, 0); 
        if(lados % 2 == 1){
            lados++
        }
        if(lados > 30){
            lados = 30;
        }
        let nuevaCircunferencia = new Forma(x, y, lados, radio);
        nuevaCircunferencia.id = "circunferencia";
        return nuevaCircunferencia;
    }


    static rectangulo(x: number, y: number, base: number, altura: number){
        let rectangulo = new Forma(x, y, 4, Geometria.hipotenusa(base * 0.5, altura * 0.5));
        rectangulo.id = "poligono";
        let ver1: Vector = Vector.crear(base/2, altura/2);
        let ver2: Vector = Vector.crear(-base/2, altura/2);
        let ver3: Vector = Vector.crear(-base/2, -altura/2);
        let ver4: Vector = Vector.crear(base/2, -altura/2);
        let rectVertices = [ver1, ver2, ver3, ver4];
        rectangulo.vertices = rectVertices;
        rectangulo.aplicarTransformacion();
        return rectangulo;
    }


    /**Crea una recta centrada en el origen y con la posición ingresada almacenada en su registro de transformación.*/
    static recta(puntoUno: Punto, puntoDos: Punto){
        let centro = Vector.crear(puntoUno.x / 2 + puntoDos.x / 2, puntoUno.y / 2 + puntoDos.y / 2);
        let vertices: Vector[] = [Vector.crear(puntoUno.x - centro.x, puntoUno.y - centro.y), Vector.crear(puntoDos.x - centro.x, puntoDos.y - centro.y)];        
        let linea: Forma = new Forma(centro.x, centro.y, 1);
        linea.vertices = vertices;
        linea.aplicarTransformacion();
        linea.id = "linea";
        return linea;
    }


    /**
     * Crea un conjunto de rectas a partir de un grupo de vértices.
     * Calcula el centro de los vértices, centra la forma en el origen y almacena
     * el centro en el registro de transformación.
     */
    static trazo(vertices: Vector[]): Forma{
        let centro: Punto = {x: 0, y: 0};
        for(let vertice of vertices){
            centro.x += vertice.x / vertices.length;
            centro.y += vertice.y / vertices.length;
        }
        let posicion: Vector = Vector.crear(centro.x, centro.y);
        let trazo: Forma = new Forma(centro.x, centro.y);
        for(let vertice of vertices){
            trazo.vertices.push(Vector.resta(vertice, posicion));
        }
        trazo.aplicarTransformacion();
        trazo.id = "linea";
        trazo.lados = vertices.length - 1;
        return trazo;
    }


    protected aplicarTransformacion(): void{
        this._verticesTransformados = this._transformacion.transformarConjuntoVectores(this._vertices);
    }


    /**Suma el ángulo ingresado al ángulo de rotación de la figura.*/
    public rotar(angulo: number): void{
        this._transformacion.rotacion += angulo;
        this.aplicarTransformacion();
    }   

    /**Suma el vector ingresado al vector de posición de la figura.*/
    public desplazar(vector: Vector){
        this._transformacion.posicion = Vector.suma(this._transformacion.posicion, vector);
        this.aplicarTransformacion();
    }


    public rotarSegunOrigen(angulo: number){
        this._transformacion.posicion = Vector.rotar(this._transformacion.posicion, angulo);
        this.aplicarTransformacion();
    }


    public rotarSegunPunto(punto: Punto, angulo: number): void{
        let vectorAcomodador: Vector = Vector.crear(punto.x, punto.y);
        this._transformacion.posicion = Vector.resta(this._transformacion.posicion, vectorAcomodador);
        this.rotarSegunOrigen(angulo);
        this._transformacion.posicion = Vector.suma(this._transformacion.posicion, vectorAcomodador);
        this.aplicarTransformacion();
    }


    public escalar(escala: number): void{
        this._transformacion.escala = escala;
        this.aplicarTransformacion();
    }
    

    public trazar(dibujante: Dibujante): void{
        dibujante.color = this._color;
        dibujante.trazar(this);
    }


    public rellenar(dibujante: Dibujante): void{
        dibujante.color = this._color;
        dibujante.rellenar(this);
    }
}
    
    
