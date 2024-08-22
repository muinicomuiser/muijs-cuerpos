import { Punto } from "./Punto.js";
import { Vector } from "./Vector.js";
import { Transformacion } from "./Transformacion.js";
import { Dibujante } from "../Renderizado/Dibujante.js";
import { Geometria } from "../Utiles/Geometria.js";
import { TipoFormas } from "./TipoFormas.js";
//POR INTEGRAR
// Para una forma personalizada, ya sea abierta o cerrada, agragar un método para calcular su radio o su centro
// Función de escalar, reflejar
// SUMAR FORMAS


//Agregar propiedad de vértices transformados, normales rotadas y apotema, para no estar calculándolo en cada momento,
//ademas de una propiedad que avise cuando haya que aplicar la transformación.
export class Forma{
    protected _centro: Vector = Vector.cero();
    protected _lados: number = 0;
    protected _radio: number = 0;
    protected _color: string = "";
    protected _vertices: Vector[] = [];
    protected _verticesTransformados: Vector[] = [];
    protected _tipo: TipoFormas = TipoFormas.poligono;
    protected _transformacion: Transformacion = new Transformacion();
    protected _transformar: boolean = true;

    protected constructor(){}

    /**Retorna un string que indica el tipo de forma geométrica.        
     * "poligono", "circunferencia", "linea"
    */
    get tipo(): TipoFormas{
        return this._tipo;
    }
    /**Retorna el número de lados de la figura.*/
    get lados(): number{
        return this._lados;
    }
    /**Retorna el valor del radio sin transformar.*/
    get radio(): number{
        return this._radio;
    }
    /**Retorna el valor del radio con la transformación de escala aplicada.*/
    get radioTransformado(): number{
        let radioTransformado: number = this._radio*this._transformacion.escala;
        return radioTransformado;
    }
    /**Retorna una copia de la transformación de la forma.*/
    get transformacion(): Transformacion{
        return new Transformacion(this._transformacion.posicion.x, this._transformacion.posicion.y, this._transformacion.rotacion, this._transformacion.escala);
    }
    /**Retorna una copia del vector de la posición después de aplicar las transformaciones*/
    get posicion(): Vector{
        let posicion: Vector = Vector.clonar(this._transformacion.posicion);
        return posicion;
    }    
    /**Retorna el ángulo de rotación actual de la forma.*/
    get rotacion(): number{
        return this._transformacion.rotacion;
    }
    
    get escala(): number {
        return this._transformacion.escala;
    }

    /**Retorna el arreglo de vértices sin transformaciones.*/
    get vertices(): Vector[]{
        return Vector.clonarConjunto(this._vertices);
    }

    /**Retorna el arreglo de vértices después de aplicar las transformaciones de escala, rotación y desplazamiento..*/
    get verticesTransformados(): Vector[]{
        if(this._transformar){
            this.transformarVertices()
        }
        return Vector.clonarConjunto(this._verticesTransformados)
        // let verticesTransformados = this._transformacion.transformarConjuntoVectores(this._vertices);
        // return verticesTransformados;
    }

    /**Retorna un conjunto de vectores normales de cada arista del polígono.        
     * El orden de las aristas es en senttipoo horario.       
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
    /**Retorna la distancia entre el centro del polígono y el punto más cercano de sus aristas.*/
    get apotema(): number{
        if(this.tipo == TipoFormas.circunferencia){
            return this.radioTransformado;
        }
        return Math.cos(Math.PI / this.lados)*this.radio;
    }
    get color(): string{
        return this._color;
    }
    set tipo(nuevatipo: TipoFormas){
        this._tipo = nuevatipo;
    }
    set lados(numeroLados: number){
        this._lados = numeroLados;
    }
    set radio(nuevoRadio: number){
        this._radio = nuevoRadio;
    }
    set transformacion(transformacion: Transformacion){
        this._transformar = true;
        this._transformacion = transformacion;
    }
    set posicion(nuevaPosicion: Vector){
        this._transformar = true;
        this._transformacion.posicion = Vector.clonar(nuevaPosicion);
    }
    /**Modifica el valor de la rotación de la figura con respecto a su forma sin transformaciones.*/
    set rotacion(rotacion: number){
        this._transformar = true;
        this._transformacion.rotacion = rotacion;
    }    
    set escala(nuevaEscala: number){
        this._transformar = true;
        this._transformacion.escala = nuevaEscala;
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
        let theta = Geometria.DOS_PI / this._lados;
        let offset = theta * 0.5;
        let nVertices = [];
        for (let i: number = 0; i < this.lados; i ++) {
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

    //--
    static poligono(x: number, y: number, lados: number, radio: number){
        let nuevoPoligono = new Forma();
        nuevoPoligono.lados = lados;
        nuevoPoligono.radio = radio;
        nuevoPoligono.vertices = nuevoPoligono.crearVertices();
        nuevoPoligono.tipo = TipoFormas.poligono;
        nuevoPoligono.iniciarTransformacion(x, y)
        return nuevoPoligono;
    }


    static circunferencia(x: number, y: number, radio: number){
        let nuevaCircunferencia = new Forma();
        nuevaCircunferencia.radio = radio;
        let lados = 10 + Math.trunc(radio / 10); 
        if(lados % 2 == 1){
            lados++
        }
        if(lados > 30){
            lados = 30;
        }
        nuevaCircunferencia.lados = lados;
        nuevaCircunferencia.vertices = nuevaCircunferencia.crearVertices();
        nuevaCircunferencia.tipo = TipoFormas.circunferencia;
        nuevaCircunferencia.iniciarTransformacion(x, y)
        return nuevaCircunferencia;
    }


    static rectangulo(x: number, y: number, base: number, altura: number){
        let rectangulo = new Forma();
        rectangulo.lados = 4;
        rectangulo.radio = Geometria.hipotenusa(base * 0.5, altura * 0.5);
        let ver1: Vector = Vector.crear(base/2, altura/2);
        let ver2: Vector = Vector.crear(-base/2, altura/2);
        let ver3: Vector = Vector.crear(-base/2, -altura/2);
        let ver4: Vector = Vector.crear(base/2, -altura/2);
        let rectVertices = [ver1, ver2, ver3, ver4];
        rectangulo.vertices = rectVertices;
        rectangulo.tipo = TipoFormas.poligono;
        rectangulo.iniciarTransformacion(x, y);
        return rectangulo;
    }


    /**Crea una recta centrada en el origen y con la posición ingresada almacenada en su registro de transformación.*/
    static recta(puntoUno: Punto, puntoDos: Punto){
        let linea: Forma = new Forma();
        linea.lados = 1;
        linea.radio = Geometria.distanciaEntrePuntos(puntoUno, puntoDos) / 2;
        let centro = Vector.crear(puntoUno.x / 2 + puntoDos.x / 2, puntoUno.y / 2 + puntoDos.y / 2);
        let vertices: Vector[] = [Vector.crear(puntoUno.x - centro.x, puntoUno.y - centro.y), Vector.crear(puntoDos.x - centro.x, puntoDos.y - centro.y)];        
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
    static trazo(vertices: Vector[]): Forma{
        let centro: Vector = Vector.crear(0, 0)
        let trazo: Forma = new Forma();
        let verticesTrazo: Vector[] = []
        trazo.lados = vertices.length - 1;
        for(let vertice of vertices){
            centro = Vector.suma(centro, Vector.escalar(vertice, 1/vertices.length))
        }
        for(let vertice of vertices){
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
    static poligonoSegunVertices(vertices: Vector[]): Forma{
        let centro: Vector = Vector.crear(0, 0)
        let poligono: Forma = new Forma();
        let verticesPoligono: Vector[] = []
        poligono.lados = vertices.length - 1;
        for(let vertice of vertices){
            centro = Vector.suma(centro, Vector.escalar(vertice, 1/vertices.length))
        }
        for(let vertice of vertices){
            verticesPoligono.push(Vector.resta(vertice, centro));
        }
        poligono.vertices = verticesPoligono;
        poligono.tipo = TipoFormas.poligono;
        poligono.iniciarTransformacion(centro.x, centro.y);
        return poligono;
    }

    iniciarTransformacion(x: number, y: number): void{
        this._transformacion.posicion = Vector.crear(x, y);
        // this.transformacion = new Transformacion(x, y);
    }

    protected transformarVertices(): void{
        this._verticesTransformados = this._transformacion.transformarConjuntoVectores(this._vertices);
        this._transformar = false;
    }

    /**Suma el ángulo ingresado al ángulo de rotación de la figura.*/
    public rotar(angulo: number): void{
        this._transformacion.rotacion += angulo;
    }   

    /**Suma el vector ingresado al vector de posición de la figura.*/
    public desplazar(vector: Vector){
        this._transformacion.posicion = Vector.suma(this._transformacion.posicion, vector);
    }


    public rotarSegunOrigen(angulo: number){
        this._transformacion.posicion = Vector.rotar(this._transformacion.posicion, angulo);
    }


    public rotarSegunPunto(punto: Punto, angulo: number): void{
        let vectorAcomodador: Vector = Vector.crear(punto.x, punto.y);
        this._transformacion.posicion = Vector.resta(this._transformacion.posicion, vectorAcomodador);
        this.rotarSegunOrigen(angulo);
        this._transformacion.posicion = Vector.suma(this._transformacion.posicion, vectorAcomodador);
    }


    public trazar(dibujante: Dibujante): void{
        dibujante.trazar(this);
    }


    public rellenar(dibujante: Dibujante): void{
        dibujante.rellenar(this);
    }
}
    
    
