import { Matematica } from "../Fuente/Utiles/Matematica.js";
import { Matriz } from "../Fuente/Utiles/Matrices.js";
import { Vector } from "../Fuente/GeometriaPlana/Vector.js";
import { Geometria } from "../Fuente/Utiles/Geometria.js";
//Módulo Matemática, Aritmética

/**Medidor de velocidad de cálculo*/
function contador(): void{
    let tiempoInicio: number = Date.now();
    let tiempoFinal: number = Date.now();
    console.log((`${tiempoFinal - tiempoInicio}` + " milisegundos"));
}


function aritmetica(): void{
    console.log(Matematica.redondear(Matematica.PI, 3));
    console.log(Matematica.parteDecimal(Matematica.PI));
    console.log(Geometria.radianAGrado(3.1415));
    console.log(Geometria.gradoARadian(180));
    console.log(Matematica.absoluto(0));
    console.log(Matematica.potencia(20, 3));
    console.log(Matematica.raiz(25, 2));
}
// aritmetica();
// console.log(0.1 + 0.2);
// console.log(Matematica.comparar(Matematica.absoluto(-0.3), 0.1 + 0.2));
// console.log(Number.MAX_SAFE_INTEGER);


//Módulo Matematica, Constantes
function matematicaConstantes(): void{
    console.log("Módulo Matemática, constantes:");
    console.log("PI: ", Matematica.PI);
    console.log("DOS_PI: ", Matematica.DOS_PI);
    console.log("PHI: ", Matematica.PHI);
    console.log("Math.PI: ", Math.PI);
}
// matematicaConstantes();


//Módulo Matrices
function matrices(): void{
    let A3X3: number[][] = [[0.2, 2, 3],[4, 5, 6],[7, 8, 9]];
    let B3X3: number[][] = [[0.1, 2, 2],[3, 3, 3],[4, 4, 4]];
    let C2X3: number[][] = [[1, 2, 3],[4, 5, 6]];
    let D3X2: number[][] = [[1, 2],[3, 4], [5, 6]];
    console.log("Módulo Matrices");
    console.log("Matriz nula 3x3: ", Matriz.nula(3, 3));
    console.log("Matriz identidad 3x3: ", Matriz.identidad(3));
    console.log("Matriz escalar 3x3, escalar = 4: ", Matriz.escalar(3, 0.4));
    console.log("Matriz traspuesta 3x3 de [[1, 2, 3],[4, 5, 6,],[7, 8, 9]]: ", Matriz.traspuesta(A3X3));
    console.log("Matriz traspuesta 3x2 de [[1, 2, 3],[4, 5, 6,]]: ", Matriz.traspuesta([[1, 2, 3],[4, 5, 6,]]));
    console.log("Matriz traspuesta 2x3 de [[1, 4], [2, 5], [3, 6]]: ", Matriz.traspuesta([[1, 4], [2, 5], [3, 6]]));
    console.log("Suma de las matrices [[1, 2],[3, 4]] y [[5, 6], [7, 8]]: ", Matriz.suma([[1, 2],[3, 4]], [[5, 6], [7, 8]]));
    console.log(`Suma de las matrices`, A3X3, "y", B3X3,": ", Matriz.suma(A3X3, B3X3));
    console.log(`Resta de las matrices`, A3X3, "y", B3X3,": ", Matriz.resta(A3X3, B3X3));
    console.log("Matriz 3x3 ", A3X3, " multiplicada por 4: ", Matriz.productoEscalar(A3X3, 0.4));
    console.log((((3*10)*(0.4*10))/100).toString(10))
    console.log((3*0.4).toString(10))
    console.log(Matematica.multiplicacion(0.1, 0.2))
    console.log(Matematica.suma(0.01, 0.02))
    console.log((0.1 * 0.2))
    console.log("Dimensiones: ", A3X3, " == ", C2X3, ": ", Matriz.compararDimension(A3X3, C2X3));
    console.log("Dimensiones: ", A3X3, " == ", B3X3, ": ", Matriz.compararDimension(A3X3, B3X3));
    console.log("Poroducto entre ", C2X3, " y ", D3X2, ": ", Matriz.productoMatriz(C2X3, D3X2))
    console.log("Poroducto entre ", D3X2, " y ", C2X3, ": ", Matriz.productoMatriz(D3X2, C2X3))
}
// matrices();
// console.log(Matriz.productoMatriz(Matriz.identidad(2), [[2, 2], [3, 2]]));
// console.log(Matriz.productoMatriz([[0, 1],[1, 0]], [[4],[3]]));
// console.log(Matriz.nula([[1, 0],[0, 1]].length, [[2],[3]][0].length));
// console.log(Matriz.identidad(2));
// console.log(Matriz.nula(2, 1))
// console.log("Matriz traspuesta 3x2 de [[1, 2, 3],[4, 5, 6,]]: ", Matriz.traspuesta([[1, 2, 3],[4, 5, 6,]]));
// console.log("Matriz traspuesta 2x3 de [[1, 4], [2, 5], [3, 6]]: ", Matriz.traspuesta([[1, 4], [2, 5], [3, 6]]));

//VECTORES
function vectores(): void{
    let vectorTres: Vector = Vector.segunPuntos({x:2, y:2}, {x: 4, y: 4});
    console.log(vectorTres)
    console.log(Geometria.radianAGrado(vectorTres.angulo))
    // console.log("VectorUno")
    // console.log(vectorUno);
    // vectorUno.y = 10;
    // console.log(vectorUno);
    // console.log("VectorDos")
    // console.log(vectorDos);
// vectorDos.angulo = 0.7;
// console.log(vectorDos);
// console.log(vectorUno.escalar(5));

}
// vectores();
// console.log(Matriz.rotarPunto2D(Vector.crear(0, 0), 2))
// let vectorUno: Vector = Vector.crear(1, 1);
// let poligonoUno = Forma.poligono(300, 300, 10, 80);
// console.log(poligonoUno)
// console.log(poligonoUno.centro);
// poligonoUno.rotarSegunCentro(Matematica.gradoARadian(2));

function generarAleatorio(){
    let aleatorio: number = 0;
    for(let i: number = 0; i < 10000; i++){
        let unidades: number = 1234567890;
        let numero: number = Matematica.division(Date.now() % 100, 100);
        numero = Matematica.multiplicacion(numero, Matematica.PI);
        let selector: number = (Date.now() % 10) + 1;
        unidades = unidades / (10**(selector+1));
        aleatorio += numero * unidades;
    } 
    aleatorio = Matematica.parteDecimal(aleatorio);
    console.log(aleatorio)   
    console.log(Date.now())
}

    
/**Me gusta cómo quedó esta prueba */
function pruebaAleatorioEnteroRango(){
    let repeticiones: number = 500;
    let resultados: number[] = [];
    let min: number = -2;
    let max: number = 50;
    let a: number = 0;
    let b: number = 0;
    let c: number = 0;
    let d: number = 0;
    console.log("Inicio. Número de cálculos: ", repeticiones)
    let inicioTiempo: number = Date.now()
    for(let i: number = 0; i < repeticiones; i++){
        let aleatorio: number = Matematica.aleatorioEntero(min, max);
        if(aleatorio == min){
            a++
        }
        if(aleatorio == min+1){
            b++
        }
        if(aleatorio == max-1){
            c++
        }
        if(aleatorio == max){
            d++
        }
        resultados.push(aleatorio)
        if(aleatorio == min-1 || aleatorio == max+1){
            console.log(aleatorio)
        }
    }
    console.log(`${Date.now() - inicioTiempo}` + " milisegundos")
    console.log(`${min}:`, a, `${min+1}:`, b, `${max-1}:`, c,  `${max}:`, d)
    console.log(resultados)
}
// pruebaAleatorioEnteroRango()


function pruebaAleatorioRango(){
    let repeticiones: number = 500;
    let resultados: number[] = [];
    let min: number = -10;
    let max: number = 20;
    let a: number = 0;
    let b: number = 0;
    console.log("Inicio. Número de cálculos: ", repeticiones)
    let inicioTiempo: number = Date.now()
    for(let i: number = 0; i < repeticiones; i++){
        let aleatorio: number = Matematica.aleatorio(min, max);
        if(aleatorio < min){
            a++
        }

        if(aleatorio > max){
            b++
        }
        resultados.push(aleatorio)
    }
    console.log(`${Date.now() - inicioTiempo}` + " milisegundos")
    console.log("Mínimo: ", min, "Máximo: ", max)
    console.log(`Menos que ${min}:`, a)
    console.log(`Más que ${max}:`, b)
    console.log(resultados)
}
// pruebaAleatorioRango()


/**Revisar la velocidad de cálculo del método Matematica.multiplicación.        
 * Lo compara con el operador *.
 */
function probarMultiplicacion(){
    // let inicio: number = 1;
    let repeticiones: number = 1000000;
    let inicio: number = 1001
    let multiplicador: number = 12033444.1;
    let resultadosMetodo: number[] = [];
    let resultadosJS: number[] = [];
    console.log("Inicio. Número de cálculos: ", repeticiones);
    let inicioTiempo: number = Date.now();
    for(let i: number = inicio; i < repeticiones; i++){
        resultadosMetodo.push(Matematica.multiplicacion(multiplicador, i));
        // if(i > 2 && !Matematica.comparar(resultadosMetodo[resultadosMetodo.length - 1 ], resultadosMetodo[resultadosMetodo.length - 2 ] + 10.0000001, 0.00000001)){
        //     (console.log("salto", resultadosMetodo[resultadosMetodo.length - 1 ], resultadosMetodo[resultadosMetodo.length - 2 ]))
        // }    
    }
    console.log(resultadosMetodo) 
    console.log("Fin método Matematica.multiplicacion()")
    let tiempoMetodo: number = Date.now();
    console.log((`${tiempoMetodo - inicioTiempo}` + " milisegundos"));
    console.log("Inicio operador *")
    for(let i: number = inicio; i < repeticiones; i++){
        resultadosJS.push(multiplicador * i);
    }
    console.log(resultadosJS) 
    console.log("Fin operador *")
    console.log(`${Date.now() - tiempoMetodo}` + " milisegundos");   
}
// probarMultiplicacion();

function probarDivision(){
    // let inicio: number = 1;
    let repeticiones: number = 3333;
    let inicio: number = 33
    let divisor: number = 0.1;
    let resultadosMetodo: number[] = [];
    let resultadosJS: number[] = [];
    console.log("Inicio. Número de cálculos: ", repeticiones);
    let inicioTiempo: number = Date.now();
    for(let i: number = inicio; i < repeticiones; i = Matematica.suma(i, 0.3)){
        resultadosMetodo.push(i);
        resultadosMetodo.push(Matematica.division(i, divisor));
    }
    console.log(resultadosMetodo) 
    console.log("Fin método Matematica.division()")
    let tiempoMetodo: number = Date.now();
    console.log((`${tiempoMetodo - inicioTiempo}` + " milisegundos"));
    console.log("Inicio operador *")
    for(let i: number = inicio; i < repeticiones; i = Matematica.suma(i, 0.3)){
        resultadosJS.push((i) / divisor);
    }
    console.log(resultadosJS) 
    console.log("Fin operador /")
    console.log(`${Date.now() - tiempoMetodo}` + " milisegundos");   
}
// probarDivision();

function probarVectorNormal(): void{
    let vectorUno: Vector = Vector.crear(1, 3);
    let vectorDos: Vector = Vector.crear(3, 1);
    let vectorEje: Vector = Vector.crear(2, 2);
    let proyeccionUno: number = Vector.proyeccion(vectorUno, vectorEje)
    let proyeccionDos: number = Vector.proyeccion(vectorDos, vectorEje)
    console.log(proyeccionUno)
    console.log(proyeccionDos)
}
probarVectorNormal();