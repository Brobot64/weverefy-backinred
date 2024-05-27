import { Document, Schema } from 'mongoose';
import { ACCOUNT_DB } from '../dbConnection';

interface ITempToken extends Document {
    email: string;
    phone_number: string;
    token: string;
    createdAt: Date;
}

const tempTokenSchema: Schema = new Schema({
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 12000 } // 300 seconds = 5 minutes
});

const TempToken = ACCOUNT_DB.model<ITempToken>('TempToken', tempTokenSchema);

export default TempToken;
