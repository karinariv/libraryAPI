import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Reader } from './readers';

@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    book_id: string;

    @Column()
    title: string;

    @Column()
    releaseYear: string;
    
    @Column()
    category: string;
    
    @OneToOne(()=> Reader)
    @JoinColumn()
    currentReader_id: number;


}