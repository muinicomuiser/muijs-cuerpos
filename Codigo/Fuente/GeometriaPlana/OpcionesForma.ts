
export interface OpcionesForma {

    /**Color de trazado de la forma.*/
    colorTrazo?: string,
    /**Color de relleno de la forma.*/
    colorRelleno?: string,
    /**Escala de la forma. Por defecto: 1.*/
    escala?: number,
    /**Ángulo de rotación inicial de la forma. Por defecto: 0.*/
    rotacion?: number,
    /**Determina si la forma debe ser trazada.*/
    trazada?: boolean,
    /**Determina si la forma debe ser rellenada.*/
    rellenada?: boolean,
    /**Determina el ancho de la línea trazada.*/
    grosorTrazo?: number,
}