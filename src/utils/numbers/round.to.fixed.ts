export function roundToFixed(number: number) {
  if (number === 0) return "0";

  // Para números menores que 1, manter as duas primeiras casas decimais significativas
  if (Math.abs(number) < 1) {
    const str = number.toPrecision(2);
    return parseFloat(str).toString();
  }

  // Para números maiores ou iguais a 1, manter duas casas decimais
  if (Math.abs(number) >= 1) {
    return number.toFixed(2);
  }
}