import { Request, Response } from "express";
import { createTransport, TransportOptions } from "nodemailer";

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "c41264170@gmail.com",
    pass: "gmnk pgyq vlmo wevv",
  },
} as TransportOptions);

const sendMail = async (req: Request, res: Response) => {
  try {
    const { to, subject, text } = req.body;
    const mailOptions = {
      from: '"Crash Test" <c41264170@gmail.com>',
      to: to,
      subject: subject,
      text: text,
    };
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Mail sent", info });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send mail" });
  }
};

const externalSendMail = async (to: string, subject: string, text: string) => {
  try {
    const mailOptions = {
      from: '"Crash Test" <c41264170@gmail.com>',
      to: to,
      subject: subject,
      text: text,
    };
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Mail sent" };
  } catch (err) {
    return { success: false, error: "Failed to send mail" };
  }
};

export { sendMail, transporter, externalSendMail };
