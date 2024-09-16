import { z } from "zod";
import validator from 'validator';

export function containsOnlyLetters(str: string): boolean {
  const stringSchema = z.string();
  const zodResult = stringSchema.safeParse(str);

  if (!zodResult.success) {
    return false;
  }

  // Using validator to check if the string contains only letters or spaces
  const lettersOnly = str.split(' ').every(word => validator.isAlpha(word));

  if (!lettersOnly) {
    return false;
  }

  // Further validate with regex to ensure no other characters are included
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(str);
}