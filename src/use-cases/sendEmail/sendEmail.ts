import nodemailer from "nodemailer";
import { EmailNotFoundError } from "../errors/email-error";

export class SendEmail {
    private transporter;
    
    constructor(private email: string) {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "davineri0106@gmail.com",
                pass: "kpds trsm laxn zkdm"
            },
        });
    }

    async send(subject: string, text: string) {
        const mailOptions = {
            from: "davineri0106@gmail.com",
            to: this.email,
            subject,
            text
        };

        try {
            console.log("Enviando email...");
            await this.transporter.sendMail(mailOptions);
            console.log("Email enviado com sucesso.");
        } catch (err) {
            console.error("Erro real ao enviar email:", err);
            throw new EmailNotFoundError();
        }
    }
}