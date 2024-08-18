export class Geometria {
    /**Retorna el doble del valor de PI.*/
    static get DOS_PI() {
        return Math.PI * 2;
    }
    /**Retorna la mitad del valor de PI.*/
    static get PI_MEDIO() {
        return Math.PI / 2;
    }
    //GRADOS  
    /**Transforma grados sexagesimales a radianes.*/
    static gradoARadian(grado) {
        return (grado / 180) * Math.PI;
    }
    /**Transfoma radianes a grados sexagesimales.*/
    static radianAGrado(rad) {
        return (rad / Math.PI) * 180;
    }
    //PITAGÓRICA
    /**Retorna la longitud de la hipotenusa según la longitud de los dos catetos ingresados.*/
    static hipotenusa(cateto1, cateto2) {
        return (cateto1 ** 2 + cateto2 ** 2) ** (1 / 2);
    }
    /**Retorna la longitud de un cateto según la longitud de la hipotenusa y del otro cateto.*/
    static cateto(hipotenusa, cateto) {
        return (hipotenusa ** 2 - cateto ** 2) ** (1 / 2);
    }
    //COORDENADAS
    /**Retorna el valor de la distancia entre dos puntos de un plano cartesiano.*/
    static distanciaEntrePuntos(puntoUno, puntoDos) {
        return this.hipotenusa(puntoDos.x - puntoUno.x, puntoDos.y - puntoUno.y);
    }
    /**Retorna el punto medio entre dos puntos de un plano cartesiano.*/
    static puntoMedio(puntoUno, puntoDos) {
        return { x: (puntoUno.x / 2 + puntoDos.x / 2), y: (puntoUno.y / 2, +puntoDos.y / 2) };
    }
}
