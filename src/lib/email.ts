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

const SITE_URL = "https://laurensandmonica.com";

interface RsvpConfirmationData {
  guestName: string;
  guestEmail: string;
  attending: boolean;
  dietaryPreference?: string | null;
  allergies?: string | null;
  plusOneName?: string | null;
  plusOneAttending?: boolean | null;
  plusOneDietaryPreference?: string | null;
  plusOneAllergies?: string | null;
  isUpdate: boolean;
}

export async function sendRsvpConfirmationToGuest(
  data: RsvpConfirmationData
): Promise<{ success: boolean; error?: string }> {
  const dietaryLabel = (pref: string | null | undefined) => {
    if (!pref) return "—";
    if (pref === "standard") return "No preference";
    return pref.charAt(0).toUpperCase() + pref.slice(1);
  };

  const firstName = data.guestName.split(" ")[0];
  const updateUrl = `${SITE_URL}/rsvp?name=${encodeURIComponent(data.guestName)}`;

  const subject = data.attending
    ? `We'll see you there, ${firstName}`
    : `We'll miss you, ${firstName}`;

  let summaryHtml = "";
  let summaryText = "";

  if (data.attending) {
    summaryHtml = `
        <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #C37B60;">
          Your Dinner
        </p>
        <p style="margin: 0 0 20px 0; font-size: 16px; color: #2D2926;">
          ${dietaryLabel(data.dietaryPreference)}${data.allergies ? ` · ${data.allergies}` : ""}
        </p>
        ${data.plusOneAttending && data.plusOneName ? `
        <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #C37B60;">
          Your Plus One
        </p>
        <p style="margin: 0 0 4px 0; font-size: 16px; color: #2D2926;">
          ${data.plusOneName}
        </p>
        <p style="margin: 0 0 20px 0; font-size: 14px; color: rgba(45, 41, 38, 0.6);">
          ${dietaryLabel(data.plusOneDietaryPreference)}${data.plusOneAllergies ? ` · ${data.plusOneAllergies}` : ""}
        </p>` : ""}`;

    summaryText = `Dinner: ${dietaryLabel(data.dietaryPreference)}${data.allergies ? ` (${data.allergies})` : ""}
${data.plusOneAttending && data.plusOneName ? `\nPlus One: ${data.plusOneName}\nDinner: ${dietaryLabel(data.plusOneDietaryPreference)}${data.plusOneAllergies ? ` (${data.plusOneAllergies})` : ""}\n` : ""}`;
  }

  const heroMessage = data.attending
    ? "You're all set. We'll save you a seat and a glass at Parkheuvel on August 1st."
    : "We're sorry you can't make it. If your plans change, you can always update your RSVP.";

  const htmlContent = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 3px; color: #C37B60; margin: 0 0 16px 0; text-align: center;">
        ${data.isUpdate ? "RSVP Updated" : "RSVP Confirmed"}
      </p>
      <h1 style="font-size: 28px; font-weight: normal; font-style: italic; color: #2D2926; margin: 0 0 24px 0; text-align: center;">
        ${data.attending ? `See you there, ${firstName}` : `We'll miss you, ${firstName}`}
      </h1>
      <p style="font-size: 16px; color: rgba(45, 41, 38, 0.65); line-height: 1.6; margin: 0 0 32px 0; text-align: center;">
        ${heroMessage}
      </p>

      ${data.attending ? `
      <div style="background: #F5F5F0; padding: 30px; border-radius: 8px; margin-bottom: 32px;">
        <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #C37B60;">
          Status
        </p>
        <p style="margin: 0 0 20px 0; font-size: 18px; color: #2D6A4F; font-weight: bold;">
          ✓ Attending
        </p>
        ${summaryHtml}
      </div>` : `
      <div style="background: #F5F5F0; padding: 30px; border-radius: 8px; margin-bottom: 32px; text-align: center;">
        <p style="margin: 0; font-size: 16px; color: rgba(45, 41, 38, 0.6);">
          Not attending
        </p>
      </div>`}

      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${updateUrl}" style="display: inline-block; background-color: #2D2926; color: #F5F5F0; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; font-family: sans-serif; font-weight: bold;">
          Update your RSVP
        </a>
      </div>

      <p style="font-size: 13px; color: rgba(45, 41, 38, 0.45); text-align: center; line-height: 1.6; margin: 0 0 32px 0;">
        Plans changed? No worries — click the button above to update your details anytime.
      </p>

      <hr style="border: none; border-top: 1px solid rgba(45, 41, 38, 0.1); margin: 0 0 24px 0;" />

      <p style="font-size: 12px; color: rgba(45, 41, 38, 0.35); margin: 0; text-align: center; font-style: italic;">
        Laurens & Monica · August 1, 2026 · Parkheuvel, Rotterdam
      </p>
    </div>
  `;

  const textContent = `${data.isUpdate ? "RSVP Updated" : "RSVP Confirmed"}

${data.attending ? `See you there, ${firstName}!` : `We'll miss you, ${firstName}.`}

${heroMessage}

Status: ${data.attending ? "Attending" : "Not attending"}
${data.attending ? summaryText : ""}
Plans changed? Update your RSVP here: ${updateUrl}

---
Laurens & Monica · August 1, 2026 · Parkheuvel, Rotterdam`.trim();

  try {
    await transporter.sendMail({
      from: `"Laurens & Monica" <${smtpUser}>`,
      to: data.guestEmail,
      subject,
      text: textContent,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send RSVP confirmation to guest:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

interface RsvpNotificationData {
  guestName: string;
  attending: boolean;
  dietaryPreference?: string | null;
  allergies?: string | null;
  plusOneName?: string | null;
  plusOneAttending?: boolean | null;
  plusOneDietaryPreference?: string | null;
  plusOneAllergies?: string | null;
  isUpdate: boolean;
}

export async function sendRsvpNotification(
  data: RsvpNotificationData
): Promise<{ success: boolean; error?: string }> {
  const action = data.isUpdate ? "Updated" : "New";
  const status = data.attending ? "Attending" : "Not attending";
  const subject = `🎉 ${action} RSVP — ${data.guestName} (${status})`;

  const dietaryLabel = (pref: string | null | undefined) => {
    if (!pref) return "—";
    if (pref === "standard") return "No preference";
    return pref.charAt(0).toUpperCase() + pref.slice(1);
  };

  let detailsHtml = "";
  let detailsText = "";

  if (data.attending) {
    detailsHtml = `
        <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #C37B60;">
          Dietary Preference
        </p>
        <p style="margin: 0 0 20px 0; font-size: 16px; color: #2D2926;">
          ${dietaryLabel(data.dietaryPreference)}
        </p>
        ${data.allergies ? `
        <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #C37B60;">
          Allergies / Notes
        </p>
        <p style="margin: 0 0 20px 0; font-size: 16px; color: #2D2926;">
          ${data.allergies}
        </p>` : ""}
        ${data.plusOneAttending ? `
        <hr style="border: none; border-top: 1px solid rgba(45, 41, 38, 0.1); margin: 20px 0;" />
        <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #C37B60;">
          Plus One
        </p>
        <p style="margin: 0 0 20px 0; font-size: 16px; color: #2D2926;">
          ${data.plusOneName || "Not specified"}
        </p>
        <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #C37B60;">
          Plus One Dietary
        </p>
        <p style="margin: 0 0 20px 0; font-size: 16px; color: #2D2926;">
          ${dietaryLabel(data.plusOneDietaryPreference)}
        </p>
        ${data.plusOneAllergies ? `
        <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #C37B60;">
          Plus One Allergies / Notes
        </p>
        <p style="margin: 0 0 20px 0; font-size: 16px; color: #2D2926;">
          ${data.plusOneAllergies}
        </p>` : ""}` : ""}`;

    detailsText = `Dietary: ${dietaryLabel(data.dietaryPreference)}
${data.allergies ? `Allergies: ${data.allergies}\n` : ""}${data.plusOneAttending ? `\nPlus One: ${data.plusOneName || "Not specified"}
Plus One Dietary: ${dietaryLabel(data.plusOneDietaryPreference)}
${data.plusOneAllergies ? `Plus One Allergies: ${data.plusOneAllergies}\n` : ""}` : ""}`;
  }

  const now = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const htmlContent = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="font-size: 24px; font-weight: normal; font-style: italic; color: #2D2926; margin-bottom: 30px;">
        ${action} RSVP
      </h1>
      
      <div style="background: #F5F5F0; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
        <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #C37B60;">
          Guest
        </p>
        <p style="margin: 0 0 20px 0; font-size: 20px; color: #2D2926;">
          ${data.guestName}
        </p>
        
        <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #C37B60;">
          Status
        </p>
        <p style="margin: 0 0 20px 0; font-size: 18px; color: ${data.attending ? "#2D6A4F" : "#C37B60"}; font-weight: bold;">
          ${data.attending ? "✓ Attending" : "✗ Not attending"}
        </p>
        
        ${detailsHtml}
      </div>
      
      <p style="font-size: 14px; color: rgba(45, 41, 38, 0.6); margin: 0;">
        ${data.isUpdate ? "Updated" : "Submitted"} on ${now}
      </p>
      
      <hr style="border: none; border-top: 1px solid rgba(45, 41, 38, 0.1); margin: 30px 0;" />
      
      <p style="font-size: 12px; color: rgba(45, 41, 38, 0.4); margin: 0; font-style: italic;">
        This is an automated notification from your wedding website.
      </p>
    </div>
  `;

  const textContent = `${action} RSVP

Guest: ${data.guestName}
Status: ${data.attending ? "Attending" : "Not attending"}
${data.attending ? detailsText : ""}
${data.isUpdate ? "Updated" : "Submitted"} on ${now}

---
This is an automated notification from your wedding website.`.trim();

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
    console.error("Failed to send RSVP email notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
