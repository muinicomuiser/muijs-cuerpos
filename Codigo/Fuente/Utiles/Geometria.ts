import { Matematica } from "./Matematica.js";
import { Punto } from "../GeometriaPlana/Punto.js";

export class Geometria{
    
    //GRADOS  
    /**Transforma grados sexagesimales a radianes.*/      
    static gradoARadian(grado: number): number{
        // return Matematica.multiplicacion(Matematica.division(grado, 180), Matematica.PI);
        return (grado / 180) * Matematica.PI;
    }


    /**Transfoma radianes a grados sexagesimales.*/
    static radianAGrado(rad: number): number{
        // return Matematica.multiplicacion(Matematica.division(rad, Matematica.PI), 180);
        return (rad / Matematica.PI)*180;
    }


    //PITAGÓRICA
    /**Retorna la longitud de la hipotenusa según la longitud de los dos catetos ingresados.*/
    static hipotenusa(cateto1: number, cateto2: number): number{
        // let hipotenusa: number = Matematica.raiz(Matematica.suma(cateto1**2, cateto2**2), 2);
        // return hipotenusa;
        return (cateto1**2 + cateto2**2)**(1/2)
    }


    /**Retorna la longitud de un cateto según la longitud de la hipotenusa y del otro cateto.*/
    static cateto(hipotenusa: number, cateto: number){
        // let cateto2: number = Matematica.raiz(Matematica.suma(hipotenusa**2, -(cateto**2)), 2);
        // return cateto2;
        return (hipotenusa**2 - cateto**2)**(1/2);
    }


    //COORDENADAS
    /**Retorna el valor de la distancia entre dos puntos de un plano cartesiano.*/
    static distanciaEntrePuntos(puntoUno: Punto, puntoDos: Punto): number{
        // let distanciaX: number = Matematica.suma(puntoDos.x, -puntoUno.x)
        // let distanciaY: number = Matematica.suma(puntoDos.y, -puntoUno.y)
        // let distancia = Matematica.hipotenusa(distanciaX, distanciaY);
        // return distancia;
        return this.hipotenusa(puntoDos.x -puntoUno.x, puntoDos.y -puntoUno.y);
    }


    /**Retorna el punto medio entre dos puntos de un plano cartesiano.*/
    static puntoMedio(puntoUno: Punto, puntoDos: Punto): Punto{
        // let medioX: number = Matematica.suma(Matematica.division(puntoUno.x, 2), Matematica.division(puntoDos.x, 2));
        // let medioY: number = Matematica.suma(Matematica.division(puntoUno.y, 2), Matematica.division(puntoDos.y, 2));
        // let puntoMedio: Punto = {x: medioX, y: medioY};
        // return puntoMedio;
        return {x: (puntoUno.x / 2 + puntoDos.x / 2), y:  (puntoUno.y / 2, + puntoDos.y / 2)}
    }
}