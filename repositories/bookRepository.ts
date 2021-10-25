import { DeleteResult, getRepository, Repository } from "typeorm";
import { Book } from "../models/books";

export default class BookRepository {
    
    private repository_: Repository<Book>;

    constructor () {

    }

    private get repository(): Repository<Book> {

        if(!this.repository_){
            this.repository_ = getRepository(Book);
        }
        return this.repository_;

    }


    async registerBook(title: string, releaseYear: string, category: string, currentReader_id: number){
        
        let book = new Book();
        
        book.title = title;
        book.releaseYear = releaseYear;
        book.category = category;
        book.currentReader_id = currentReader_id;

        return await this.repository.save(book);
    }


    async showAllBooks(): Promise<Book[]>{
        return await this.repository.find();
    }

    async showOneBook(book_id: string): Promise<Book>{
        return await this.repository.findOne(book_id);
    }

    async updateBook(book_id: string,  title: string, releaseYear: string, category: string, currentReader_id: number): Promise<Book>{

        let newProd = await this.repository.findOne(book_id);
        newProd.title = title;
        newProd.releaseYear = releaseYear;
        newProd.category = category;
        newProd.currentReader_id = currentReader_id;

        return await this.repository.save(newProd);
    }

    async deleteBook(book_id: string): Promise<DeleteResult>{
        return await this.repository.delete(book_id);
    }
}