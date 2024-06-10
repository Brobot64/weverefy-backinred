import { verifyBVN, verifyBusiness } from "./YouVerify";
import accountModel, { KYCStatus, UserType } from "./models/accounts";
import businessModel from "./models/business";


export const verifyUserByBVN = async (data: any) => {
    try {
        const { id } = data;
        const account = await accountModel.findById(id).select(" bkvn firstname lastname metadata ");
        if (account) {
            const results = await verifyBVN(account?.bkvn)
            if (!results?.success) {
                return { msg: "Error fetching account details", success: false };
            }
            const { firstName, lastName, image, mobile, gender, metadata, dateOfBirth } = results.data;

            if (
                account.firstname.toLocaleLowerCase() === firstName.toLocaleLowerCase() &&
                account.lastname.toLocaleLowerCase() === lastName.toLocaleLowerCase()
            )  {
                account.kyc = KYCStatus.Tier1;
                account.metadata = {
                    metadata,
                    gender,
                    dateOfBirth
                }
                await account.save();

                return { msg: "User Verified and Cleared", success: true }
            }
            return { msg: "Invalid Credentials\n Check your details", success: false };
        }
        return { msg: "Unable to verify user", success: false }
    } catch (error: any) {
        throw new Error(error?.message);
    }
}

export const verifyUserByNIN = async (data: any) => {
    try {
        const { id } = data;
        const account = await accountModel.findById(id).select(" nimc ");
        if (account) {
            const results = await verifyBVN(account?.bkvn)

            if (!results?.success) {
                return { msg: "Error fetching account details", success: false };
            }
            const { firstName, lastName, image, mobile, gender, metadata, dateOfBirth } = results.data;

            if (
                account.firstname.toLocaleLowerCase() === firstName.toLocaleLowerCase() &&
                account.lastname.toLocaleLowerCase() === lastName.toLocaleLowerCase()
            )  {
                // if 
                account.kyc = KYCStatus.Tier1;
                account.metadata = {
                    metadata,
                    gender,
                    dateOfBirth
                }
                await account.save();

                return { msg: "User Verified and Cleared", success: true }
            }
            return { msg: "Invalid Credentials\n Check your details", success: false };
        }
        return { msg: "Unable to verify user", success: false }
    } catch (error: any) {
        throw new Error(error?.message); 
    }
}

export const verifyAccountBusiness = async (data: any) => {
    try {
        const { id } = data;
        const business = await businessModel.findOne({ user: id }).populate('user', 'email lastname firstname kyc nimc metadata').exec();

        if (business) {
            const {biz_reg_no, biz_country_op} = business
            const results = await verifyBusiness(biz_reg_no, biz_country_op);

            if(!results?.success) {
                return { msg: "Error fetching business details", success: false };
            }

            const {name, activity, dateDisolved, tin, companyContactPersons, activityDescription, keyPersonnel, type} = results.data;
            
            // @ts-ignore
            const companyName = `${business.user.firstname}${business.user.lastname} `;

            // @ts-ignore
            if (companyName.toLocaleLowerCase() === name.toLocaleLowerCase() && business.user.nimc === tin) {
                 // @ts-ignore
                business.user.kyc = KYCStatus.Tier1;
                 // @ts-ignore
                business.user.metadata = {
                    companyContactPersons,
                    dateDisolved,
                    tin,
                    activity,
                    activityDescription,
                    keyPersonnel,
                    type
                }
                await business.save();

                return { msg: "Business Verified and Cleared", success: true }
            }
            return { msg: "Invalid Credentials\n Check your details", success: false };            
        }
        return { msg: "Unable to verify business", success: false }
    } catch (error: any) {
        throw new Error(error?.message);
    }
}