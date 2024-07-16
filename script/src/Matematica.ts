/**
 * MÓDULO MATEMÁTICO EN ESPAÑOL
 * por agregar: potencia, floor, ceil, log, trigonometrías, exp, sign, raizcuadrada, cuadrado, cubo, max, min, promedio
 */
//POR CORREGIR: Reemplazar multiplicaciones por multiplicacionSegura, y las sumas también
export class Matematica{
    static set PI(pi: number){
        Matematica.PI = pi;
    }
    static get PI(): number{
        return 3.141592653589793;
    }
    static get DOS_PI(): number{
        return this.PI * 2;
    }
    static get PHI(): number{
        return 1.618033988749895;
    }
    static parteEntera(numero: number): number{
        let num: number = parseInt(numero.toFixed(0));
        return num;
    }
    static signo(numero: number): number{
        let signo: number;
        if(numero == 0){
            return 0;
        }
        return signo = numero > 0 ? 1 : -1;
    }
    static parteDecimal(numero: number):number{
        let num: string = "0" + numero;
        num = num.split(".")[1];
        num = "0." + num;        
        if(numero < 0 && parseFloat(num) > 0){
            return -parseFloat(num)
        }
        return parseFloat(num);
    }
    static truncar(numero: number, decimales: number):number{
        let numString: string = numero.toFixed(decimales + 1);
        let num: number = parseFloat(numString.slice(0, -1));
        return num;
    }
    static absoluto(numero: number): number{
        if(numero < 0){
            return -numero;
        }
        return numero;
    }
    static redondear(numero: number, decimales: number): number{
        let num: string = numero.toFixed(decimales + 1);
    
        if(num.slice(-1) == "5"){
            num += "6";
            num = parseFloat(num).toFixed(decimales + 1);
        }
        num = parseFloat(num).toFixed(decimales);
        return parseFloat(num);
    }
    static comparar(a: number, b: number, tolerancia: number = Number.EPSILON){
        return (Matematica.absoluto(a - b) < tolerancia) 
    }
    static multiplicacionSegura(numero1: number, numero2: number): number{
        if(3*(numero1.toString(10).length + numero2.toString(10).length) < (numero1*numero2).toString(10).length){
            return ((numero1*10)*(numero2*10))/100;
        }
        return numero1*numero2;
    }
    static divisionSegura(numero1: number, numero2: number): number{
        if(3*(numero1.toString(10).length + numero2.toString(10).length) < (numero1/numero2).toString(10).length){
            return (numero1*10) / (numero2*10)
            // return (Matematica.multiplicacionSegura(numero1, 10)/(Matematica.multiplicacionSegura(numero2, 10)));
        }
        return numero1/numero2;
    }
    static sumaSegura(numero1: number, numero2: number): number{
        if(3*(numero1.toString(10).length + numero2.toString(10).length) < (numero1 + numero2).toString(10).length){
            return ((numero1*10) + (numero2*10))/10;
        }
        return numero1 + numero2;
    }

    //Grados
    static gradoARadian(grado: number): number{
        return Matematica.multiplicacionSegura(Matematica.divisionSegura(grado, 180), this.PI);
        // return (grado / 180) * this.PI;
    }
    static radianAGrado(rad: number): number{
        return Matematica.multiplicacionSegura(Matematica.divisionSegura(rad, this.PI), 180);
        // return (rad / this.PI)*180;
    }
    static potencia(base: number, exponente: number){
        return base ** exponente;
    }
    static raiz(radicando: number, indice: number): number{
        return radicando **(1/indice);
    }

    //Pitagórica
    static hipotenusa(cateto1: number, cateto2: number): number{
        let hipotenusa: number = Matematica.raiz(cateto1**2 + cateto2**2, 2);
        return hipotenusa;
    }
    static cateto(hipotenusa: number, cateto: number){
        let cateto2: number = Matematica.raiz(hipotenusa**2 - cateto**2, 2);
        return cateto2;
    }
}
