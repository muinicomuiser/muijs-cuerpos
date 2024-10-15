import { Vector } from "../../Fuente/mui.js";

for (let i: number = 0; i < 100; i++) {
    const vectorAleatorio: Vector = Vector.aleatorio(5)
    console.log(vectorAleatorio.x, vectorAleatorio.y);

}
