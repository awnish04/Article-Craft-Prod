import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "ArticleCraft <onboarding@resend.dev>",
      to: ["articlecraft2026@gmail.com"],
      replyTo: email,
      subject: subject
        ? `[Contact] ${subject}`
        : `[Contact] New message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="margin: 0 0 20px; font-size: 20px; color: #111827;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #374151;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; width: 100px;">Name</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #6366f1;">${email}</a></td>
            </tr>
            ${phone ? `<tr><td style="padding: 8px 0; font-weight: 600;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>` : ""}
            ${subject ? `<tr><td style="padding: 8px 0; font-weight: 600;">Subject</td><td style="padding: 8px 0;">${subject}</td></tr>` : ""}
          </table>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
          <p style="font-weight: 600; margin: 0 0 8px; font-size: 14px; color: #374151;">Message</p>
          <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">Sent from ArticleCraft contact form. Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", id: data?.id },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
