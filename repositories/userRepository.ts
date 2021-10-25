import { getRepository, Repository } from "typeorm";
import { User } from "../models/users";

export default class UserRepository {

    private repository_: Repository<User>;

    constructor () {

    }

    private get repository():  Repository<User> {

        if(!this.repository_){
            this.repository_ = getRepository(User);
        }
        return this.repository_;
    }

    async registerUser(user_name: string, user_email: string, password: string, user_role: string): Promise<User>{
        
        let user = new User();

        user.user_name = user_name;
        user.user_email = user_email;
        user.password = password;
        user.user_role = user_role;
        
        return await this.repository.save(user);
    }

    async showAllUsers(): Promise<User[]>{
        return await this.repository.find();
    }
}