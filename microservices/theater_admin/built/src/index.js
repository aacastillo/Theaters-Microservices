import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from './routes/routes.js';
import { initDB } from './data/dbInit.js';
import { subscribeToEventbus } from './events/subscribeToEB.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);
initDB();
await subscribeToEventbus().catch((err) => { throw err; });
app.listen(4006, () => {
    console.log('Listening on 4006');
});
