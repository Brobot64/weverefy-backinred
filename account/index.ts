import express, {Express} from 'express'
import cors from'cors'
import dotenv from 'dotenv'
import { DbEncryption, dataDecryption, dataEncryption } from './src/utils/handleEncryption';
dotenv.config();
import allRoutes from './src/routes'
const morgan = require('morgan');

const app: Express = express();
const PORT = process.env.PORT || 3002;

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

// console.log(dataDecryption(
//     {
//         iv: 'e3f2d3beac039fddd15de01ff90c4e1b',
//         encryptedData: '690f05fe3502d33e29cb86783c40a7895c7afab30683a30d87f5e5cff1eb0c8984fe70db43c6c8fa7b178167dae5a739'
//       }
// ));

// console.log(DbEncryption("google hting", "6fa734b54b6ba7a40903104bc218dc6c"))

// console.log(dataEncryption("google hting"));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(express.json({ limit: "20mb" }));
app.use(morgan("tiny"));

app.use('/', allRoutes);

app.listen(PORT, () => {
    console.log(`Account Service running on port ${PORT}`)
})