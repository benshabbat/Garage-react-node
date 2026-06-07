import nodemailer from "nodemailer";

/**
 * Returns a configured transporter, or null if SMTP is not set up.
 * All env vars are read at call-time so tests can set them in beforeAll.
 */
const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER) return null;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
};

const FROM = () =>
  process.env.EMAIL_FROM || `"Garage770" <${process.env.SMTP_USER || "no-reply@garage770.com"}>`;

const escHtml = (str) =>
  String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/**
 * Sends a booking confirmation to the customer after createAppointment.
 * Fire-and-forget — errors are logged but never thrown.
 */
export const sendAppointmentConfirmation = async (appointment) => {
  const transporter = createTransporter();
  if (!transporter) return;

  try {
    await transporter.sendMail({
      from: FROM(),
      to: appointment.email,
      subject: "Your Garage770 Appointment is Confirmed",
      html: `
        <h2>Appointment Confirmed</h2>
        <p>Hi ${escHtml(appointment.clientName)},</p>
        <p>Your appointment has been successfully booked at <strong>Garage770</strong>.</p>
        <table>
          <tr><td><strong>Date:</strong></td><td>${formatDate(appointment.date)}</td></tr>
          <tr><td><strong>Time:</strong></td><td>${escHtml(appointment.time)}</td></tr>
          ${appointment.notes ? `<tr><td><strong>Notes:</strong></td><td>${escHtml(appointment.notes)}</td></tr>` : ""}
        </table>
        <p>We will be in touch if anything changes. See you soon!</p>
        <p>— The Garage770 Team</p>
      `,
    });
  } catch (err) {
    console.error("[emailService] Failed to send confirmation:", err.message);
  }
};

/**
 * Notifies the customer when an admin updates the appointment status.
 * Fire-and-forget — errors are logged but never thrown.
 */
export const sendStatusUpdate = async (appointment) => {
  const transporter = createTransporter();
  if (!transporter) return;

  const statusLabel =
    {
      confirmed: "Confirmed ✅",
      cancelled: "Cancelled ❌",
      pending: "Pending ⏳",
    }[appointment.status] ?? appointment.status;

  try {
    await transporter.sendMail({
      from: FROM(),
      to: appointment.email,
      subject: `Garage770 Appointment ${statusLabel}`,
      html: `
        <h2>Appointment Status Updated</h2>
        <p>Hi ${escHtml(appointment.clientName)},</p>
        <p>Your appointment on <strong>${formatDate(appointment.date)}</strong> at
           <strong>${escHtml(appointment.time)}</strong> has been updated to:
           <strong>${statusLabel}</strong>.</p>
        ${
          appointment.status === "cancelled"
            ? "<p>If you believe this is an error, please contact us.</p>"
            : ""
        }
        <p>— The Garage770 Team</p>
      `,
    });
  } catch (err) {
    console.error("[emailService] Failed to send status update:", err.message);
  }
};
