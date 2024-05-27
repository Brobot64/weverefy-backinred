import nodemailer from 'nodemailer'
import { TAccount } from '../accountServices'
import { generateRegistrationToken } from './mailTempplates'


const client = nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.mailtrap.io",
    port: (process.env.MAIL_PORT as unknown as number) || 2525,
    secure: true,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});


const sendMail = async (
    emaiil: string,
    user: Partial<TAccount>,
    token: string,
    type:
        | "confirmation"
        | "reset-password"
        | "others"
) => {
    try {
        let subject, HtmlBody;

        switch (type) {
            case "reset-password":
                break;
            default: 
                subject = "Welcome to Weverefy Inc.";
                HtmlBody = generateRegistrationToken(
                    `${user.firstname}`,
                    token
                );
        }

        let response = await client.sendMail({
            from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
            to: emaiil,
            subject: subject,
            html: HtmlBody
        });

        return { error: null, response: response }
        
    } catch (error: any) {
        return { error, response: null }
    }
}

export default sendMail;