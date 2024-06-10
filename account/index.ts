import express, {Express, Request, Response} from 'express'
import cors from'cors'
import dotenv from 'dotenv'
dotenv.config();
import allRoutes from './src/routes'
import timeOutMiddleWare from './src/middleware/middies';
const morgan = require('morgan');

const app: Express = express();
const PORT = process.env.PORT || 3003;

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
// app.use(timeOutMiddleWare(10000));
// app.get('/', (req: Request, res: Response) => {
//     res.send("Accounts and Typescript");
// })
app.use('/', allRoutes);

app.listen(PORT, () => {
    console.log(`Account Service running on port ${PORT}`)
})