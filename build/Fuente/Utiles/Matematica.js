/**
 * MÓDULO MATEMÁTICO EN ESPAÑOL
 * Reducido. Contiene solo funciones útiles de números aleatorios.
 */
export class Matematica {
    /**Retorna un número aleatorio entre dos números.*/
    static aleatorio(min, max) {
        let rango = max - min;
        return (Math.random() * rango) + min;
    }
    /**Retorna un número aleatorio entero entre dos números, ambos incluídos.*/
    static aleatorioEntero(min, max) {
        let rango = 1 + max - min;
        return Math.trunc((Math.random() * rango) + min);
    }
}
