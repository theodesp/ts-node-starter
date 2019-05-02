import { Request, Response, Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/', async (request: Request, response: Response) => {
    response
        .status(200)
        .send();
});
