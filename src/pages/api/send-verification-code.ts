import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

interface RequestBody {
  toEmail: string;
  code: string;
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
  if (req.method === 'POST') {
    const { toEmail, code } = req.body as RequestBody;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: 'FileFerry - Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
          <h2>Welcome to FileFerry</h2>
          <p>To verify your email, use the following verification code:</p>
          <h3 style="font-size: 30px;">${code}</h3>
          <p>If you didn't request this code, please ignore this email.</p>
          <p>Visit us: <a href="https://filefery.vercel.app" target="_blank">FileFerry</a></p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Verification code sent successfully' });
    } catch (error) {
      res.status(500).json({ error: error , msg: 'Failed to send verification email' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
