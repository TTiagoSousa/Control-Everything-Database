import { z } from "zod";

export function isNotStringAndIsNumber(input: any): boolean {
  // Garantir que a entrada não é uma string
  const notStringSchema = z.any().refine(val => typeof val !== 'string', {
    message: "Input should not be a string",
  });

  const notStringResult = notStringSchema.safeParse(input);

  if (!notStringResult.success) {
    return false;
  }

  // Garantir que a entrada é um número
  const numberSchema = z.number();
  const numberResult = numberSchema.safeParse(input);

  return numberResult.success;
}