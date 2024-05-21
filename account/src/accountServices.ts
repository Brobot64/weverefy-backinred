import accountModel, { KYCStatus, UserStatus, UserType } from "./models/accounts";
import { dataEncryption, dataDecryption, cryptHash, tokenizeUser } from "./utils/handleEncryption";
import { generateOTP } from "./utils/token";

export interface TAccount extends Document{
    email: string;
    firstname: string;
    lastname: string;
    phone_number: string;
    passwrd: string;
    confirmpasswrd: string;
    // account_type: UserType;
    // account_status: UserStatus;
    // kyc: KYCStatus;
    // pta: string;
    // lastLogin: Date;
}

export const signUpUser = async (data: TAccount, usertype?: string) => {
    try {
        const {
            email,
            firstname,
            lastname,
            phone_number,
            passwrd,
            confirmpasswrd
        } = data;

        // Password Check
        if(passwrd !== confirmpasswrd) {
            throw new Error("Password not match!!");
        };

        const userExist = await accountModel.findOne({ email });
        if(userExist) {
            throw new Error("User already exist");
        };

        const phonenoExist = await accountModel.findOne({ phone_number });
        if(phonenoExist) {
            throw new Error("Phone number already taken!!");
        }

        const hashed = await cryptHash(passwrd);

        const user = new accountModel({
            firstname,
            lastname,
            email,
            phone_number,
            passwrd: hashed,
            account_type: usertype !== "admin" ? (usertype === "personal" ? UserType.Personal : UserType.Business) : UserType.Admin,
        });

        const token = generateOTP(6);
        user.pta = token;
        const userRegistration = await user.save();
        if (userRegistration.pta) {
            const [tkn, expt] = userRegistration.pta.split('.');
            
            const tokenized = tokenizeUser({
                id: userRegistration.id,
                account_type: userRegistration.account_type,
            });

            return {
                msg: "Account created successfully",
                token: tokenized
            }
        }


    } catch (error: any) {
        throw new Error(error?.message)
    }
}