import { Punto } from "../tipos/tipos";
import { Geometria } from "../utiles/geometria";

//POR REVISAR
export class Vector {
    x: number;
    y: number;
    origen: Punto;
    id: number;
    private constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.origen = { x: 0, y: 0 };
        this.id = 0;
    }
    public get magnitud(): number {
        // return Vector.magnitud(this);
        return (this.x ** 2 + this.y ** 2) ** (1 / 2)
    }
    public get angulo(): number {
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
            return Geometria.DOS_PI - Math.acos(this.x / this.magnitud);;
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
    static cero(): Vector {
        return new Vector(0, 0);
    }
    static arriba(magnitud: number = 1): Vector {
        return new Vector(0, -1 * magnitud);
    }
    static abajo(magnitud: number = 1): Vector {
        return new Vector(0, 1 * magnitud);
    }
    static izquierda(magnitud: number = 1): Vector {
        return new Vector(-1 * magnitud, 0);
    }
    static derecha(magnitud: number = 1): Vector {
        return new Vector(1 * magnitud, 0);
    }
    /**Retorna un Vector aleatorio con magnitud definida.       
     * Si no se determina una magnitud, retorna un vector normalizado.
     */
    static aleatorio(magnitud: number = 1): Vector {
        let x: number = Math.random() * 2 - 1;
        let y: number = Math.random() * 2 - 1;
        return Vector.crear(x, y).normalizar().escalar(magnitud)
    }

    /**Retorna un vector nuevo a partir de las componentes x e y ingresadas.*/
    static crear(x: number, y: number): Vector {
        return new Vector(x, y);
    }

    /**Retorna un vector nuevo que va desde un punto origen a un punto extremo.*/
    static segunPuntos(origen: Punto, extremo: Punto): Vector {
        let vector: Vector = new Vector(extremo.x - origen.x, extremo.y - origen.y);
        return vector;
    }

    /**Retorna una copia de un conjunto de vectores.*/
    static clonarConjunto(vectores: Vector[]): Vector[] {
        let conjuntoCopia: Vector[] = [];
        for (let vector of vectores) {
            conjuntoCopia.push(vector.clonar());
        }
        return conjuntoCopia;
    }

    /**Retorna el vector normal de un segmento formado por dos vectores.        
     * El ángulo de la normal va en sentido antihorario según la dirección del primer al segundo vector.       
     * (Según la inverción de ejes de las coordenadas de JS, donde los ángulos crecen en sentido horario).
    */
    static normal(vectorUno: Vector, vectorDos: Vector): Vector {
        let vectorSegmento: Vector = Vector.segunPuntos(vectorUno, vectorDos);
        return vectorSegmento.rotar(-Geometria.PI_MEDIO);
    }

    /**Retorna una copia del vector.*/
    clonar(): Vector {
        let x: number = this.x;
        let y: number = this.y;
        return new Vector(x, y)
    }

    /**Retorna la suma de dos vectores como un vector nuevo.*/
    sumar(vectorSumar: Vector): Vector {
        let vectorSuma: Vector = new Vector((this.x + vectorSumar.x), (this.y + vectorSumar.y));
        return vectorSuma;
    }

    /**Retorna la resta de dos vectores como un vector nuevo.*/
    restar(vectorRestar: Vector): Vector {
        let vectorResta: Vector = new Vector((this.x - vectorRestar.x), (this.y - vectorRestar.y));
        return vectorResta;
    }

    /**Retorna un vector nuevo resultante de multiplicar las componentes de un vector por un escalar.*/
    escalar(escalar: number): Vector {
        let vectorEscalado: Vector = new Vector((this.x * escalar), (this.y * escalar));
        return vectorEscalado;
    }

    /**Retorna una copia del vector ingresado con magnitud 1.*/
    normalizar() {
        return new Vector(this.x / this.magnitud, this.y / this.magnitud);
    }

    /**Retorna un vector resultante de invertir la dirección del vector ingresado.*/
    invertir(): Vector {
        return new Vector(-this.x, -this.y);
    }


    /**Retorna el producto punto, o escalar, entre dos vectores.*/
    punto(vectorProducto: Vector): number {
        return (this.x * vectorProducto.x) + (this.y * vectorProducto.y)
    }

    /**Retorna el módulo del producto cruz, o vectorial, entre dos vectores de 2 dimensiones.*/
    cruz(vectorProducto: Vector): number {
        return this.x * vectorProducto.y - this.y * vectorProducto.x
    }

    /**Retorna el valor de la proyección de un vector sobre un eje representado por otro vector.*/
    proyeccion(vectorEje: Vector): number {
        return (this.punto(vectorEje) / vectorEje.magnitud);
    }

    /**Retorna el valor del ángulo entre dos vectores.*/
    anguloVectores(vectorAngulo: Vector): number {
        let punto: number = this.punto(vectorAngulo);
        let magnitudes: number = this.magnitud * vectorAngulo.magnitud;
        return Math.acos(punto / magnitudes);
    }

    /**Retorna un vector nuevo a partir de un vector rotado.*/
    rotar(angulo: number): Vector {
        let x: number = (Math.cos(angulo) * this.x) - (Math.sin(angulo) * this.y);
        let y: number = (Math.sin(angulo) * this.x) + (Math.cos(angulo) * this.y)
        return new Vector(x, y);
    }



    // /**Retorna una copia del vector.*/
    // static clonar(vector: Vector): Vector {
    //     let x: number = vector.x;
    //     let y: number = vector.y;
    //     return new Vector(x, y)
    // }

    // /**Retorna la suma de dos vectores como un vector nuevo.*/
    // static suma(vectorUno: Vector, vectorDos: Vector): Vector {
    //     let vectorSuma: Vector = new Vector((vectorUno.x + vectorDos.x), (vectorUno.y + vectorDos.y));
    //     return vectorSuma;
    // }

    // /**Retorna la resta de dos vectores como un vector nuevo.*/
    // static resta(vectorUno: Vector, vectorDos: Vector): Vector {
    //     let vectorResta: Vector = new Vector((vectorUno.x - vectorDos.x), (vectorUno.y - vectorDos.y));
    //     return vectorResta;
    // }

    // /**Retorna un vector nuevo resultante de multiplicar las componentes de un vector por un escalar.*/
    // static escalar(vector: Vector, escalar: number): Vector {
    //     let vectorEscalado: Vector = new Vector((vector.x * escalar), (vector.y * escalar));
    //     return vectorEscalado;
    // }

    // /**Retorna una copia del vector ingresado con magnitud 1.*/
    // static normalizar(vector: Vector) {
    //     return new Vector(vector.x / vector.magnitud, vector.y / vector.magnitud);
    // }

    // /**Retorna un vector resultante de invertir la dirección del vector ingresado.*/
    // static invertir(vector: Vector): Vector {
    //     return new Vector(-vector.x, -vector.y);
    // }

    // /**Retorna el vector normal de un segmento formado por dos vectores.        
    //  * El ángulo de la normal va en sentido antihorario según la dirección del primer al segundo vector.       
    //  * (Según la inverción de ejes de las coordenadas de JS, donde los ángulos crecen en sentido horario).
    // */
    // static normal(vectorUno: Vector, vectorDos: Vector): Vector {
    //     let vectorSegmento: Vector = Vector.segunPuntos(vectorUno, vectorDos);
    //     return Vector.rotar(vectorSegmento, -Geometria.PI_MEDIO);
    // }

    // /**Retorna el producto punto, o escalar, entre dos vectore.*/
    // static punto(vectorUno: Vector, vectorDos: Vector): number {
    //     return (vectorUno.x * vectorDos.x) + (vectorUno.y * vectorDos.y)
    // }

    // /**Retorna el módulo del producto cruz, o vectorial, entre dos vectores de 2 dimensiones.*/
    // static cruz(vectorUno: Vector, vectorDos: Vector): number {
    //     return vectorUno.x * vectorDos.y - vectorUno.y * vectorDos.x
    // }

    // /**Retorna el valor de la proyección de un vector sobre un eje representado por otro vector.*/
    // static proyeccion(vectorUno: Vector, vectorEje: Vector): number {
    //     return (Vector.punto(vectorUno, vectorEje) / Vector.magnitud(vectorEje));
    // }

    // /**Retorna el valor del ángulo entre dos vectores.*/
    // static anguloVectores(vectorUno: Vector, vectorDos: Vector): number {
    //     let punto: number = Vector.punto(vectorUno, vectorDos);
    //     let magnitudes: number = vectorUno.magnitud * vectorDos.magnitud;
    //     return Math.acos(punto / magnitudes);
    // }

    // /**Retorna una copia de un conjunto de vectores.*/
    // static clonarConjunto(vectores: Vector[]): Vector[] {
    //     let conjuntoCopia: Vector[] = [];
    //     for (let vector of vectores) {
    //         conjuntoCopia.push(Vector.clonar(vector));
    //     }
    //     return conjuntoCopia;
    // }

    // /**Retorna un vector nuevo a partir de un vector rotado.*/
    // static rotar(vector: Vector, angulo: number): Vector {
    //     let x: number = (Math.cos(angulo) * vector.x) - (Math.sin(angulo) * vector.y);
    //     let y: number = (Math.sin(angulo) * vector.x) + (Math.cos(angulo) * vector.y)
    //     return new Vector(x, y);
    // }
}