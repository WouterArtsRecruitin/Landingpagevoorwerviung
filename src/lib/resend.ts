import { Resend } from 'resend';

// Initialize Resend (get API key from https://resend.com/api-keys)
const apiKey = import.meta.env.VITE_RESEND_API_KEY;
if (!apiKey) {
  console.warn("VITE_RESEND_API_KEY not configured. Email sending will fail.");
}
const resend = new Resend(apiKey || '');

function escapeHtml(str: string | undefined | null): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export interface ApprovalEmailData {
  clientEmail: string;
  clientName: string;
  jobTitle: string;
  companyName: string;
  approvalUrl: string;
}

export async function sendApprovalEmail(data: ApprovalEmailData) {
  const clientName = escapeHtml(data.clientName);
  const jobTitle = escapeHtml(data.jobTitle);
  const companyName = escapeHtml(data.companyName);
  const approvalUrl = escapeHtml(data.approvalUrl);

  try {
    await resend.emails.send({
      from: 'Wouter @ Kandidatentekort <wouter@kandidatentekort.nl>',
      to: data.clientEmail,
      subject: `✅ Review je vacaturepagina: ${data.jobTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Inter', -apple-system, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #0066cc 0%, #004499 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: white; padding: 40px 30px; border: 1px solid #e5e7eb; }
              .button { display: inline-block; background: #0066cc; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
              .highlight { background: #eff6ff; padding: 20px; border-left: 4px solid #0066cc; margin: 20px 0; border-radius: 4px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">Je vacaturepagina is klaar! 🎉</h1>
              </div>

              <div class="content">
                <p>Hoi ${clientName},</p>

                <p>Goed nieuws! Je vacaturepagina voor <strong>${jobTitle}</strong> bij <strong>${companyName}</strong> is gemaakt en klaar voor review.</p>

                <div class="highlight">
                  <strong>📋 Wat kun je doen:</strong>
                  <ul style="margin: 10px 0;">
                    <li><strong>Goedkeuren</strong> → Direct live (1 klik)</li>
                    <li><strong>Feedback geven</strong> → We passen aan</li>
                    <li><strong>Afwijzen</strong> → We maken een nieuw concept</li>
                  </ul>
                </div>

                <div style="text-align: center;">
                  <a href="${approvalUrl}" class="button">
                    👉 Bekijk & Approve Pagina
                  </a>
                </div>

                <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                  <strong>⏰ De link is 7 dagen geldig.</strong><br>
                  Vragen? Reply op deze email of bel: 06 12345678
                </p>

                <p style="margin-top: 30px;">
                  Groet,<br>
                  <strong>Wouter Arts</strong><br>
                  <span style="color: #6b7280;">Kandidatentekort.nl</span>
                </p>
              </div>

              <div class="footer">
                <p>© 2026 Kandidatentekort.nl | Recruitment Landing Pages</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send approval email:', error);
    return { success: false, error };
  }
}

export interface ApprovedEmailData {
  clientEmail: string;
  clientName: string;
  liveUrl: string;
  jobTitle: string;
}

export async function sendApprovedEmail(data: ApprovedEmailData) {
  const clientName = escapeHtml(data.clientName);
  const jobTitle = escapeHtml(data.jobTitle);
  const liveUrl = escapeHtml(data.liveUrl);

  try {
    await resend.emails.send({
      from: 'Wouter @ Kandidatentekort <wouter@kandidatentekort.nl>',
      to: data.clientEmail,
      subject: `🚀 Je vacaturepagina is LIVE!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Inter', -apple-system, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: white; padding: 40px 30px; border: 1px solid #e5e7eb; }
              .button { display: inline-block; background: #10b981; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 32px;">✅ Live & Ready!</h1>
              </div>

              <div class="content">
                <p>Hoi ${clientName},</p>

                <p>Je vacaturepagina voor <strong>${jobTitle}</strong> is nu live! 🚀</p>

                <div style="text-align: center; background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0 0 10px; font-weight: 600;">🔗 Live URL:</p>
                  <a href="${liveUrl}" style="color: #0066cc; word-break: break-all;">${liveUrl}</a>
                </div>

                <p><strong>Wat nu:</strong></p>
                <ul>
                  <li>✅ Deel de link in je netwerk</li>
                  <li>✅ Post op LinkedIn/sociale media</li>
                  <li>✅ Voeg toe aan je website</li>
                  <li>✅ Sollicitaties komen binnen op je email</li>
                </ul>

                <p style="margin-top: 30px;">
                  Success met je recruitment! 🎯
                </p>

                <p>
                  Groet,<br>
                  <strong>Wouter Arts</strong>
                </p>
              </div>

              <div class="footer">
                <p>© 2026 Kandidatentekort.nl</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send approved email:', error);
    return { success: false, error };
  }
}
