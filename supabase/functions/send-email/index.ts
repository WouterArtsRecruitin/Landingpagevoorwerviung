import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';

interface EmailRequest {
  type: 'new_draft_page' | 'candidate_confirmation' | 'recruiter_notification' | 'candidate_followup_day3' | 'candidate_followup_day7';
  to: string;
  // For new_draft_page
  page_title?: string;
  company_name?: string;
  slug?: string;
  // For candidate emails
  candidate_name?: string;
  job_title?: string;
  job_url?: string;
  // For recruiter notification
  applicant_name?: string;
  applicant_email?: string;
  applicant_phone?: string;
  cv_url?: string;
  linkedin_url?: string;
  motivation?: string;
}

serve(async (req) => {
  try {
    const emailData: EmailRequest = await req.json();

    let emailHtml = '';
    let emailSubject = '';

    switch (emailData.type) {
      case 'new_draft_page':
        emailSubject = `✅ Nieuwe vacature klaar: ${emailData.page_title}`;
        emailHtml = generateNewDraftEmail(emailData);
        break;

      case 'candidate_confirmation':
        emailSubject = `Bedankt voor je sollicitatie - ${emailData.job_title}`;
        emailHtml = generateCandidateConfirmationEmail(emailData);
        break;

      case 'recruiter_notification':
        emailSubject = `🔔 Nieuwe sollicitatie: ${emailData.applicant_name} - ${emailData.job_title}`;
        emailHtml = generateRecruiterNotificationEmail(emailData);
        break;

      case 'candidate_followup_day3':
        emailSubject = `Update over je sollicitatie - ${emailData.job_title}`;
        emailHtml = generateFollowupDay3Email(emailData);
        break;

      case 'candidate_followup_day7':
        emailSubject = `Ben je nog geïnteresseerd? - ${emailData.job_title}`;
        emailHtml = generateFollowupDay7Email(emailData);
        break;

      default:
        throw new Error(`Unknown email type: ${emailData.type}`);
    }

    // Send via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Recruitment Team <noreply@recruitin.nl>',
        to: emailData.to,
        subject: emailSubject,
        html: emailHtml
      })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', result);
      throw new Error(`Resend API error: ${result.message}`);
    }

    console.log('Email sent successfully:', result);

    return new Response(
      JSON.stringify({ success: true, email_id: result.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error sending email:', error);

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

function generateNewDraftEmail(data: EmailRequest): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">✅ Vacature Klaar voor Review</h1>
  </div>

  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px; margin-bottom: 20px;">
      Hoi,
    </p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      De vacaturepagina voor <strong>${data.company_name}</strong> is automatisch aangemaakt en staat klaar voor review:
    </p>

    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #667eea;">
      <h2 style="margin-top: 0; color: #667eea;">${data.page_title}</h2>
      <p style="margin: 5px 0;"><strong>Bedrijf:</strong> ${data.company_name}</p>
      <p style="margin: 5px 0;"><strong>Slug:</strong> /v/${data.slug}</p>
      <p style="margin: 5px 0;"><strong>Status:</strong> <span style="background: #fbbf24; color: #78350f; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">DRAFT</span></p>
    </div>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Ga naar het admin dashboard om de pagina te reviewen en te publiceren.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${Deno.env.get('FRONTEND_URL')}/admin/pages" style="display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
        Bekijk in Admin Dashboard →
      </a>
    </div>

    <p style="font-size: 14px; color: #666; margin-top: 30px;">
      Na publicatie is de pagina live op:<br>
      <strong>${Deno.env.get('FRONTEND_URL')}/v/${data.slug}</strong>
    </p>
  </div>

  <div style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
    <p>Recruitment Automation Platform</p>
  </div>
</body>
</html>
  `;
}

function generateCandidateConfirmationEmail(data: EmailRequest): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">✅ Sollicitatie Ontvangen!</h1>
  </div>

  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px; margin-bottom: 20px;">
      Hoi ${data.candidate_name},
    </p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Bedankt voor je sollicitatie op de functie <strong>${data.job_title}</strong>!
    </p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      We hebben je gegevens en motivatie ontvangen en nemen deze zorgvuldig door.
    </p>

    <div style="background: white; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #10b981;">
      <p style="margin: 0; font-size: 14px; color: #666;">
        <strong style="color: #333;">Wat nu?</strong><br>
        We nemen <strong>binnen 2 werkdagen</strong> contact met je op over de vervolgstappen.
      </p>
    </div>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Heb je nog vragen? Je kunt altijd de vacaturepagina nogmaals bekijken:
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${data.job_url}" style="display: inline-block; background: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
        Bekijk Vacature →
      </a>
    </div>

    <p style="font-size: 14px; color: #666; margin-top: 30px;">
      Veel succes!<br>
      <strong>Het Recruitment Team</strong>
    </p>
  </div>

  <div style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
    <p>Check ook je spam folder voor onze emails</p>
  </div>
</body>
</html>
  `;
}

function generateRecruiterNotificationEmail(data: EmailRequest): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">🔔 Nieuwe Sollicitatie!</h1>
  </div>

  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px; margin-bottom: 20px;">
      Er is een nieuwe sollicitatie binnengekomen:
    </p>

    <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3b82f6;">
      <h2 style="margin-top: 0; color: #3b82f6; font-size: 20px;">${data.job_title}</h2>

      <div style="margin: 15px 0; padding: 15px; background: #f0f9ff; border-radius: 6px;">
        <p style="margin: 5px 0;"><strong>Kandidaat:</strong> ${data.applicant_name}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${data.applicant_email}" style="color: #3b82f6;">${data.applicant_email}</a></p>
        ${data.applicant_phone ? `<p style="margin: 5px 0;"><strong>Telefoon:</strong> <a href="tel:${data.applicant_phone}" style="color: #3b82f6;">${data.applicant_phone}</a></p>` : ''}
        ${data.linkedin_url ? `<p style="margin: 5px 0;"><strong>LinkedIn:</strong> <a href="${data.linkedin_url}" style="color: #3b82f6;" target="_blank">Bekijk Profiel →</a></p>` : ''}
      </div>

      ${data.motivation ? `
      <div style="margin: 15px 0;">
        <strong style="display: block; margin-bottom: 8px; color: #333;">Motivatie:</strong>
        <p style="background: #fef3c7; padding: 15px; border-radius: 6px; margin: 0; font-style: italic; color: #78350f; border-left: 3px solid #fbbf24;">
          "${data.motivation}"
        </p>
      </div>
      ` : ''}
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${Deno.env.get('FRONTEND_URL')}/admin/candidates" style="display: inline-block; background: #3b82f6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin-right: 10px;">
        Bekijk in Admin →
      </a>
      ${data.cv_url ? `
      <a href="${data.cv_url}" style="display: inline-block; background: white; color: #3b82f6; border: 2px solid #3b82f6; padding: 12px 26px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
        Download CV
      </a>
      ` : ''}
    </div>

    <p style="font-size: 14px; color: #666; margin-top: 30px; padding: 15px; background: #fff3cd; border-radius: 6px; border-left: 3px solid #fbbf24;">
      ⏰ <strong>Reminder:</strong> Neem binnen 2 werkdagen contact op met de kandidaat!
    </p>
  </div>

  <div style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
    <p>Recruitment Automation Platform</p>
  </div>
</body>
</html>
  `;
}

function generateFollowupDay3Email(data: EmailRequest): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">📋 Update over je sollicitatie</h1>
  </div>

  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px; margin-bottom: 20px;">
      Hoi ${data.candidate_name},
    </p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      We wilden je even laten weten dat we je sollicitatie voor <strong>${data.job_title}</strong> zorgvuldig aan het beoordelen zijn.
    </p>

    <div style="background: white; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #8b5cf6;">
      <p style="margin: 0; font-size: 14px; color: #666;">
        <strong style="color: #333;">Waar zijn we mee bezig?</strong><br>
        We bekijken alle sollicitaties grondig en matchen deze met het profiel dat we zoeken. Dit kan even duren, maar we laten je snel weten wat de vervolgstappen zijn.
      </p>
    </div>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Heb je in de tussentijd nog vragen? Neem gerust contact met ons op!
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${data.job_url}" style="display: inline-block; background: #8b5cf6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
        Bekijk Vacature →
      </a>
    </div>

    <p style="font-size: 14px; color: #666; margin-top: 30px;">
      Groet,<br>
      <strong>Het Recruitment Team</strong>
    </p>
  </div>

  <div style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
    <p>Je ontvangt deze email omdat je hebt gesolliciteerd</p>
  </div>
</body>
</html>
  `;
}

function generateFollowupDay7Email(data: EmailRequest): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">💬 Ben je nog geïnteresseerd?</h1>
  </div>

  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px; margin-bottom: 20px;">
      Hoi ${data.candidate_name},
    </p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Een weekje geleden solliciteerde je op de functie <strong>${data.job_title}</strong>.
    </p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      We wilden even checken: <strong>ben je nog steeds geïnteresseerd?</strong>
    </p>

    <div style="background: white; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
      <p style="margin: 0 0 15px 0; font-size: 16px; color: #333;">
        <strong>Wil je graag in gesprek?</strong>
      </p>
      <p style="margin: 0; font-size: 14px; color: #666;">
        Plan direct een kennismakingsgesprek in met ons team. We beantwoorden al je vragen en vertellen je meer over de functie en het bedrijf.
      </p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${data.job_url}#apply" style="display: inline-block; background: #f59e0b; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin-bottom: 10px;">
        📅 Plan een Gesprek
      </a>
    </div>

    <p style="font-size: 14px; color: #666; margin-top: 30px; text-align: center; padding: 15px; background: #fef3c7; border-radius: 6px;">
      💡 Tip: De meeste vacatures worden snel ingevuld. Plan nu een gesprek om je kans te vergroten!
    </p>

    <p style="font-size: 14px; color: #666; margin-top: 30px;">
      Groet,<br>
      <strong>Het Recruitment Team</strong>
    </p>
  </div>

  <div style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
    <p>Geen interesse meer? <a href="#" style="color: #999; text-decoration: underline;">Klik hier om je af te melden</a></p>
  </div>
</body>
</html>
  `;
}
