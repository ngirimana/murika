import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
export const sendEmails = async (
  receiverEmail,
  receiverName,
  receiverEmailToken,
  currentUrl,
) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: `${receiverEmail.toString()}`,
    from: process.env.FROM, // Use the email address or domain you verified above
    subject: 'Verify Your Email Address',
    text: `Hello ${receiverName}, thank you for registering on our site.
      Please copy link address below and paste in your browser to verify your account.
      http://${currentUrl}/api/v1/auth/emailverification/${receiverEmailToken}`,
    html: `
      <h1>Hello ${receiverName} </h1>
      <p>thank you for registering on our site.</p>
      <p>Please copy link address below and paste in your browser to verify your account.</p>
      <a href="http://${currentUrl}/api/v1/auth/emailverification/${receiverEmailToken}"> Verify Your Account</a>
      `,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    process.stdout.write(error);

    if (error.response) {
      process.stdout.write(error.response.body);
    }
  }
};
