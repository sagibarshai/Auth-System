import nodemailer from "nodemailer";

interface VerifyEmailProperties {
  to: string;
  token: string;
  id: number;
}
export const sendEmailVerification = (verifyEmailProperties: VerifyEmailProperties) => {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: verifyEmailProperties.to,
    subject: "Account verification",
    text: `Verify your account here: http://localhost:4000/api/auth/emailVerification/${verifyEmailProperties.id}/${encodeURIComponent(
      verifyEmailProperties.token
    )}
      `,
  };

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_ACCESS_KEY,
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) throw error;
    return info;
  });
};
