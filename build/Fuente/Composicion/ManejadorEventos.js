//Tengo que integrar un modo de recibir eventos de hardware
export class ManejadorEventos {
    /**Agrega un eventListener para eventos de teclado. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
    static eventoTeclado(tipoEvento, tecla, manejarEvento, parametro) {
        document.addEventListener(tipoEvento, (evento) => {
            if (evento.key == CODIGOSTECLA[tecla]) {
                manejarEvento(parametro);
            }
        });
    }
    /**Agrega un eventListener para eventos de teclado tipo keyup. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
    static eventoKeyup(tecla, manejarEvento, parametro) {
        ManejadorEventos.eventoTeclado('keyup', tecla, manejarEvento, parametro);
    }
    /**Agrega un eventListener para eventos de teclado tipo keydown. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
    static eventoKeydown(tecla, manejarEvento, parametro) {
        ManejadorEventos.eventoTeclado('keydown', tecla, manejarEvento, parametro);
    }
    /**Agrega un eventListener para eventos de teclado tipo keypress. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
    static eventoKeypress(tecla, manejarEvento, parametro) {
        ManejadorEventos.eventoTeclado('keypress', tecla, manejarEvento, parametro);
    }
    /**Agrega un eventListener para eventos de mouse y para trabajar con las propiedades del evento.
     * Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
    static eventoMouseEnCanvas(tipoEvento, canvas, manejarEvento, parametro) {
        canvas.addEventListener(tipoEvento, (evento) => {
            if (parametro != undefined) {
                manejarEvento(evento, parametro);
            }
            else {
                manejarEvento(evento, undefined);
            }
        });
    }
    /**Agrega un eventListener para detectar cambios en el mouse, mas no trabaja con el evento.
     * Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
    static mouseEnCanvas(tipoEvento, canvas, manejarEvento, parametro) {
        canvas.addEventListener(tipoEvento, () => {
            if (parametro != undefined) {
                manejarEvento(parametro);
            }
            else {
                manejarEvento(undefined);
            }
        });
    }
    /**Previene que se activen acciones por defecto al presionar la tecla definida. */
    static anularAccionPorDefecto(tecla) {
        document.addEventListener('keydown', (event) => {
            if (event.key == CODIGOSTECLA[tecla]) {
                event.preventDefault();
            }
        });
    }
}
/**Constante que almacena los códigos de eventos de teclado.*/
const CODIGOSTECLA = {
    espacio: " ",
    enter: 'Enter',
    arriba: 'ArrowUp',
    abajo: 'ArrowDown',
    izquierda: 'ArrowLeft',
    derecha: 'ArrowRight',
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd',
    e: 'e',
    f: 'f',
    g: 'g',
    h: 'h',
    i: 'i',
    j: 'j',
    k: 'k',
    l: 'l',
    m: 'm',
    n: 'n',
    ñ: 'ñ',
    o: 'o',
    p: 'p',
    q: 'q',
    r: 'r',
    s: 's',
    t: 't',
    u: 'u',
    v: 'v',
    w: 'w',
    x: 'x',
    y: 'y',
    z: 'z',
    mas: '+',
    menos: '-',
};
