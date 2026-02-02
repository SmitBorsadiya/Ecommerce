import express from 'express';
import type { Express, Request, Response } from 'express';
import { PORT } from './config/secrets.js';
import rootRoutes from './routes/index.js';
import { errorMiddleware } from './middlewares/errors.js';

const app: Express = express();

app.use(express.json());
app.use('/api', rootRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});