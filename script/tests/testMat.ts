import { Matematica } from "../src/Utiles/Matematica.js";

console.log("======| TEST DEL MÓDULO MATEMATICA |======")
console.log("")

//Matematica.parteEntera(numero: number)
console.log("Matematica.parteEntera()")
console.assert(Matematica.parteEntera(1) == 1);
console.assert(Matematica.parteEntera(0) == 0);
console.assert(Matematica.parteEntera(0.15) == 0);
console.assert(Matematica.parteEntera(10.10) == 10);
console.assert(Matematica.parteEntera(10.9) == 10);
console.assert(Matematica.parteEntera(2.111111111) == 2);
console.assert(Matematica.parteEntera(255555.111111111) == 255555);
console.assert(Matematica.parteEntera(-2.111111111) == -2);
console.log("")

//Matematica.parteDecimal(numero: number)
console.log("Matematica.parteDecimal()")
console.assert(Matematica.parteDecimal(1) == 0);
console.assert(Matematica.parteDecimal(1.1) ==0.1);
console.assert(Matematica.parteDecimal(0.1) == 0.1);
console.assert(Matematica.parteDecimal(1.0001) == 0.0001);
console.assert(Matematica.parteDecimal(1.1000) == 0.1);
console.assert(Matematica.parteDecimal(-1.1000) == -0.1);
console.log("")

//Matematica.signo(numero: number)
console.log("Matematica.signo()")
console.log("")

//Matematica.truncar(numero: number, decimales: number)
console.log("Matematica.truncar()")
console.assert(Matematica.truncar(1, 0) == 1);
console.assert(Matematica.truncar(1.1, 0) == 1);
console.assert(Matematica.truncar(1.11, 1) == 1.1);
console.assert(Matematica.truncar(10.115, 2) == 10.11);
console.assert(Matematica.truncar(1.19, 1) == 1.1);
console.assert(Matematica.truncar(1.0001111, 4) == 1.0001);
console.assert(Matematica.truncar(1.0001000, 5) == 1.0001);
console.assert(Matematica.truncar(-1.0001000, 5) == -1.0001);
console.log("")

//Matematica.redondear(numero: number, decimales: number)
console.log("Matematica.redondear()")
console.assert(Matematica.redondear(1, 0) == 1);
console.assert(Matematica.redondear(1.1, 0) == 1);
console.assert(Matematica.redondear(1.5, 0) == 2);
console.assert(Matematica.redondear(1.04, 0) == 1);
console.assert(Matematica.redondear(1.05, 1) == 1.1);
console.assert(Matematica.redondear(1.05, 2) == 1.05);
console.assert(Matematica.redondear(1.051, 2) == 1.05);
console.assert(Matematica.redondear(1.055, 2) == 1.06);
console.assert(Matematica.redondear(1.04, 1) == 1.0);
console.assert(Matematica.redondear(-1.04, 1) == -1.0);
console.log("")

//Matematica.absoluto(numero: number)
console.log("Matematica.absoluto()")
console.assert(Matematica.absoluto(0) == 0);
console.assert(Matematica.absoluto(10) == 10);
console.assert(Matematica.absoluto(-10) == 10);
console.assert(Matematica.absoluto(-1.0) == 1);
console.assert(Matematica.absoluto(-1111.1111) == 1111.1111);
console.log("")

//Matematica.comparar(a: number, b: number, tolerancia: number = Number.EPSILON)
console.log("Matematica.comparar()")
console.assert(Matematica.comparar(4, 2*2) == true);
console.log("")

//Matematica.multiplicacionSegura(numero: number, numero: number)
console.log("Matematica.multiplicacionSegura()")
console.assert(Matematica.multiplicacionSegura(2, 2) == 4);
console.assert(Matematica.multiplicacionSegura(2, 2.2) == 4.4);
console.assert(Matematica.multiplicacionSegura(2, 2.222222222) == 4.444444444);
console.assert(Matematica.multiplicacionSegura(-2, 2) == -4);
console.assert(Matematica.multiplicacionSegura(0.2, 2) == 0.4);
console.assert(Matematica.multiplicacionSegura(222222222, 2) == 444444444);
console.assert(Matematica.multiplicacionSegura(99999999, 1) == 99999999);
console.assert(Matematica.multiplicacionSegura(0.99999999, 1) == 0.99999999);
console.log("")

//Matematica.divisionSegura(numero1: number, numero2: number): number
console.log("Matematica.divisionSegura()")
console.assert(Matematica.divisionSegura(4, 2) == 2)
console.log("")



//Matematica.sumaSegura(numero1: number, numero2: number): number
console.log("Matematica.sumaSegura()")
console.assert(Matematica.sumaSegura(2, 2) == 4)
console.assert(Matematica.sumaSegura(0.2, 0.2) == 0.4)
console.assert(Matematica.sumaSegura(0.02, 0.02) == 0.04)
console.assert(Matematica.sumaSegura(2, -2) == 0)
console.assert(Matematica.sumaSegura(9999, 2) == 10001)
console.assert(Matematica.sumaSegura(0, 0) == 0)
console.log("")
//Matematica.potencia(base: number, exponente: number)

//Matematica.raiz(radicando: number, indice: number): number


// //Matematica.gradoARadian(num)
// console.assert(Matematica.gradoARadian(0) == 0)
// console.assert(Matematica.gradoARadian(180) == Matematica.PI);
// console.assert(Matematica.gradoARadian(360) == Matematica.DOS_PI);

// //Matematica.radianAGrado(rad: number)
// console.assert(Matematica.radianAGrado(0) == 0)
// console.assert(Matematica.radianAGrado(Matematica.PI) == 180);
// console.assert(Matematica.radianAGrado(Matematica.DOS_PI) == 360);













//Matematica.raiz(numero, raiz) ****
// console.log(Matematica.raiz(25, 2))
console.log("=============| FIN DEL TEST |=============")