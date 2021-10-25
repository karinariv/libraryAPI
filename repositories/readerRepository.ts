import { DeleteResult, getRepository, Repository } from "typeorm";
import { Reader } from "../models/readers";

export default class ReaderRepository {

    private repository_: Repository<Reader>;

    constructor () {

    }

    private get repository(): Repository<Reader> {

        if(!this.repository_){
            this.repository_ = getRepository(Reader);
        }
        return this.repository_;
    }

    async registerReader(reader_name: string, reader_email: string, phone_number: string, borrowedBook_id: number): Promise<Reader>{

        let reader = new Reader();

        reader.reader_name = reader_name;
        reader.reader_email = reader_email;
        reader.phone_number = phone_number;
        reader.borrowedBook_id = borrowedBook_id;

        return await this.repository.save(reader);
    }

    async showAllReaders(): Promise<Reader[]>{
        return await this.repository.find();
    }

    async showOneReader(reader_id: string): Promise<Reader>{
        return await this.repository.findOne(reader_id);
    }

    async updateReader(reader_id: string, reader_name: string, reader_email: string, phone_number: string, borrowedBook_id: number): Promise<Reader>{

        let newReader = await this.repository.findOne(reader_id);
        newReader.reader_name = reader_name;
        newReader.reader_email = reader_email;
        newReader.phone_number = phone_number;
        newReader.borrowedBook_id = borrowedBook_id;

        return await this.repository.save(newReader);
    }

    async deleteReader(reader_id: string): Promise<DeleteResult>{
        return await this.repository.delete(reader_id);
    }
}