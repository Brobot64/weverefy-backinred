import accountModel from "./src/models/accounts";
import { generateOTP } from "./src/utils/token";
import { tempTokenStore } from "./src/utils/tokenHanlder";
import sendVerificationSMS from "./src/utils/smsMessaging";


export const initiateSignUp = async (email: string, phone_number: string) => {
    try {
        const userExist = await accountModel.findOne({
            $or: [{ email }, { phone_number }]
        });

        if (userExist) {
            throw new Error("Details already taken")
        }

        const token = generateOTP(4);
        const [tkn, expt] = token.split('.');
        await tempTokenStore.saveToken(email, phone_number, tkn);

        // await sendMail(email, token, "others");
        await sendVerificationSMS(phone_number, tkn);

        return {
            msg: "Verification code sent successfully"
        }
    } catch (error: any) {
        throw new Error(error?.message);
    }
}
