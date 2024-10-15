import { EmailService } from "src/email/email.service";
import { isValidEmail } from "src/utils/email/is.valide.email";
import { BadRequestException } from "@nestjs/common";
import resetPasswordTemplate from "src/email/templates/reset.password.email";
import updatePasswordTemplate from "src/email/templates/update.password.email";

export async function emailToUpdatePassword(
  email: string,
  emailService: EmailService,
  token: string
) {
  const activationBaseUrl = process.env.BASE_URL;

  if (!isValidEmail(email)) {
    throw new BadRequestException("Invalid email");
  }

  const code = token;
  const html = updatePasswordTemplate(code);

  await emailService.sendEmail(email, 'Update Password', html);
}