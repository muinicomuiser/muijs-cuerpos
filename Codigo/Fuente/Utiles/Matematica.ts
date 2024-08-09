/**
 * MÓDULO MATEMÁTICO EN ESPAÑOL
 * 
 * Por agregar: floor, ceil, logaritmo, trigonometrías, exp, raizcuadrada, cuadrado, cubo, max, min, promedio.
 * POR CORREGIR: Reemplazar multiplicaciones por multiplicacion, y las sumas también.
 */
export class Matematica{
    
    //CONSTANTES
    /**Retorna el valor de PI usando quince decimales.*/
    static get PI(): number{
        return 3.141592653589793;
    }
    
    
    /**Retorna el doble del valor de PI usando quince decimales.*/
    static get DOS_PI(): number{
        return 6.283185307179586;
    }


    /**Retorna la mitad del valor de PI usando quince decimales.*/
    static get PI_MEDIO(): number{
        return 1.570796326794896;
    }
    
    
    /**Retorna el valor de PHI (número áureo) usando quince decimales*/
    static get PHI(): number{
        return 1.618033988749895;
    }


    /**Retorna el valor del número e usando quince decimales.*/
    static get e(): number{
        return 2.718281828459045;
    }


    /**Retorna la parte entera de cualquier número real.
     * 
     *ANOTACIÓN:
     *Para cualquier número con más de 15 decimales que podría ser aproximado al número superior, javascript
     *lo aproximará automáticamente. Pueden ocurrir cosas raras con más de 15 decimales.
    */
    static parteEntera(numero: number): number{
        let numString: string = numero.toPrecision(15);
        numString = numString.split('.')[0];
        return parseFloat(numString)
        //Checkeado
        //ANOTACIÓN
        //Para cualquier número con más de 15 decimales que podría ser aproximado al número superior, typescript
        //lo aproximará automáticamente.
    }
    
    
    /**Retorna la parte decimal de cualquier número real.*/
    static parteDecimal(numero: number): number{
        let num: string = numero.toPrecision(15);
        if(num.split(".")[1]){
            let decimales: number = parseFloat("0." + num.split(".")[1])
            if(numero < 0){
                return -decimales;
            }
            return decimales;
        }
        return 0;
        //Checkeado
    }
    

    /**Retorna un número aleatorio dentro del rango ingresado.*/
    static aleatorio(min: number, max: number): number{
        let aleatorio: number = 0;
        for(let i: number = 0; i < 111; i++){
            let unidades: number = 7538694219;
            let fecha: number = (new Date()).getMilliseconds();
            fecha = (fecha % 10) + (fecha% 100 - (fecha % 10))/10 + (fecha % 1000 - (fecha % 100) - (fecha % 10)) / 100
            let numero: number = fecha;
            numero = Matematica.multiplicacion(numero, Matematica.PI);
            let selector: number = Matematica.suma((fecha % 10), 1);
            unidades = Matematica.division(unidades, (10**(selector)));
            aleatorio = Matematica.suma(aleatorio, Matematica.multiplicacion(numero, unidades));
            aleatorio = aleatorio % 1;
        } 
        let rango: number;;
        if(min < 0){
            rango = Matematica.suma(max, -min);
        }
        else if(min > 0){
            rango = Matematica.suma(max, -min);
        }        
        else if(min == 0){
            rango = max;
        }
        aleatorio = Matematica.multiplicacion(aleatorio, rango!);
        return Matematica.suma(aleatorio, min);
    }


    /**Retorna un número entero aleatorio dentro del rango ingresado.*/
    static aleatorioEntero(min: number, max: number): number{
        let aleatorio: number = 0;
        for(let i: number = 0; i < 111; i++){
            let unidades: number = 7538694219;
            let fecha: number = (new Date()).getMilliseconds();
            fecha = (fecha % 10) + (fecha% 100 - (fecha % 10))/10 + (fecha % 1000 - (fecha % 100) - (fecha % 10)) / 100
            let numero: number = fecha;
            numero = Matematica.multiplicacion(numero, Matematica.PI);
            let selector: number = Matematica.suma((fecha % 10), 1);
            unidades = Matematica.division(unidades, (10**(selector)));
            aleatorio = Matematica.suma(aleatorio, Matematica.multiplicacion(numero, unidades));
            aleatorio = aleatorio % 1;
        } 
        let rango: number;
        if(min < 0){
            rango = Matematica.suma(max + 1, -min);
        }
        else if(min > 0){
            rango  = Matematica.suma(max + 1, -min);
        }        
        else if(min == 0){
            rango = max +2;
        }
        aleatorio = Matematica.multiplicacion(aleatorio, rango!);
        aleatorio = Matematica.suma(aleatorio, -(aleatorio % 1))
        aleatorio =  Matematica.suma(aleatorio, min);
        if(Number.isInteger(aleatorio)){
            if(aleatorio > max){
                aleatorio -= 1;
            }
            return aleatorio;
        }
        if(aleatorio < min){
            aleatorio += 1;
        }
        if(aleatorio > max){
            aleatorio -= 1;
        }
        return Matematica.parteEntera(Matematica.suma(aleatorio, min))
    }


    /**Retorna 1 si el número es positivo, -1 si es negativo y 0 cuando el número es 0.*/
    static signo(numero: number): number{
        let signo: number;
        if(numero == 0){
            return 0;
        }
        return signo = numero > 0 ? 1 : -1;
    }


    /**Retorna la copia de un número con la cantidad de decimales especificada.
     * Solo acepta números entre 0 y 100.
    */
    static truncar(numero: number, decimales: number):number{
        if(decimales < 0){
            throw new Error("El método .truncar solo acepta números entre 0 y 100")
        }
        // let dec: number = Matematica.parteEntera(decimales);
        let dec: number = Matematica.suma(decimales, -Matematica.parteDecimal(decimales));
        let numString: string = numero.toFixed(dec + 1);
        let num: number = parseFloat(numString.slice(0, -1));
        return num;
    }


    /**Retorna un número truncado según la cantidad de decimales especificada, con la última cifra redondeada.*/
    static redondear(numero: number, decimales: number): number{
        let num: string = numero.toFixed(decimales + 1);
    
        if(num.slice(-1) == "5"){
            num += "6";
            num = parseFloat(num).toFixed(decimales + 1);
        }
        num = parseFloat(num).toFixed(decimales);
        return parseFloat(num);
    }

    
    /**Retorna el valor absoluto de cualquier número real.*/
    static absoluto(numero: number): number{
        if(numero < 0){
            return -numero;
        }
        return numero;
    }


    /**Retorna true o false dependiendo de si los números ingresados son iguales o no.
     * Permite definir el nivel de tolerancia de comparación. Si no se define, se usa por
     * defecto el rango de Number.EPSILON (2.220446049250313e-16)
    */
    static comparar(a: number, b: number, tolerancia: number = Number.EPSILON){
        return (Matematica.absoluto(Matematica.suma(a, -b)) < tolerancia) 
    }


    /**Multiplica dos números. Evita varios comportamientos erráticos de javascript al multiplicar ciertos números, 
     * como el caso típico 0.1 * 0.2 = 0.020000000000000004;
    */
    static multiplicacion(numero1: number, numero2: number): number{
        if(numero1 == 0 || numero2 == 0){
            return 0;
        }
        if(Number.isInteger(numero1) && Number.isInteger(numero2)){
            return numero1 * numero2;
        }      
        else if(Number.isInteger(numero2)){
            let i: number = 1;
            while(!Number.isInteger(numero1 * (10**i)) && i <= 16){
                i++;
            }
            return ((numero1 * (10**i)) * numero2) / (10**i)
        }
        else if(Number.isInteger(numero1)){
            let i: number = 1;
            while(!Number.isInteger(numero2 * (10**i)) && i <= 16){
                i++;
            }
            return ((numero2 * (10**i)) * numero1) / (10**i)
        }
        else{
            let i: number = 1;
            while(!Number.isInteger(numero1 * (10**i)) && i <= 16){
                i++;
            }
            let j: number = 1;
            while(!Number.isInteger(numero2 * (10**j)) && j <= 16){
                j++;
            }
            return ((numero1 * (10**i)) * (numero2 * (10**j))) / (10**(i+j)) 
        }
    }


    /**Divide dos números. Evita varios comportamientos erráticos de javascript al dividir ciertos números, 
     * como el caso típico 0.02 / 0.1 = 0.19999999999999998;
    */
    static division(numero1: number, numero2: number): number{
        if(numero1 == 0){
            return 0;
        }
        else if(numero2 == 0){
            throw new Error("El método .division no admite divisiones por cero");
        }
        if(Number.isInteger(numero1) && Number.isInteger(numero2)){
            return numero1 / numero2;
        }     
        else if(Number.isInteger(numero1)){
            let i: number = 1;
            while(!Number.isInteger(numero2 * (10**i)) && i < 16){
                i++;
            }
            return (numero1 * (10**i)) / (numero2 * (10**i))
        }
        else if(Number.isInteger(numero2)){
            let i: number = 1;
            numero1 *= 10;
            numero2 *= 10;
            while(!Number.isInteger(numero1) && i <= 16){
                i++;
                numero1 *= 10;
                numero2 *= 10;
            }
            return (numero1 ) / (numero2)
        }
        else{
            let i: number = 1;
            while(!Number.isInteger(numero1 * (10**i)) && i < 16){
                i++;
            }
            while(!Number.isInteger(numero2 * (10**i)) && i < 16){
                i++;
            }
            return (numero1 * (10**i)) / (numero2 * (10**i)) 
        }
    }


    /**Suma dos números. Evita comportamientos erráticos de javascript al sumar ciertos números, 
     * como el caso típico 0.1 + 0.2 = 0.30000000000000004;
    */
    static suma(numero1: number, numero2: number): number{
        if(Number.isInteger(numero1) && Number.isInteger(numero2)){
            return numero1 + numero2;
        }      
        else if(Number.isInteger(numero2)){
            let i: number = 1;
            while(!Number.isInteger(numero1 * (10**i)) && i <= 16){
                i++;
            }
            return ((numero1 * (10**i)) + numero2 * (10**i)) / (10**i)
        }
        else if(Number.isInteger(numero1)){
            let i: number = 1;
            while(!Number.isInteger(numero2 * (10**i)) && i <= 16){
                i++;
            }
            return ((numero1 * (10**i)) + numero2 * (10**i)) / (10**i)
        }
        else{
            let i: number = 1;
            while(!Number.isInteger(numero1 * (10**i)) && i < 16){
                i++;
            }
            while(!Number.isInteger(numero2 * (10**i)) && i < 16){
                i++;
            }
            return ((numero1 * (10**i)) + (numero2 * (10**i))) / (10**i)
        }
    }


    /**Retorna el resultado de elevar la base ingresada al exponente ingresado.*/
    static potencia(base: number, exponente: number){
        return base ** exponente;
    }


    /**Retorna la raíz enésima de un número. Solo trabaja con números reales.*/
    static raiz(radicando: number, indice: number): number{
        if(radicando < 0 && indice % 2 == 0){
            throw new Error("El método .raiz solo trabaja con números reales. No responde a la raíz par de un número negativo.")
        }
        if(indice == 0){
            throw new Error("El método .raiz no contempla el uso de un índice igual a cero en una raíz.")
        }
        if(radicando == 0){
            return 0;
        }
        return radicando ** Matematica.division(1, indice);
    }

}
