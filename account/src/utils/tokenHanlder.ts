import TempToken from "../models/tempToken";
import { generateOTP } from "./token";

export const tempTokenStore = {
    saveToken: async (email: string, phone_number: string, token: string) => {
        const tempToken = new TempToken({ email, phone_number, token });
        await tempToken.save();
    },

    verifyToken: async (email: string, phone_number: string, token: string): Promise<boolean> => {
        const tempToken = await TempToken.findOne({ email, phone_number, token });
        return !!tempToken;
    },

    deleteToken: async (email: string, phone_number: string) => {
        await TempToken.deleteOne({ email, phone_number });
    },

    resendOTP: async (email: string, phone_number: string) => {
        const token = generateOTP(4);
        const [tkn, expt] = token.split('.');
        const updatedToken = await TempToken.findOneAndUpdate(
            { email, phone_number },
            { token: tkn, createdAt: Date.now() }, // Reset the createdAt to extend the expiration
            { new: true, upsert: true } // Create a new document if not found
        );

        if (!updatedToken) return null;
        return tkn;
    }
};
