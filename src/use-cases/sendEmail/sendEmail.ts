import { EmailNotFoundError } from "../errors/email-not-found-error";
const nodemaler = require("nodemailer")

let transporter = nodemaler.createTransport({
    service: "",
    auth: {
        user: "",
        pass: ""
    },
});

let options = {
    from: "",
    to: "",
    subject: "",
    text: ""
}

export const sendEmail = async () => {
    try {
        console.log("Enviando email")
        await transporter.sendEmail(options);
        console.log("email enviado")
        process.exit()
    }catch (err){
        throw new EmailNotFoundError()
    }
}