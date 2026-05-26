import nodemailer from "nodemailer";
import { Resend } from "resend";

export interface SendMailOptions {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  text: string;
}

function getSmtpTransporter() {
  const user = process.env.FASTMAIL_SMTP_USER;
  const pass = process.env.FASTMAIL_SMTP_PASSWORD;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host: "smtp.fastmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

/**
 * Send email via Resend when RESEND_API_KEY is set, otherwise Fastmail SMTP.
 */
export async function sendMail(
  options: SendMailOptions
): Promise<{ success: boolean; error?: string }> {
  const to = Array.isArray(options.to) ? options.to : [options.to];

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: options.from,
        to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Resend send failed",
      };
    }
  }

  const transporter = getSmtpTransporter();
  if (!transporter) {
    return {
      success: false,
      error: "No email provider configured (RESEND_API_KEY or FASTMAIL SMTP)",
    };
  }

  try {
    await transporter.sendMail({
      from: options.from,
      to: to.join(", "),
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "SMTP send failed",
    };
  }
}
