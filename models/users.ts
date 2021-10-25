import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    user_id: string;

    @Column()
    user_name: string;

    @Column()
    user_email: string;

    @Column()
    password: string;

    @Column()
    user_role: string;
}