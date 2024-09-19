import { z } from "zod";
import validator from 'validator';

export function containsOnlyLettersAndNumbers(str: string): boolean {
  // Ensure the input is a string
  const stringSchema = z.string();
  const zodResult = stringSchema.safeParse(str);

  if (!zodResult.success) {
    return false;
  }

  // If the string is empty, return true
  if (str === '') {
    return true;
  }

  // Use validator to check if each word contains only letters and numbers
  const alphanumericOnly = str.split(' ').every(word => validator.isAlphanumeric(word));

  if (!alphanumericOnly) {
    return false;
  }

  // Validate with regex to ensure the entire string contains only letters, numbers, and spaces
  const regex = /^[a-zA-Z0-9\s]+$/;
  return regex.test(str);
}