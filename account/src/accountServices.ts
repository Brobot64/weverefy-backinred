import { compare } from "bcryptjs";
import accountModel, { IAccount, UserType } from "./models/accounts";
import { cryptHash, tokenizeUser, DbEncryption, detokenizeUser } from "./utils/handleEncryption";
import sendMail from "./utils/mail";
import { generateOTP, verifyOTP } from "./utils/token";
import sendVerificationSMS from "./utils/smsMessaging";
import { tempTokenStore } from "./utils/tokenHanlder";
import { createBusiness } from "./businessServices";
import { IBusiness } from "./models/business";

export interface TAccount extends Document{
    email: string;
    firstname: string;
    lastname: string;
    phone_number: string;
    passwrd: string;
    confirmpasswrd: string;
    bvn: string;
    address: string;
    biz_type: string,
    biz_reg_no: string,
    biz_sector: string,
    biz_website: string,
    biz_social: string,
    biz_employee_no: number,
    biz_country_op: string,
    // account_type: UserType;
    // account_status: UserStatus;
    // kyc: KYCStatus;
    // pta: string;
    // lastLogin: Date;
}

export const detokUser = async (token: string) => {
    try {
        const account = await detokenizeUser(token);
        //@ts-ignore
        const { id } = account;
        const accountData = await accountModel.findById(id).select("-passwrd -transc_tkn -nimc -bkvn");

        if(!accountData) {
            throw new Error("Invalid Token");
        }
        return accountData;

    } catch (error: any) {
        throw new Error("Invalid Token");
    }
}

export const signUpUser = async (data: Partial<TAccount>, verificationCode: string, usertype?: string) => {
    try {
        const {
            email,
            firstname,
            lastname,
            phone_number,
            passwrd,
            confirmpasswrd,
            bvn,
            address,
            biz_type,
            biz_reg_no,
            biz_sector,
            biz_website,
            biz_social,
            biz_employee_no,
            biz_country_op
        } = data;

        // Token Check First

        //@ts-ignore
        const isValidCode = await tempTokenStore.verifyToken(email, phone_number, verificationCode);

        if(!isValidCode) {
            throw new Error("Invalid Verification Code");
        }

        // @ts-ignore
        await tempTokenStore.deleteToken(email, phone_number);

        // Ended new lineys



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

        // @ts-ignore
        const hashed = await cryptHash(passwrd);

        const user = new accountModel({
            firstname,
            lastname,
            email,
            phone_number,
            passwrd: hashed,
            account_type: usertype !== "admin" ? (usertype === "personal" ? UserType.Personal : UserType.Business) : UserType.Admin,
            bkvn: bvn,
            address,
        });

        const token = generateOTP(6);
        user.pta = token;
        const userRegistration = await user.save();
        if (userRegistration.pta) {
            const [tkn, expt] = userRegistration.pta.split('.');
            await sendMail(
                userRegistration.email,
                userRegistration,
                tkn,
                "others"
            );
            await sendVerificationSMS(
                userRegistration.phone_number,
                tkn
            );
            
            const tokenized = await tokenizeUser({
                id: userRegistration.id,
                account_type: userRegistration.account_type,
            });

           if (usertype === UserType.Business) {
            // if (!biz_type || !biz_reg_no || !biz_sector || !biz_employee_no || !biz_country_op) {
            //     throw new Error("Missing required business information");
            // }

            const businessData = {
                user: userRegistration._id,
                biz_type,
                biz_reg_no,
                biz_sector,
                biz_website,
                biz_social,
                biz_employee_no,
                biz_country_op,
            }
            // @ts-ignore
            const registedBusiness = await createBusiness(businessData)
           }

            return {
                msg: "Account created successfully",
                token: tokenized
            }
        }


    } catch (error: any) {
        throw new Error(error?.message)
    }
}


export const signInUser = async (data: any) => {
    try {
       const { phone_number, password } = data;
       const userExist = await accountModel.findOne({ phone_number }).select(" passwrd lastLogin account_type ").exec();

       if (!userExist) {
        throw new Error("User Not existing");
       }

       const [encryptPss, slag] = userExist.passwrd.split('%$');
       const passEncrpt = DbEncryption(password, slag);

       if (!(await compare(passEncrpt.encryptedData, encryptPss))) {
        throw new Error("Invalid Credentials");
       }

       userExist.lastLogin = new Date(Date.now());
       await userExist.save();

       return {
        token: await tokenizeUser({
            id: userExist._id,
            account_type: userExist.account_type,
        }),
       };

       
    } catch (error: any) {
        throw new Error(error?.message)
    }
}

export const verifyAccountEmail = async (token: string, otp: string) => {
    try {
        const account = await detokUser(token);
        const OTPVerify = verifyOTP(account.pta?.toString() || "");
        
        if(!OTPVerify) {
            throw new Error("Invalid Token");
        }

        if(Number(OTPVerify) !== Number(otp)) {
            throw new Error("Invalid token");
        };
        if (account.isEmailVerified === true) {
            throw new Error("User already Verified");
        }
        account.isEmailVerified = true;
        account.pta = "";
        await account.save();
        return {success: true, msg: "User Email verified"};
    } catch (error: any) {
        throw new Error(error?.message);
    }
}

// resend verification
export const resendVerification = async (token: string) => {
    try {
      const account = await detokUser(token);
      if(!account) {
        throw new Error("Unauthorized");
      }
  
      const otp = generateOTP(6);
      account.pta = otp;
      const [tkn, expt] = otp.split('.');
      await sendMail(
        account.email,
        account,
        tkn,
        "others"
      );

      await sendVerificationSMS(
        account.phone_number,
        tkn
    );
      await account.save();
      
      return {msg:"Verfication Mail sent"}
  
    } catch (error: any) {
      throw new Error(error.message);
    }
}


// Get User Info
export const getUserInfo = async (token: string) => {
    try {
      const user = await detokUser(token);
      return user
    } catch (error: any) {
      throw new Error(error.message);
    }
}

export const updateAccount = async (token: string, data: Partial<IAccount>) => {
    try {
        const user = await detokUser(token);
        if(!user) {
            throw new Error("Unauthorized");
        }

        // if(!user.isEmailVerified) {
        //     throw new Error("Unverified User");
        // }

        const updatedAccount = await accountModel.findByIdAndUpdate(
            user._id,
            { $set: data },
            { new: true }
         );

        if (!updatedAccount) {
            throw new Error("Account not found");
        }

        return { msg: "Account Update" }
    } catch (error: any) {
        throw new Error(error.message);
    }
}


/**
 * 
 * Set Up Tmp Token Verification
 * 
 **/

export const resendTempToken = async (data: any) => {
    try {
        const { email, phone_number } = data;
       const action = await tempTokenStore.resendOTP(email, phone_number);
       if (action) {
        await sendVerificationSMS(
            phone_number,
            action
        );

        return {
            msg: "Verification Sent"
        }
       } 

       return "Error sending Verification"
    } catch (error: any) {
        throw new Error(error.message)
    }
}
