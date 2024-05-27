import { verifyBVN } from "./YouVerify";
import accountModel, { UserType } from "./models/accounts";
import businessModel from "./models/business";


export const verifyUserByBVN = async (data: any) => {
    try {
        const { id } = data;
        const account = await accountModel.findById(id).select(" bkvn ");
        if (account) {
            const results = await verifyBVN(account?.bkvn)
            return results;
        }
        return { msg: "Unable to verify user", success: false }
    } catch (error: any) {
        throw new Error(error?.message);
    }
}