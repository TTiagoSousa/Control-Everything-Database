export function isPasswordSimilarToEmail(email: string, password: string): boolean {
  const emailParts = email.split('@');
  const username = emailParts[0];
  
  return password.includes(username) || password.includes(email);
}