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
    Unverified = "unverified",
    Tier1 = "tier1"
}

export enum AGender {
    Male = "male",
    Female = "female",
    Nonbinary = "not_applicable"
}

export interface IAccount {
    email: string;
    firstname: string;
    lastname: string;
    phone_number: string;
    passwrd: string;
    account_type: UserType;
    account_status: UserStatus;
    transc_tkn: string;
    kyc: KYCStatus;
    isEmailVerified: boolean;
    pta: string;
    bkvn: string;
    nimc: string;
    address: string;
    lastLogin: Date;
    metadata: {}
}


// bvn, first, last, gender, address, dob, phone\
// bvn, nin, email, phone, type, brn, first, last, dob, address, sector, website, social, no-emply, country-opetr


const accountSchemaFields: Record<keyof IAccount, any> = {
    email: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    passwrd: { type: String, required: true },
    phone_number: { type: String, required: true },
    account_status: { type: String, enum: UserStatus, default: UserStatus.Inactive },
    isEmailVerified: { type: Boolean, default: false },
    transc_tkn: { type: String, default: "" },
    bkvn: { type: String, required: true },
    address: { type: String, required: true },
    nimc: { type: String },
    account_type: { type: String, enum: UserType, required: true },
    kyc: { type: String, default: KYCStatus.Unverified },
    pta: { type: String },
    lastLogin: { type: Date, default: Date.now() },
    metadata: { type: Object, default: {} }
}

const accountSchema: Schema = new Schema (
    accountSchemaFields, {
        timestamps: true,
    }
);

const accountModel = ACCOUNT_DB.model<IAccount>("account", accountSchema);

export default accountModel;