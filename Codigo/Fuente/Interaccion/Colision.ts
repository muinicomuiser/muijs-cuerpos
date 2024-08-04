//Una clase que se encarga de calcular las colisiones entre cuerpos.
//Debería tener una función de entrada con dos parámetros, que serían los cuerpos a comparar
//y dentro de la función, un separador según las identidades de cada cuerpo,
//y si son fijos o móviles.
//Métodos particulares para determinar colisiones entre circunferencias, entre polígonos, mixtos, y quizá con rectas.
//También con fronteras.

import { Forma } from "../GeometriaPlana/Formas.js";
import { Matematica } from "../Utiles/Matematica.js";

export class Colision{

    /**Detecta la intersección entre dos circunferencias.             
     * Retorna true si hay intersección.        
     * Retorna false si no hay intersección.        
     * Compara la distancia entre ambos centros con la suma de sus radios.
     */
    static circunferencias(circunferenciaUno: Forma, circunferenciaDos: Forma){
        let sumaRadios: number = circunferenciaUno.radio + circunferenciaDos.radio;
        let distanciaCentros: number = Matematica.distanciaEntrePuntos(circunferenciaUno.posicion, circunferenciaDos.posicion);
        if( distanciaCentros <= sumaRadios){
            return true
        }
        return false;
    }
}