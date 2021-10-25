import { Router, Request, Response } from "express";
import { Reader } from "../models/readers";
import ReaderRepository from "../repositories/readerRepository";

export class ReaderController {
    
    public router: Router;
    private repository: ReaderRepository;

    constructor(){
        this.router = Router();
        
        this.router.get('/', (req, res) => this.showAllReaders(req, res));
        this.router.get('/:id', (req, res) => this.showOneReader(req, res));
        this.router.post('/', (req, res) => this.registerReader(req, res));
        this.router.patch('/:id', (req, res) => this.updateReader(req, res));
        this.router.delete('/:id', (req, res) => this.deleteReader(req, res)); 

        this.repository = new ReaderRepository();
    }

    private async showAllReaders( req: Request, res: Response): Promise<void> {

        const  readers = await this.repository.showAllReaders();
        
        res.status(200).json(readers);
    }

    private async registerReader( req: Request, res: Response ): Promise<void> {

        const r: Reader = req.body;

        if(r.reader_name) {
            try {
                const newRead: Reader = await this.repository.registerReader(r.reader_name, r.reader_email, r.phone_number, r.borrowedBook_id)
                res.status(201).json(newRead);
            } catch (error) { console.log(error); res.status(404).json({ error: "Tenemos un error"}); }
        } else {
            res.status(400).json({ message: "Error. reader_name cannot be empty." });
        }

    }

    private async showOneReader( req: Request, res: Response ): Promise<void> {
        
        const id = req.params.id;

        if(id){
    
            const r = await this.repository.showOneReader(id);
            
            if(r){
                res.status(200).json(r);
            } else {
                res.status(404).json({ message: "Error. Not found."});
            }
        } else {
            res.status(400).json({ message: "Error. Bad Request." });
        }

    }

    private async updateReader(req: Request, res: Response): Promise<void> {

        const id = req.params.id;
        const r = req.body;

        if(id) {
            const newb = await this.repository.updateReader(id, r.reader_name, r.reader_email, r.phone_number, r.borrowedBook_id)
            
            res.status(200).json({newb});
        } else {
            res.status(400).json({ message: "reader_id cannot be empty." });
        }

    }

    private async deleteReader( req: Request, res: Response): Promise<void> {

        const id = req.params.id;

        try {
            await this.repository.deleteReader(id);
            res.status(200).json({message: "This reader was deleted from database"});
        } catch (error) {
            res.status(400).json({ message: "This reader was deleted from database" });
        }

        
    }

}