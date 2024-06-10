import express, { Express, Response, Request, NextFunction } from 'express';
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
const morgan = require('morgan');
import { createProxyMiddleware } from "http-proxy-middleware";
import helmet from 'helmet';
import needle from 'needle';
import docsRouter from './src/doc'

const app: Express = express();
const PORT = process.env.PORT || 5001;


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 50,
    standardHeaders: 'draft-7',
    message: { // Customize the response message
        code: 429,
        status: 'Too Many Requests, Please try again later on.'
    },
});


// Whitelist CORS
let whitelist: string[] = [
    "http://localhost:5001",
    "https://gateway-slwi.onrender.com"
];

if (process.env.NODE_ENV !== "development") {
    whitelist = [
        ...whitelist,
        "http://api.weverefy.com/"
    ];
}

const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback("CORS error", false);
        }
    },
}

app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.json({ limit: "20mb" }));
// if (process.env.NODE_ENV === "development") 
app.use(morgan('tiny'));
app.use(cors(corsOptions));
app.use(limiter);
app.use(helmet());

app.get('/', (req: Request, res: Response) => {
    res.send("Express and Typescript");
})


const proxyRequest = async (req: Request, res: Response, target: string): Promise<void> => {
    try {
        const url = `${target}${req.url}`;
        console.log(`Proxying request to: ${url}`);

        const options = {
            headers: { ...req.headers },
            json: req.is('application/json'),
            rejectUnauthorized: false,
        };

        const response = await needle(req.method as needle.NeedleHttpVerbs, url, req.body, options as any);
        
        res.status(response.statusCode as any).send(response.body);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error proxying request: ${error.message}`);
            res.status(500).json({ message: 'Proxy error', error: error.message });
        } else {
            console.error('Unknown error occurred during proxying');
            res.status(500).json({ message: 'Unknown proxy error' });
        }
    }
};

const accountUrl = process.env.NODE_ENV !== "development" ? "https://account-a3fp.onrender.com" : "http://localhost:3003";
const identityUrl = process.env.NODE_ENV !== "development" ? "https://identity-46dj.onrender.com" : "http://localhost:3004";


app.use("/docs", docsRouter);


app.use('/account', (req: Request, res: Response) => {
    proxyRequest(req, res, accountUrl);
});

app.use('/identity', (req: Request, res: Response) => {
    proxyRequest(req, res, identityUrl);
});



// app.use('/account', createProxyMiddleware({ target: "http://localhost:3003", changeOrigin: true }));

// app.use('/identity', createProxyMiddleware({ target: "http://localhost:3004", changeOrigin: true }));

// app.use('/fits', createProxyMiddleware({ target: "https://jsonplaceholder.typicode.com", changeOrigin: true }));

// app.use('/account', accountServiceProxy);
// app.use('/identity', identityServiceProxy);


app.listen(PORT, () => {
    console.log("Server started on port: ", PORT);
})

