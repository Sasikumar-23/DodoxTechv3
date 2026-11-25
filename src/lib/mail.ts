import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/*
 * SMTP credentials come from the environment — never commit them.
 *   GMAIL_USER          e.g. dodoxtechstudio@gmail.com
 *   GMAIL_APP_PASSWORD  a Google "App password" (16 chars)
 *   LEAD_INBOX          optional, where enquiries are delivered (defaults to GMAIL_USER)
 * On Cloudflare set them with `wrangler secret put`, on a Node host via the process env.
 */

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z.string().trim().max(30).optional().default(""),
  company: z.string().trim().max(150).optional().default(""),
  service: z.string().trim().max(100).optional().default(""),
  budget: z.string().trim().max(50).optional().default(""),
  details: z.string().trim().min(10, "Tell us a little more about your project").max(5000),
  page: z.string().trim().max(200).optional().default(""),
  // Honeypot — real visitors never see or fill this field.
  website: z.string().max(0).optional().default(""),
});

const feedbackSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().max(200).optional().default(""),
  rating: z.number().int().min(1).max(5),
  message: z.string().trim().min(2).max(3000),
});

export type ContactFormData = z.input<typeof contactSchema>;
export type FeedbackFormData = z.input<typeof feedbackSchema>;

const esc = (v: string) =>
  v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Strip CR/LF so user input can never inject extra email headers via the subject line. */
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").slice(0, 120);

async function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.error("[mail] GMAIL_USER / GMAIL_APP_PASSWORD are not set — cannot send email.");
    throw new Error("Our form is temporarily unavailable. Please email or WhatsApp us instead.");
  }
  const nodemailer = (await import("nodemailer")).default;
  return {
    user,
    inbox: process.env.LEAD_INBOX || user,
    transporter: nodemailer.createTransport({ service: "gmail", auth: { user, pass } }),
  };
}

const shell = (body: string) => `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px;background:#030712;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#f8fafc">
<div style="max-width:600px;margin:0 auto;background:#0b0f19;border:1px solid rgba(255,255,255,.06);border-top:3px solid #67e8f9;border-radius:16px;padding:32px">
<div style="font-weight:800;font-size:20px;text-align:center;margin-bottom:24px;letter-spacing:.05em">DodoX <span style="color:#67e8f9">Tech</span></div>
${body}
</div></body></html>`;

const row = (label: string, value: string) =>
  `<div style="margin-bottom:16px"><div style="font-size:10px;text-transform:uppercase;letter-spacing:.15em;color:#67e8f9;font-weight:700;margin-bottom:6px">${label}</div>
<div style="font-size:14px;color:#cbd5e1;line-height:1.6;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);padding:10px 14px;border-radius:8px;white-space:pre-wrap">${esc(value) || "—"}</div></div>`;

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // Silently accept bot submissions without sending anything.
    if (data.website) return { success: true };

    const { transporter, user, inbox } = await getTransport();

    const leadHtml = shell(`
<div style="font-size:22px;font-weight:700;margin-bottom:20px">New project enquiry</div>
${row("Name", data.name)}
${row("Email", data.email)}
${row("Phone / WhatsApp", data.phone)}
${row("Company", data.company)}
${row("Service", data.service)}
${row("Budget", data.budget)}
${row("Project details", data.details)}
${row("Submitted from", data.page)}
<div style="margin-top:24px;font-size:11px;color:rgba(255,255,255,.3);text-align:center">Reply to this email to answer the client directly.</div>`);

    const firstName = data.name.split(" ")[0];
    const replyHtml = shell(`
<h1 style="font-size:22px;margin:0 0 8px;text-align:center">Thanks, ${esc(firstName)} — we've got your enquiry.</h1>
<p style="font-size:14px;color:rgba(255,255,255,.55);text-align:center;margin:0 0 24px">A real person will reply within 24 hours.</p>
<div style="background:rgba(103,232,249,.05);border:1px solid rgba(103,232,249,.15);border-radius:10px;padding:16px 20px;margin-bottom:24px;font-size:13px;color:rgba(255,255,255,.65);line-height:1.7">
<strong style="color:#67e8f9">What happens next?</strong><br/>
1. We review your requirements.<br/>
2. We contact you to schedule a free consultation call.<br/>
3. You receive a written proposal with a fixed quote and timeline.
</div>
<p style="text-align:center;margin:0 0 24px"><a href="https://wa.me/917548872118?text=${encodeURIComponent("Hi DodoX Tech! I just sent an enquiry from your website.")}" style="display:inline-block;background:linear-gradient(135deg,#f8fafc,#d1d5db 50%,#9ca3af);color:#030712;font-weight:700;font-size:13px;text-decoration:none;padding:12px 28px;border-radius:50px">Chat with us on WhatsApp</a></p>
<div style="font-size:11px;color:rgba(255,255,255,.3);text-align:center;line-height:1.8;border-top:1px solid rgba(255,255,255,.05);padding-top:16px">
DodoX Tech · Coimbatore, Tamil Nadu, India · <a href="https://dodoxtechs.in" style="color:#67e8f9;text-decoration:none">dodoxtechs.in</a></div>`);

    try {
      await Promise.all([
        transporter.sendMail({
          from: `"DodoX Tech Website" <${user}>`,
          to: inbox,
          replyTo: data.email,
          subject: `New enquiry: ${oneLine(data.service || "Project")} — ${oneLine(data.name)}`,
          html: leadHtml,
        }),
        transporter.sendMail({
          from: `"DodoX Tech" <${user}>`,
          to: data.email,
          subject: "We've received your enquiry — DodoX Tech",
          html: replyHtml,
        }),
      ]);
    } catch (err) {
      console.error("[mail] contact send failed:", err);
      throw new Error(
        "We couldn't send your message right now. Please email or WhatsApp us instead.",
      );
    }
    return { success: true };
  });

// Feedback goes to the inbox for manual review — it is never auto-published.
export const sendFeedbackEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => feedbackSchema.parse(data))
  .handler(async ({ data }) => {
    const { transporter, user, inbox } = await getTransport();
    const stars = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);
    try {
      await transporter.sendMail({
        from: `"DodoX Tech Feedback" <${user}>`,
        to: inbox,
        replyTo: data.email || undefined,
        subject: `Feedback from ${oneLine(data.name)} (${stars})`,
        html: shell(`
<div style="font-size:22px;font-weight:700;margin-bottom:6px">New feedback</div>
<div style="font-size:18px;color:#67e8f9;letter-spacing:.1em;margin-bottom:20px">${stars}</div>
${row("Name", data.name)}
${row("Email", data.email)}
${row("Message", data.message)}
<div style="margin-top:24px;font-size:11px;color:rgba(255,255,255,.3);text-align:center">Not published automatically — add it to the site's testimonials if it's a good fit.</div>`),
      });
    } catch (err) {
      console.error("[mail] feedback send failed:", err);
      throw new Error("We couldn't send your feedback right now. Please try again later.");
    }
    return { success: true };
  });
