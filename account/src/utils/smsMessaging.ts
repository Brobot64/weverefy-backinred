import { Twilio } from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSID = process.env.TWL_SID;
const accountAuthTkn = process.env.TWL_TKN;
const adminNumber = process.env.TWL_NUM;

const client = new Twilio(accountSID, accountAuthTkn);

const sendVerificationSMS = async (phoneNumber: string, verificationToken: string): Promise<void> => {
    try {
        const message = await client.messages.create({
            body: `WEVEREFY-\nYour verification code is: \n ${verificationToken}`,
            to: phoneNumber,
            from: adminNumber,
        });
    } catch (error: any) {
        console.log(error?.message)
    }
}

export default sendVerificationSMS;