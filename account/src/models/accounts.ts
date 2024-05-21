import { Schema } from "mongoose";
import { ACCOUNT_DB } from "../dbConnection";

export enum UserType {
    Admin = "admin",
    Personal = "personal",
    Business = "business"
}

export enum UserStatus {
    Suspend = "suspend",
    Active = "active",
    Banned = "banned",
    Inactive = "inactive"
}

export enum KYCStatus {
    Verified = "verified",
    Unverified = "unverified"
}

export interface IAccount {
    email: string;
    firstname: string;
    lastname: string;
    phone_number: string;
    passwrd: string;
    account_type: UserType;
    account_status: UserStatus;
    kyc: KYCStatus;
    pta: string;
    lastLogin: Date;
}

const accountSchemaFields: Record<keyof IAccount, any> = {
    email: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    passwrd: { type: String, required: true },
    phone_number: { type: String, required: true },
    account_status: { type: String, enum: UserStatus, default: UserStatus.Inactive },
    account_type: { type: String, enum: UserType, required: true },
    kyc: { type: String, default: KYCStatus.Unverified },
    pta: { type: String },
    lastLogin: { type: Date, default: Date.now() }
}

const accountSchema: Schema = new Schema (
    accountSchemaFields, {
        timestamps: true,
    }
);

const accountModel = ACCOUNT_DB.model<IAccount>("account", accountSchema);

export default accountModel;