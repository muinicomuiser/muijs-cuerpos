/**
 * MÓDULO MATEMÁTICO EN ESPAÑOL
 * 
 * Por agregar: floor, ceil, logaritmo, trigonometrías, exp, raizcuadrada, cuadrado, cubo, max, min, promedio.
 * POR CORREGIR: Reemplazar multiplicaciones por multiplicacion, y las sumas también.
 */
export class Matematica{
    
    static aleatorio(min:number, max: number): number{
        let rango: number = max - min;
        return (Math.random()*rango) + min; 
    }
    //PROBAR
    static aleatorioEntero(min:number, max: number): number{
        let rango: number = 1 +  max - min;
        return Math.trunc((Math.random()*rango) + min); 
    }
}
