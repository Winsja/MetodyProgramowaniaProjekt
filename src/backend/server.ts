import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import limit from 'express-rate-limit';
import { CorsOptions } from 'cors';
import router from './routes';

export type TServerConfig = {
    port: number;
    corsOptions: CorsOptions;
    limiter: {
        time: number;
        max: number;
    };
};

export const startServer = ({ port, corsOptions, limiter }: TServerConfig) => {
    const app = express();

    app.use(helmet()); //Helmet helps secure Express apps by setting HTTP response headers.
    app.use(cors(corsOptions)); //node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
    app.disable('x-powered-by'); //Info about the web server. Removed because it could be used in simple attacks
    app.use(limit({ windowMs: limiter.time, max: limiter.max })); //Use to limit repeated requests to public APIs and/or endpoints such as password reset
    app.use(express.json()); //Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option
    app.use(router);

    app.listen(port, () => {
        console.log(`App listen on port ${port}`);
    });
};
