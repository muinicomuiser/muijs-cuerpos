/**
 * MÓDULO MATEMÁTICO EN ESPAÑOL
 *
 * Por agregar: potencia, floor, ceil, logaritmo, trigonometrías, exp, raizcuadrada, cuadrado, cubo, max, min, promedio.
 * POR CORREGIR: Reemplazar multiplicaciones por multiplicacionSegura, y las sumas también.
 */
export class Matematica {
    /**Retorna el valor de PI usando quince decimales.*/
    static get PI() {
        return 3.141592653589793;
    }
    /**Retorna el doble del valor de PI usando quince decimales.*/
    static get DOS_PI() {
        return Matematica.multiplicacionSegura(this.PI, 2);
    }
    /**Retorna el valor de PHI (número áureo) usando quince decimales*/
    static get PHI() {
        return 1.618033988749895;
    }
    /**Retorna el valor del número e usando quince decimales.*/
    static get e() {
        return 2.718281828459045;
    }
    /**Retorna la parte entera de cualquier número real.
     *
     *ANOTACIÓN:
     *Para cualquier número con más de 15 decimales que podría ser aproximado al número superior, javascript
     *lo aproximará automáticamente. Pueden ocurrir cosas raras con más de 15 decimales.
    */
    static parteEntera(numero) {
        let numeroPrueba = Matematica.sumaSegura(numero, -Matematica.parteDecimal(numero));
        return numeroPrueba;
        //ANOTACIÓN
        //Para cualquier número con más de 15 decimales que podría ser aproximado al número superior, typescript
        //lo aproximará automáticamente.
    }
    /**Retorna la parte decimal de cualquier número real.*/
    static parteDecimal(numero) {
        let num = "0" + numero;
        num = num.split(".")[1];
        num = "0." + num;
        if (numero < 0 && parseFloat(num) > 0) {
            return -parseFloat(num);
        }
        return parseFloat(num);
    }
    /**Retorna 1 si el número es positivo, -1 si es negativo y 0 cuando el número es 0.*/
    static signo(numero) {
        let signo;
        if (numero == 0) {
            return 0;
        }
        return signo = numero > 0 ? 1 : -1;
    }
    /**Retorna la copia de un número con la cantidad de decimales especificada.
     * Solo acepta números entre 0 y 100.
    */
    static truncar(numero, decimales) {
        if (decimales < 0) {
            throw new Error("El método truncar solo acepta números entre 0 y 100");
        }
        // let dec: number = Matematica.parteEntera(decimales);
        let dec = Matematica.sumaSegura(decimales, -Matematica.parteDecimal(decimales));
        let numString = numero.toFixed(dec + 1);
        let num = parseFloat(numString.slice(0, -1));
        return num;
    }
    /**Retorna el valor absoluto de cualquier número real.*/
    static absoluto(numero) {
        if (numero < 0) {
            return -numero;
        }
        return numero;
    }
    /**Retorna un número truncado según la cantidad de decimales especificada, con la última cifra redondeada.*/
    static redondear(numero, decimales) {
        let num = numero.toFixed(decimales + 1);
        if (num.slice(-1) == "5") {
            num += "6";
            num = parseFloat(num).toFixed(decimales + 1);
        }
        num = parseFloat(num).toFixed(decimales);
        return parseFloat(num);
    }
    /**Retorna true o false dependiendo de si los números ingresados son iguales o no.
     * Permite definir el nivel de tolerancia de comparación. Si no se define, se usa por
     * defecto el rango de Number.EPSILON (2.220446049250313e-16)
    */
    static comparar(a, b, tolerancia = Number.EPSILON) {
        return (Matematica.absoluto(a - b) < tolerancia);
    }
    /**Multiplica dos números. Evita comportamientos erráticos de javascript al multiplicar ciertos números,
     * como el caso típico 0.1 * 0.2 = 0.020000000000000004;
    */
    static multiplicacionSegura(numero1, numero2) {
        if (numero1 == 0 || numero2 == 0) {
            return 0;
        }
        if (3 * (numero1.toString(10).length + numero2.toString(10).length) < (numero1 * numero2).toString(10).length) {
            return ((numero1 * 10) * (numero2 * 10)) / 100;
        }
        return numero1 * numero2;
    }
    /**Divide dos números. Evita comportamientos erráticos de javascript al dividir ciertos números,
     * como el caso típico 0.02 / 0.1 = 0.19999999999999998;
    */
    static divisionSegura(numero1, numero2) {
        if (numero1 == 0) {
            return 0;
        }
        else if (numero2 == 0) {
            throw new Error("El módulo Matematica no permite divisiones por cero");
        }
        else if ((numero1.toString().length + numero2.toString().length) < (numero1 / numero2).toString().length) {
            // return (numero1*10) / (numero2*10)
            return (Matematica.multiplicacionSegura(numero1, 100) / (Matematica.multiplicacionSegura(numero2, 100)));
        }
        return numero1 / numero2;
    }
    /**Suma dos números. Evita comportamientos erráticos de javascript al sumar ciertos números,
     * como el caso típico 0.1 + 0.2 = 0.30000000000000004;
    */
    static sumaSegura(numero1, numero2) {
        if ((numero1.toString().length + numero2.toString().length) < (numero1 + numero2).toString().length) {
            return ((numero1 * 10) + (numero2 * 10)) / 10;
        }
        return numero1 + numero2;
    }
    //GRADOS  
    /**Transforma grados sexagesimales a radianes.*/
    static gradoARadian(grado) {
        return Matematica.multiplicacionSegura(Matematica.divisionSegura(grado, 180), Matematica.PI);
        // return (grado / 180) * this.PI;
    }
    /**Transfoma radianes a grados sexagesimales.*/
    static radianAGrado(rad) {
        return Matematica.multiplicacionSegura(Matematica.divisionSegura(rad, Matematica.PI), 180);
        // return (rad / this.PI)*180;
    }
    /**Retorna el resultado de elevar la base ingresada al exponente ingresado.*/
    static potencia(base, exponente) {
        return base ** exponente;
    }
    /** */
    static raiz(radicando, indice) {
        if (radicando < 0 && indice % 2 == 0) {
            throw new Error("El método .raiz solo trabaja con números reales. No responde a la raíz par de un número negativo.");
        }
        return radicando ** Matematica.divisionSegura(1, indice);
    }
    //PITAGÓRICA
    /** */
    static hipotenusa(cateto1, cateto2) {
        let hipotenusa = Matematica.raiz(Matematica.sumaSegura(cateto1 ** 2, cateto2 ** 2), 2);
        return hipotenusa;
    }
    /** */
    static cateto(hipotenusa, cateto) {
        let cateto2 = Matematica.raiz(hipotenusa ** 2 - cateto ** 2, 2);
        return cateto2;
    }
    //COORDENADAS
    /** */
    static distanciaEntrePuntos(puntoUno, puntoDos) {
        let distancia = Matematica.hipotenusa(puntoDos.x - puntoUno.x, puntoDos.y - puntoUno.y);
        return distancia;
    }
    /** */
    static puntoMedio(puntoUno, puntoDos) {
        let puntoMedio = { x: puntoUno.x / 2 + puntoDos.x / 2, y: puntoUno.y / 2 + puntoDos.y / 2 };
        return puntoMedio;
    }
}
