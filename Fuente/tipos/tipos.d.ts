// Interfaces de estructura

interface Punto {

    x: number,
    y: number,
    id?: number,
    contenido?: Forma
}

interface OpcionesForma {

    escala?: number;
    rotacion?: number;

}

interface OpcionesCuerpo extends OpcionesForma {

    /**Determina si el cuerpo rotará ajustándose al ángulo del vector velocidad.*/
    rotarSegunVelocidad?: boolean,
    /**Determina si el cuerpo permanecerá o no estático al colisionar con otro cuerpo.*/
    fijo?: boolean,
    /**El valor de la masa del cuerpo.*/
    masa?: number,
    /**El valor de la densidad del cuerpo.*/
    densidad?: number,
    /**Si el cuerpo se verá afectado por eventos de teclado o mouse.*/
    controlable?: boolean,

}

// Interfaces gráficas

interface OpcionesGraficasForma {

    /**Color de trazado de la forma.*/
    colorTrazo?: string,
    /**Color de relleno de la forma.*/
    colorRelleno?: string,
    /**Determina si la forma debe ser trazada.*/
    trazada?: boolean,
    /**Determina si la forma debe ser rellenada.*/
    rellenada?: boolean,
    /**Determina el ancho de la línea trazada.*/
    grosorTrazo?: number,
    /**Determina la opacidad con que es graficada la forma. */
    opacidad?: number,

}

interface OpcionesGraficasVector {
    /**Color del trazo del vecto.*/
    color: string,
    /**Ancho del trazo del vector en pixeles. */
    grosorTrazo: number,
}

interface OpcionesGraficasTexto {

    tamano?: number,
    /**Opciones: 'center', 'end', 'left', 'right', 'start' */
    alineacion?: CanvasTextAlign,
    fuente?: string,
    /**Valor de opacidad, entre 0 y 1.*/
    opacidad?: number,
    color?: string,

}

// Interfaces de evento

interface OpcionesControlesCuerpo {

    arriba: boolean,
    abajo: boolean,
    izquierda: boolean,
    derecha: boolean,
    rotarIzquierda: boolean,
    rotarDerecha: boolean,
    rapidez: number,
    anguloRotacion: number

}