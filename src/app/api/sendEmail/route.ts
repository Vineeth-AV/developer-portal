import { NextRequest, NextResponse } from 'next/server';
import { createTransport } from 'nodemailer';
import type { FeedbackData } from 'types';

const to = 'vineeth.av@verteil.com';
const from = 'vinuverteil@gmail.com';

// Create a transporter of nodemailer
const transporter = createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: false,
   auth: {
    user: process.env.NEXT_EMAIL,
    pass: process.env.NEXT_PASSWORD
  }
});

export async function POST(request: NextRequest) {
  const data: FeedbackData = await request.json();

  // Sanitize the feedback data
  const sanitizeInput = (input: string) =>
    input
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');

  const sanitizedData = Object.fromEntries(
    Object.entries(data).map(([key, originalValue]) => {
      if (originalValue == null || typeof originalValue !== 'string')
        return [key, originalValue];
      return [key, sanitizeInput(originalValue)];
    })
  ) as FeedbackData & { path: string; option: string; title: string };

  // Construct the URL of the page using the request and path
  const origin = request.headers.get('origin');
  const pageUrl = origin + sanitizedData.path;
  const result = await sendFeedback(to, from, pageUrl, sanitizedData);

  // Check if email was sent successfully
  const success = result.accepted.length > 0;

  // Log error if email was not sent successfully
  if (!success) {
    console.error('Error sending feedback email: ', result);
  }

  // Return response
  return new NextResponse(
    success ? 'Email sent successfully' : 'Error sending email',
    {
      status: success ? 200 : 500,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

async function sendFeedback(
  to: string,
  from: string,
  url: string,
  data: FeedbackData
) {
  const { email, option, additionalFeedback, title } = data;
  return await transporter.sendMail({
    from,
    to,
    replyTo: email,
    subject: 'Feedback from Verteil Doc',
    html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        <html lang="en">
          <head></head>
          <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">A user left Feedback for Verteil Docs<div></div>
          </div>
          <body style="margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;background-color:rgb(255,255,255);font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;">
            <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin-left:auto;margin-right:auto;margin-top:40px;margin-bottom:40px;width:465px;border-radius:0.25rem;border-width:1px;border-style:solid;border-color:rgb(234,234,234);padding:20px">
              <tr style="width:100%">
                <td>
                  <h1 style="margin-left:0px;margin-right:0px;margin-top:40px;margin-bottom:40px;padding:0px;text-align:center;font-size:24px;font-weight:400;color:rgb(0,0,0);line-height:20px;">A user left <strong>Feedback</strong> <br><br/> for Verteil Docs</h1>
                  <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Hello,</p>
                  <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">${
                    email
                      ? `<a target="_blank" style="color:rgb(37,99,235);text-decoration:none;text-decoration-line:none" href="${email}">${email}</a>`
                      : 'An anonymous user'
                  } has left some feedback on the documentation page '<strong>${title}</strong>' on <strong>Verteil Docs</strong>.</p>
                  <ul style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0);list-style-type:none;text-align:left;list-style-position: inside;">
                    <li style="padding:10px;"><strong>Selected option:</strong><br/>${option}</li>
                
                    <li style="padding:10px;padding-bottom:0px"><strong>Additional feedback:</strong><br/>${
                      additionalFeedback ?? 'None'
                    }</li>
                  </ul>
                  <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%" style="margin-bottom:32px;margin-top:32px;text-align:center">
                    <tbody>
                      <tr>
                        <td><a href="${url}" target="_blank" style="p-x:20px;p-y:12px;line-height:100%;text-decoration:none;display:inline-block;max-width:100%;padding:12px 20px;border-radius:0.25rem;background-color:rgb(0,0,0);text-align:center;font-size:12px;font-weight:600;color:rgb(255,255,255);text-decoration-line:none"><span></span><span style="p-x:20px;p-y:12px;max-width:100%;display:inline-block;line-height:120%;text-decoration:none;text-transform:none;mso-padding-alt:0px;mso-text-raise:9px">View the page</span><span></span></a></td>
                      </tr>
                    </tbody>
                  </table>
                  <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">or copy and paste this URL into your browser: <a target="_blank" style="color:rgb(37,99,235);text-decoration:none;text-decoration-line:none" href="${url}">${url}</a></p>
                  <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin-left:0px;margin-right:0px;margin-top:26px;margin-bottom:26px;border-width:1px;border-style:solid;border-color:rgb(234,234,234)" />
                  <p style="font-size:12px;line-height:24px;margin:16px 0;color:rgb(102,102,102)">This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.</p>
                </td>
              </tr>
            </table>
          </body>
        </html>
    `
  });
}
