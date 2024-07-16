/**
 * MÓDULO MATEMÁTICO EN ESPAÑOL
 * por agregar: potencia, floor, ceil, log, trigonometrías, exp, sign, raizcuadrada, cuadrado, cubo, max, min, promedio
 */
//POR CORREGIR: Reemplazar multiplicaciones por multiplicacionSegura, y las sumas también
export class Matematica {
    static set PI(pi) {
        Matematica.PI = pi;
    }
    static get PI() {
        return 3.141592653589793;
    }
    static get DOS_PI() {
        return this.PI * 2;
    }
    static get PHI() {
        return 1.618033988749895;
    }
    static parteEntera(numero) {
        let num = parseInt(numero.toFixed(0));
        return num;
    }
    static signo(numero) {
        let signo;
        if (numero == 0) {
            return 0;
        }
        return signo = numero > 0 ? 1 : -1;
    }
    static parteDecimal(numero) {
        let num = "0" + numero;
        num = num.split(".")[1];
        num = "0." + num;
        if (numero < 0 && parseFloat(num) > 0) {
            return -parseFloat(num);
        }
        return parseFloat(num);
    }
    static truncar(numero, decimales) {
        let numString = numero.toFixed(decimales + 1);
        let num = parseFloat(numString.slice(0, -1));
        return num;
    }
    static absoluto(numero) {
        if (numero < 0) {
            return -numero;
        }
        return numero;
    }
    static redondear(numero, decimales) {
        let num = numero.toFixed(decimales + 1);
        if (num.slice(-1) == "5") {
            num += "6";
            num = parseFloat(num).toFixed(decimales + 1);
        }
        num = parseFloat(num).toFixed(decimales);
        return parseFloat(num);
    }
    static comparar(a, b, tolerancia = Number.EPSILON) {
        return (Matematica.absoluto(a - b) < tolerancia);
    }
    static multiplicacionSegura(numero1, numero2) {
        if (3 * (numero1.toString(10).length + numero2.toString(10).length) < (numero1 * numero2).toString(10).length) {
            return ((numero1 * 10) * (numero2 * 10)) / 100;
        }
        return numero1 * numero2;
    }
    static divisionSegura(numero1, numero2) {
        if (3 * (numero1.toString(10).length + numero2.toString(10).length) < (numero1 / numero2).toString(10).length) {
            return (numero1 * 10) / (numero2 * 10);
            // return (Matematica.multiplicacionSegura(numero1, 10)/(Matematica.multiplicacionSegura(numero2, 10)));
        }
        return numero1 / numero2;
    }
    static sumaSegura(numero1, numero2) {
        if (3 * (numero1.toString(10).length + numero2.toString(10).length) < (numero1 + numero2).toString(10).length) {
            return ((numero1 * 10) + (numero2 * 10)) / 10;
        }
        return numero1 + numero2;
    }
    //Grados
    static gradoARadian(grado) {
        return Matematica.multiplicacionSegura(Matematica.divisionSegura(grado, 180), this.PI);
        // return (grado / 180) * this.PI;
    }
    static radianAGrado(rad) {
        return Matematica.multiplicacionSegura(Matematica.divisionSegura(rad, this.PI), 180);
        // return (rad / this.PI)*180;
    }
    static potencia(base, exponente) {
        return base ** exponente;
    }
    static raiz(radicando, indice) {
        return radicando ** (1 / indice);
    }
    //Pitagórica
    static hipotenusa(cateto1, cateto2) {
        let hipotenusa = Matematica.raiz(cateto1 ** 2 + cateto2 ** 2, 2);
        return hipotenusa;
    }
    static cateto(hipotenusa, cateto) {
        let cateto2 = Matematica.raiz(hipotenusa ** 2 - cateto ** 2, 2);
        return cateto2;
    }
}
