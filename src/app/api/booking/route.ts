import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, date, time } = body as {
      name: string;
      email: string;
      service: string;
      date: string;
      time: string;
    };

    if (!name || !email || !service || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const submittedAt = new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" });

    const rows = [
      { label: "Full Name", value: name },
      { label: "Email", value: email },
      { label: "Service", value: service },
      { label: "Preferred Date", value: date },
      { label: "Preferred Time", value: time },
    ]
      .map(
        (f) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827;width:40%;font-size:14px;">${f.label}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;color:#4b5563;font-size:14px;">${f.value || "—"}</td>
        </tr>`
      )
      .join("");

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#f7f8fc;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fc;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#0b1024;padding:32px 40px;text-align:center;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.5);">I H PROFESSIONALS & CO.</p>
            <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">New Booking Request</h1>
            <p style="margin:8px 0 0;font-size:14px;color:#e8ebfa;">${service}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 24px;font-size:15px;color:#4b5563;">A new appointment booking has been submitted:</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
              ${rows}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f0f2fd;padding:20px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:13px;color:#6b7280;">
              <strong style="color:#334ed7;">Submitted:</strong> ${submittedAt} AEST
            </p>
            <p style="margin:8px 0 0;font-size:12px;color:#9ca3af;">by <strong>I H Professionals & Co. Pty Ltd</strong></p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await resend.emails.send({
      from: "IH Professionals <onboarding@resend.dev>",
      to: process.env.RECIPIENT_EMAIL!,
      subject: `New Booking Request: ${service} — IH Professionals`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
