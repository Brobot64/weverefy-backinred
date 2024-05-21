import express, { Express } from "express";
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
const morgan = require('morgan');

const app: Express = express();
const PORT = process.env.PORT || 3003;


// Setting Up CORs
let whitelist: string[] = [
    "https://localhost:5001",
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


app.listen(PORT, () => {
    console.log(`Payment Service running on port ${PORT}`)
})