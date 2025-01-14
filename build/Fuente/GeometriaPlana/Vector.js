import { Geometria } from "../Utiles/Geometria.js";
//POR REVISAR
export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.origen = { x: 0, y: 0 };
        this.id = 0;
    }
    get magnitud() {
        // return Vector.magnitud(this);
        return Math.pow((Math.pow(this.x, 2) + Math.pow(this.y, 2)), (1 / 2));
    }
    get angulo() {
        // return Vector.angulo(this);
        if (this.x == 0 && this.y == 0) {
            return 0;
        }
        else if (this.y > 0 && this.x == 0) {
            return Geometria.PI_MEDIO;
        }
        else if (this.y < 0 && this.x == 0) {
            return (3 / 2) * Math.PI;
        }
        else {
            if (this.y > 0 && this.x > 0) {
                return Math.atan(this.y / this.x);
            }
            else if (this.y > 0 && this.x < 0) {
                return Math.acos(this.x / this.magnitud);
            }
            else if (this.y < 0 && this.x < 0) {
                return Math.PI - Math.asin(this.y / this.magnitud);
            }
            return Geometria.DOS_PI - Math.acos(this.x / this.magnitud);
            ;
        }
    }
    // static magnitud(vector: Vector): number {
    //     return (vector.x ** 2 + vector.y ** 2) ** (1 / 2)
    // }
    //REVISARRRRRRRRRRRRRRRR
    // static angulo(vector: Vector): number {
    //     if (vector.x == 0 && vector.y == 0) {
    //         return 0;
    //     }
    //     else if (vector.y > 0 && vector.x == 0) {
    //         return Geometria.PI_MEDIO;
    //     }
    //     else if (vector.y < 0 && vector.x == 0) {
    //         return (3 / 2) * Math.PI;
    //     }
    //     else {
    //         if (vector.y > 0 && vector.x > 0) {
    //             return Math.atan(vector.y / vector.x);
    //         }
    //         else if (vector.y > 0 && vector.x < 0) {
    //             return Math.acos(vector.x / Vector.magnitud(vector));
    //         }
    //         else if (vector.y < 0 && vector.x < 0) {
    //             return Math.PI - Math.asin(vector.y / Vector.magnitud(vector));
    //         }
    //         return Geometria.DOS_PI - Math.acos(vector.x / Vector.magnitud(vector));;
    //     }
    // }
    static cero() {
        return new Vector(0, 0);
    }
    static arriba(magnitud = 1) {
        return new Vector(0, -1 * magnitud);
    }
    static abajo(magnitud = 1) {
        return new Vector(0, 1 * magnitud);
    }
    static izquierda(magnitud = 1) {
        return new Vector(-1 * magnitud, 0);
    }
    static derecha(magnitud = 1) {
        return new Vector(1 * magnitud, 0);
    }
    /**Retorna un Vector aleatorio con magnitud definida.
     * Si no se determina una magnitud, retorna un vector normalizado.
     */
    static aleatorio(magnitud = 1) {
        let x = Math.random() * 2 - 1;
        let y = Math.random() * 2 - 1;
        return Vector.crear(x, y).normalizar().escalar(magnitud);
    }
    /**Retorna un vector nuevo a partir de las componentes x e y ingresadas.*/
    static crear(x, y) {
        return new Vector(x, y);
    }
    /**Retorna un vector nuevo que va desde un punto origen a un punto extremo.*/
    static segunPuntos(origen, extremo) {
        let vector = new Vector(extremo.x - origen.x, extremo.y - origen.y);
        return vector;
    }
    /**Retorna una copia de un conjunto de vectores.*/
    static clonarConjunto(vectores) {
        let conjuntoCopia = [];
        for (let vector of vectores) {
            conjuntoCopia.push(vector.clonar());
        }
        return conjuntoCopia;
    }
    /**Retorna el vector normal de un segmento formado por dos vectores.
     * El ángulo de la normal va en sentido antihorario según la dirección del primer al segundo vector.
     * (Según la inverción de ejes de las coordenadas de JS, donde los ángulos crecen en sentido horario).
    */
    static normal(vectorUno, vectorDos) {
        let vectorSegmento = Vector.segunPuntos(vectorUno, vectorDos);
        return vectorSegmento.rotar(-Geometria.PI_MEDIO);
    }
    /**Retorna una copia del vector.*/
    clonar() {
        let x = this.x;
        let y = this.y;
        return new Vector(x, y);
    }
    /**Retorna la suma de dos vectores como un vector nuevo.*/
    sumar(vectorSumar) {
        let vectorSuma = new Vector((this.x + vectorSumar.x), (this.y + vectorSumar.y));
        return vectorSuma;
    }
    /**Retorna la resta de dos vectores como un vector nuevo.*/
    restar(vectorRestar) {
        let vectorResta = new Vector((this.x - vectorRestar.x), (this.y - vectorRestar.y));
        return vectorResta;
    }
    /**Retorna un vector nuevo resultante de multiplicar las componentes de un vector por un escalar.*/
    escalar(escalar) {
        let vectorEscalado = new Vector((this.x * escalar), (this.y * escalar));
        return vectorEscalado;
    }
    /**Retorna una copia del vector ingresado con magnitud 1.*/
    normalizar() {
        return new Vector(this.x / this.magnitud, this.y / this.magnitud);
    }
    /**Retorna un vector resultante de invertir la dirección del vector ingresado.*/
    invertir() {
        return new Vector(-this.x, -this.y);
    }
    /**Retorna el producto punto, o escalar, entre dos vectores.*/
    punto(vectorProducto) {
        return (this.x * vectorProducto.x) + (this.y * vectorProducto.y);
    }
    /**Retorna el módulo del producto cruz, o vectorial, entre dos vectores de 2 dimensiones.*/
    cruz(vectorProducto) {
        return this.x * vectorProducto.y - this.y * vectorProducto.x;
    }
    /**Retorna el valor de la proyección de un vector sobre un eje representado por otro vector.*/
    proyeccion(vectorEje) {
        return (this.punto(vectorEje) / vectorEje.magnitud);
    }
    /**Retorna el valor del ángulo entre dos vectores.*/
    anguloVectores(vectorAngulo) {
        let punto = this.punto(vectorAngulo);
        let magnitudes = this.magnitud * vectorAngulo.magnitud;
        return Math.acos(punto / magnitudes);
    }
    /**Retorna un vector nuevo a partir de un vector rotado.*/
    rotar(angulo) {
        let x = (Math.cos(angulo) * this.x) - (Math.sin(angulo) * this.y);
        let y = (Math.sin(angulo) * this.x) + (Math.cos(angulo) * this.y);
        return new Vector(x, y);
    }
}
