import nodemailer from "nodemailer";

/**
 * Email notification utility for wedding website
 * Uses Fastmail SMTP for sending emails
 */

// Fastmail SMTP configuration
const smtpUser = process.env.FASTMAIL_SMTP_USER || "wedding@laurensandmonica.com";
const smtpPass = process.env.FASTMAIL_SMTP_PASSWORD || "9y976g4f8a2a2u2t";

const transporter = nodemailer.createTransport({
  host: "smtp.fastmail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

// Recipients for notifications
const NOTIFICATION_RECIPIENTS = [
  "wedding@laurensandmonica.com",
  "mszlatiner@gmail.com",
];

interface AddressNotificationData {
  guestName: string;
  invitationName?: string;
  formattedAddress: string;
  country?: string;
  updatedAt: string;
}

/**
 * Send email notification when a guest submits or updates their address
 */
export async function sendAddressNotification(
  data: AddressNotificationData
): Promise<{ success: boolean; error?: string }> {
  const { guestName, invitationName, formattedAddress, country, updatedAt } = data;

  // Format the date nicely
  const dateFormatted = new Date(updatedAt).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const subject = `📬 New Address Submitted — ${guestName}`;

  const htmlContent = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="font-size: 24px; font-weight: normal; font-style: italic; color: #2D2926; margin-bottom: 30px;">
        New Address Received
      </h1>
      
      <div style="background: #F5F5F0; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
        <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #C37B60;">
          Guest
        </p>
        <p style="margin: 0 0 20px 0; font-size: 20px; color: #2D2926;">
          ${guestName}
        </p>
        
        ${invitationName && invitationName !== guestName ? `
        <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #C37B60;">
          Name for Invitation
        </p>
        <p style="margin: 0 0 20px 0; font-size: 16px; color: #2D2926;">
          ${invitationName}
        </p>
        ` : ""}
        
        <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #C37B60;">
          Mailing Address
        </p>
        <p style="margin: 0; font-size: 16px; color: #2D2926; white-space: pre-line; line-height: 1.6;">
${formattedAddress}
        </p>
      </div>
      
      <p style="font-size: 14px; color: rgba(45, 41, 38, 0.6); margin: 0;">
        Submitted on ${dateFormatted}
      </p>
      
      <hr style="border: none; border-top: 1px solid rgba(45, 41, 38, 0.1); margin: 30px 0;" />
      
      <p style="font-size: 12px; color: rgba(45, 41, 38, 0.4); margin: 0; font-style: italic;">
        This is an automated notification from your wedding website.
      </p>
    </div>
  `;

  const textContent = `
New Address Received

Guest: ${guestName}
${invitationName && invitationName !== guestName ? `Name for Invitation: ${invitationName}\n` : ""}
Mailing Address:
${formattedAddress}

Submitted on ${dateFormatted}

---
This is an automated notification from your wedding website.
  `.trim();

  try {
    await transporter.sendMail({
      from: `"L&M Wedding" <${smtpUser}>`,
      to: NOTIFICATION_RECIPIENTS.join(", "),
      subject,
      text: textContent,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
