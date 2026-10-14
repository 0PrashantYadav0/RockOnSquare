/**
 * Email notification service using Resend.
 * Gracefully degrades when RESEND_API_KEY is not configured.
 */

interface EnquiryNotificationData {
  referenceId: string
  fullName: string
  phone: string
  email?: string
  enquiryType: string
  offeringType?: string
  message?: string
  preferredDate?: Date
  preferredTime?: string
  sourcePage?: string
}

function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM)
}

function formatEnquiryType(type: string): string {
  const labels: Record<string, string> = {
    GENERAL: 'General Enquiry',
    SITE_VISIT: 'Book a Site Visit',
    CALLBACK: 'Request a Callback',
    BROCHURE: 'Request Brochure',
    RETAIL: 'Retail Space Enquiry',
    OFFICE: 'Office Space Enquiry',
    STUDIO: 'Studio/Service Apartment Enquiry',
    OTHER: 'Other Enquiry',
  }
  return labels[type] || type
}

function buildAdminEmailHtml(data: EnquiryNotificationData): string {
  const dateStr = data.preferredDate
    ? new Date(data.preferredDate).toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Not specified'

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>New Lead — Rock One Square</title>
</head>
<body style="margin:0;padding:0;background:#0f1420;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1420;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#1a2035;border-radius:12px;overflow:hidden;border:1px solid #2a3555;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a2035,#0f1420);padding:32px 40px;border-bottom:1px solid #c9a84c;">
              <div style="color:#c9a84c;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:8px;">Rock One Square</div>
              <h1 style="color:#ffffff;font-size:24px;font-weight:700;margin:0;">New Lead Received</h1>
              <p style="color:#8892b0;margin:8px 0 0;font-size:14px;">Reference: <strong style="color:#c9a84c;">${data.referenceId}</strong></p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:24px;">
                    <div style="background:#0f1420;border-radius:8px;padding:20px;border-left:3px solid #c9a84c;">
                      <div style="color:#c9a84c;font-size:11px;font-weight:700;letter-spacing:2px;margin-bottom:12px;">ENQUIRY TYPE</div>
                      <div style="color:#ffffff;font-size:18px;font-weight:600;">${formatEnquiryType(data.enquiryType)}</div>
                      ${data.offeringType ? `<div style="color:#8892b0;font-size:14px;margin-top:4px;">Interested in: ${data.offeringType}</div>` : ''}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:24px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1420;border-radius:8px;overflow:hidden;">
                      <tr style="border-bottom:1px solid #2a3555;">
                        <td style="padding:14px 20px;color:#8892b0;font-size:13px;width:40%;">Name</td>
                        <td style="padding:14px 20px;color:#ffffff;font-size:14px;font-weight:600;">${data.fullName}</td>
                      </tr>
                      <tr style="border-bottom:1px solid #2a3555;">
                        <td style="padding:14px 20px;color:#8892b0;font-size:13px;">Phone</td>
                        <td style="padding:14px 20px;color:#ffffff;font-size:14px;font-weight:600;">${data.phone}</td>
                      </tr>
                      ${data.email ? `
                      <tr style="border-bottom:1px solid #2a3555;">
                        <td style="padding:14px 20px;color:#8892b0;font-size:13px;">Email</td>
                        <td style="padding:14px 20px;color:#ffffff;font-size:14px;font-weight:600;">${data.email}</td>
                      </tr>` : ''}
                      <tr style="border-bottom:1px solid #2a3555;">
                        <td style="padding:14px 20px;color:#8892b0;font-size:13px;">Preferred Date</td>
                        <td style="padding:14px 20px;color:#ffffff;font-size:14px;">${dateStr}</td>
                      </tr>
                      ${data.preferredTime ? `
                      <tr style="border-bottom:1px solid #2a3555;">
                        <td style="padding:14px 20px;color:#8892b0;font-size:13px;">Preferred Time</td>
                        <td style="padding:14px 20px;color:#ffffff;font-size:14px;">${data.preferredTime}</td>
                      </tr>` : ''}
                      ${data.sourcePage ? `
                      <tr>
                        <td style="padding:14px 20px;color:#8892b0;font-size:13px;">Source Page</td>
                        <td style="padding:14px 20px;color:#8892b0;font-size:12px;">${data.sourcePage}</td>
                      </tr>` : ''}
                    </table>
                  </td>
                </tr>
                ${data.message ? `
                <tr>
                  <td style="padding-bottom:24px;">
                    <div style="color:#8892b0;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">Message</div>
                    <div style="background:#0f1420;border-radius:8px;padding:16px 20px;color:#ccd6f6;font-size:14px;line-height:1.6;border:1px solid #2a3555;">${data.message}</div>
                  </td>
                </tr>` : ''}
              </table>
              <!-- CTA -->
              <div style="text-align:center;margin-top:8px;">
                <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/leads" 
                   style="display:inline-block;background:#c9a84c;color:#0f1420;padding:14px 32px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;">
                  View in Dashboard →
                </a>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #2a3555;text-align:center;">
              <p style="color:#8892b0;font-size:12px;margin:0;">Rock One Square · Raj Nagar Extension, Ghaziabad · Developed by Senflore Hospitality LLP</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

function buildConfirmationEmailHtml(data: EnquiryNotificationData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Enquiry Received — Rock One Square</title>
</head>
<body style="margin:0;padding:0;background:#0f1420;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1420;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#1a2035;border-radius:12px;overflow:hidden;border:1px solid #2a3555;">
          <tr>
            <td style="background:linear-gradient(135deg,#1a2035,#0f1420);padding:32px 40px;border-bottom:1px solid #c9a84c;text-align:center;">
              <div style="color:#c9a84c;font-size:11px;font-weight:700;letter-spacing:3px;margin-bottom:12px;">ROCK ONE SQUARE</div>
              <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0 0 8px;">Thank you, ${data.fullName}!</h1>
              <p style="color:#8892b0;margin:0;font-size:14px;">Your enquiry has been received successfully.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <p style="color:#ccd6f6;font-size:15px;line-height:1.7;margin:0 0 24px;">
                Our sales team will contact you shortly on <strong style="color:#ffffff;">${data.phone}</strong>${data.email ? ` and at <strong style="color:#ffffff;">${data.email}</strong>` : ''}.
              </p>
              <div style="background:#0f1420;border-radius:8px;padding:20px;text-align:center;border:1px solid #2a3555;margin-bottom:24px;">
                <div style="color:#8892b0;font-size:12px;margin-bottom:8px;">Your Reference Number</div>
                <div style="color:#c9a84c;font-size:22px;font-weight:700;letter-spacing:2px;">${data.referenceId}</div>
              </div>
              <p style="color:#8892b0;font-size:13px;line-height:1.6;margin:0;">
                You may also reach us directly on WhatsApp or call our sales office. Please keep your reference number handy for faster service.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #2a3555;text-align:center;">
              <p style="color:#8892b0;font-size:12px;margin:0;">Rock One Square · Raj Nagar Extension, Ghaziabad, UP · Developed by Senflore Hospitality LLP</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export async function sendEnquiryNotification(data: EnquiryNotificationData): Promise<{
  adminEmailSent: boolean
  confirmationEmailSent: boolean
  error?: string
}> {
  if (!isResendConfigured()) {
    console.warn('[Notifications] RESEND_API_KEY not configured — email notifications disabled')
    return { adminEmailSent: false, confirmationEmailSent: false, error: 'Email not configured' }
  }

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  const salesEmail = process.env.SALES_EMAIL
  const fromEmail = process.env.EMAIL_FROM!

  let adminEmailSent = false
  let confirmationEmailSent = false
  let error: string | undefined

  // Send to sales team
  if (salesEmail) {
    try {
      await resend.emails.send({
        from: fromEmail,
        to: salesEmail,
        subject: `New Lead [${data.referenceId}] — ${formatEnquiryType(data.enquiryType)} from ${data.fullName}`,
        html: buildAdminEmailHtml(data),
      })
      adminEmailSent = true
    } catch (err) {
      console.error('[Notifications] Failed to send admin email:', err)
      error = 'Admin email failed'
    }
  }

  // Send confirmation to customer
  if (data.email) {
    try {
      await resend.emails.send({
        from: fromEmail,
        to: data.email,
        subject: `Your enquiry has been received — Rock One Square [${data.referenceId}]`,
        html: buildConfirmationEmailHtml(data),
      })
      confirmationEmailSent = true
    } catch (err) {
      console.error('[Notifications] Failed to send confirmation email:', err)
      error = error ? `${error}; Confirmation email failed` : 'Confirmation email failed'
    }
  }

  return { adminEmailSent, confirmationEmailSent, error }
}
