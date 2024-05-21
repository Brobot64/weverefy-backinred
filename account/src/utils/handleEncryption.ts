import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config();
import { hash } from 'bcryptjs'
import mongoose from 'mongoose';
import { UserType } from '../models/accounts';
import jwt from 'jsonwebtoken'

const key = Buffer.from(`${process.env.ENCRYPTION_KEY}`, 'hex');
const secret = process.env.SECRET_MSG || '';
const ivLength = Number(process.env.IVLENGTH);
const jwtSecret = process.env.JWT_SECRET || 'birmingham'
const maxAge = 60 * 30 * 24 * 7;

export const dataEncryption = (text: any) => {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    const textWithSecret = secret + text;

    let encryptedData = cipher.update(textWithSecret, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return {
        iv: iv.toString('hex'),
        encryptedData
    };
}

export const DbEncryption = (text: any, encrytionIV: string) => {
    const iv = Buffer.from(encrytionIV, 'hex');
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    const textWithSecret = secret + text;

    let encryptedData = cipher.update(textWithSecret, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return {
        encryptedData
    };
}

export const dataDecryption = (data: any) => {
    const iv = Buffer.from(data.iv, 'hex');
    const encryptedText = Buffer.from(data.encryptedData, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)

    // @ts-ignore
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');

    // @ts-ignore
    decrypted += decipher.final('utf8');

    const decryptedText = decrypted.replace(secret, '');
    return decryptedText;
    
}

export const cryptHash = async (text: string) => {
    const fixed = dataEncryption(text);
    const hashedEntry = await hash(fixed.encryptedData, Number(process.env.BCYPTPHSLT));
    const hashy = `${hashedEntry}.${fixed.iv}`
    return hashy;
}

// export const deCryptHash = async (hash: string) => {
//     const deHashed = await compare(hash, )
// }

export const tokenizeUser = async(payload: {
    id: mongoose.Types.ObjectId;
    account_type: UserType;
}) => {
    return jwt.sign({ ...payload }, jwtSecret, {
        encoding: '',
        expiresIn: maxAge,
    })
}

export const detokenizeUser = async (token: string) => {
    try {
        const decoded = jwt.verify(token, jwtSecret);
        return decoded;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

