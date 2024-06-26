import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv'
import cors from 'cors';
import { getAuth } from "./src/middleware";
dotenv.config();
const morgan = require('morgan');
import idRoutes from './src/routes';


const app: Express = express();
const PORT = process.env.PORT || 3004;

// Setting Up CORs
let whitelist: string[] = [
    "https://localhost:5001",
    "https://gateway-slwi.onrender.com"
]

if (process.env.NODE_ENV === "production") {
    whitelist = [
        ...whitelist,
        "https://weverefy.com",
    ];
}

const corsOptions = {
    origin: (origin: any, callback: any) => {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback("Not allowed by CORS", false);
        }
    },
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(express.json({ limit: "20mb" }));
app.use(morgan("tiny"));
app.use(getAuth);

app.use('/', idRoutes);
// app.get('/', (req: Request, res: Response) => {
//     res.send("Express and Typescript");
// })

app.listen(PORT, () => {
    console.log(`Identity Service running on port: ${PORT}`);
})