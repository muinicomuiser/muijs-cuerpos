//Tengo que integrar un modo de recibir eventos de hardware

export class ManejadorEventos {

    /**Agrega un eventListener para eventos de teclado. Recibe una función callback y opcinalmente un parámetro si la función lo requiere.*/
    static eventoTeclado<Type = void>(tipoEvento: EventoTeclado, codigoTeclado: CodigoTeclado, manejarEvento: (param: Type) => void, parametro?: Type) {
        document.addEventListener<EventoTeclado>(tipoEvento, (evento) => {
            // const mismoType: TypeEquality<CodigoTeclado, typeof evento.code> = true;
            if (evento.code == codigoTeclado) {
                manejarEvento(parametro!)
            }
        })
    }
}


const CODIGOSTECLADO = {
    space: 'Space',
    enter: 'Enter',
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    a: 'KeyA',
    b: 'KeyB',
    c: 'KeyC',
    d: 'KeyD',
    e: 'KeyE',
    f: 'KeyF',
    g: 'KeyG',
    h: 'KeyH',
    i: 'KeyI',
    j: 'KeyJ',
    k: 'KeyK',
    l: 'KeyL',
    m: 'KeyM',
    n: 'KeyN',
    ñ: 'KeyÑ',
    o: 'KeyO',
    p: 'KeyP',
    q: 'KeyQ',
    r: 'KeyR',
    s: 'KeyS',
    t: 'KeyT',
    u: 'KeyU',
    v: 'KeyV',
    w: 'KeyW',
    x: 'KeyX',
    y: 'KeyY',
    z: 'KeyZ',

} as const;
type CodigoTeclado = (typeof CODIGOSTECLADO)[keyof typeof CODIGOSTECLADO]
type EventoTeclado = keyof Pick<WindowEventMap, 'keydown' | 'keypress' | 'keyup'>;
// type TypeEquality<T, U> = keyof T extends keyof U ? (keyof U extends keyof T ? true : false) : false;