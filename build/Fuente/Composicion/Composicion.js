//Junta los cuerpos, interacciones, entorno, casos límite y renderizado.
//Debería estar acá la creación de canvas y contexto??
export class Composicion {
    static actualizarMovimientoCuerpos(cuerpos) {
        cuerpos.forEach((cuerpo) => cuerpo.mover());
        return cuerpos;
    }
}
