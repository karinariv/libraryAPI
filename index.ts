import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { BookController } from './controllers/booksController';
import { ReaderController } from './controllers/readersController';
import { UsersController } from './controllers/usersController';
import { AuthMiddleware } from './utils/authMiddleware';
import { DatabaseConnection } from './database/connection';

const app = express();
dotenv.config();
DatabaseConnection.connect();

const port = process.env.PORT || 1234;

app.use(express.json());

app.use('/api/books', AuthMiddleware.authenticateJWT, new BookController().router);
app.use('/api/readers', AuthMiddleware.authenticateJWT, new ReaderController().router);
app.use('/api', new UsersController().router);

app.get('/api', (_: Request, res: Response) => {
    res.status(200).json({ message: 'App running correctly' })
});

app.listen(port, () => {
   console.log("App Running in port: " +  port + "  . . .  ");
});