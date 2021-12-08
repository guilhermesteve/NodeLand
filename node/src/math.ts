function somar(x: number, y:number): number {
    return x + y;
}

function subtrair(x : number, y : number): number {
    return x - y;
}

function multiplicar(x: number, y: number): number {
    return x * y;
}

module.exports.somar = somar;
module.exports.subtrair = subtrair;
module.exports.multiplicar = multiplicar;