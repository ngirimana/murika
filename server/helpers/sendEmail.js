import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export const sendEmails = async (
  receiverEmail,
  receiverName,
  receiverEmailToken,
  currentUrl,
) => {
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

export const forgotPasswordEmails = async (email, name, token, url) => {
  const data = {
    to: `${email.toString()}`,
    from: process.env.FROM, // Use the email address or domain you verified abov
    subject: 'Forgot Password Link',
    text: `Hello ${name} ,.
     Please copy link below and paste in your browser to rest your password.
      http://${url}/api/v1/auth/reset-password/${token}`,
    html: `
      <p>Hello ${name}.</p>
      <p>Please click on the link below  in your browser to reset your password.</p>
      <a href="http://${url}/api/v1/auth/reset-password/${token}"> Reset Your Password</a>
      `,
  };
  try {
    await sgMail.send(data);
  } catch (error) {
    process.stdout.write(error);
    if (error.response) {
      process.stdout.write(error.response.body);
    }
  }
};
