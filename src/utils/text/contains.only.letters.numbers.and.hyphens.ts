import { z } from "zod";
import validator from 'validator';

export function containsOnlyLettersNumbersAndHyphens(str: string): boolean {
  const stringSchema = z.string();
  const zodResult = stringSchema.safeParse(str);

  if (!zodResult.success) {
    return false;
  }

  // Using validator to check if the string contains only letters, numbers, or hyphens
  const lettersNumbersAndHyphensOnly = str.split(' ').every(word => validator.isAlphanumeric(word.replace(/-/g, '')));

  if (!lettersNumbersAndHyphensOnly) {
    return false;
  }

  // Further validate with regex to ensure no other characters are included
  const regex = /^[a-zA-Z0-9\s-]+$/;
  return regex.test(str);
}