import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reader {

    @PrimaryGeneratedColumn()
    reader_id: string;

    @Column()
    reader_name: string;

    @Column()
    reader_email: string;

    @Column()
    phone_number: string;

    @Column()
    borrowedBook_id: number;
}