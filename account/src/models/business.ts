import { Schema } from "mongoose";
import { ACCOUNT_DB } from "../dbConnection";


export interface IBusiness {
    user: string | Schema.Types.ObjectId;
    biz_type: string,
    biz_reg_no: string,
    biz_sector: string,
    biz_website: string,
    biz_social: string,
    biz_employee_no: number,
    biz_country_op: string,
}


const businessSchemaFields: Record<keyof IBusiness, any> = {
    user: { type: Schema.Types.ObjectId, ref: 'account', required: true, unique: true },
    biz_type: { type: String, required: true },
    biz_reg_no: { type: String, required: true },
    biz_sector: { type: String },
    biz_website: { type: String },
    biz_social: { type: String, required: false },
    biz_employee_no: { type: Number },
    biz_country_op: { type: String, required: true }
}

const businessSchema: Schema = new Schema (
    businessSchemaFields, {
        timestamps: true,
    }
);


const businessModel = ACCOUNT_DB.model<IBusiness>("business", businessSchema);

export default businessModel;