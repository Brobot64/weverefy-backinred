import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET || 'birmingham'



// export const tokenizeUser = async(payload: {
//     id: mongoose.Types.ObjectId;
//     account_type: UserType;
// }) => {
//     return jwt.sign({ ...payload }, jwtSecret, {
//         encoding: '',
//         expiresIn: maxAge,
//     })
// }

export const detokenizeUser = async (token: string) => {
    try {
        const decoded = jwt.verify(token, jwtSecret);
        return decoded;
    } catch (error: any) {
        console.log(error.message);
    }
}
