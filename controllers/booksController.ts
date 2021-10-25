import { Router, Request, Response } from "express";
import { Book } from "../models/books";
import BookRepository from "../repositories/bookRepository";

export class BookController {
    
    public router: Router;
    private repository: BookRepository;

    constructor(){
        this.router = Router();
        
        this.router.get('/', (req, res) => this.showAllBooks(req, res));
        this.router.get('/:id', (req, res) => this.showOneBook(req, res));
        this.router.post('/', (req, res) => this.registerBook(req, res));
        this.router.patch('/:id', (req, res) => this.updateBook(req, res));
        this.router.delete('/:id', (req, res) => this.deleteBook(req, res)); 

        this.repository = new BookRepository();
    }

    private async showAllBooks( req: Request, res: Response): Promise<void> {
        
        const books = await this.repository.showAllBooks();
        
        res.status(200).json(books);
    }

    private async registerBook( req: Request, res: Response ): Promise<void> {

        const b: Book = req.body;

        if(b.title) {
            try {
            const newBook: Book = await this.repository.registerBook(b.title, b.releaseYear, b.category, b.currentReader_id)
            res.status(201).json(newBook);
            } catch (error) {console.log(error); res.status(404).json({ error: "Tenemos un error"});}
        } else {
            res.status(400).json({ message: "Error. Title cannot be empty." });
        }

    }

    private async showOneBook( req: Request, res: Response ): Promise<void> {
        
        const id = req.params.id;

        if(id){
    
            const b = await this.repository.showOneBook(id);
            
            if(b){
                res.status(200).json(b);
            } else {
                res.status(404).json({ message: "Error. Not found."});
            }
        } else {
            res.status(400).json({ message: "Error. Bad Request." });
        }

    }

    private async updateBook(req: Request, res: Response): Promise<void> {

        const id = req.params.id;
        const b = req.body;

        if(id) {
            const newb = await this.repository.updateBook(id, b.title, b.releaseYear, b.category, b.currentReader_id)
            
            res.status(200).json({newb});
        } else {
            res.status(400).json({ message: "book_id cannot be empty." });
        }

    }

    private async deleteBook( req: Request, res: Response): Promise<void> {

        const id = req.params.id;

        try {
            await this.repository.deleteBook(id);
            res.status(200).json({ message: "This book was deleted" });
        } catch (error) {
            res.status(400).json({ error: "Impossible to delete"});
        }


    }

}