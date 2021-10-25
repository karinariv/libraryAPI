import { Router , Request, Response} from "express";
import JWT from "jsonwebtoken";
import { User } from "../models/users";
import UserRepository from "../repositories/userRepository"

export class UsersController {

    public router: Router;
    private repository: UserRepository;

    constructor () {
        this.router = Router();

        this.router.post('/login', (req, res) => this.login(req, res));
        this.router.post('/user', (req, res) => this.registerUser(req, res));

        this.repository = new UserRepository();
    }

    private async login(req: Request, res: Response) {
        //const { user, password } = req.body;
        const u: User = req.body;

        if(u.user_name && u.password ) { // Si se mandó algo en el body...
            const token = JWT.sign({ 
                user: u.user_name,
                role: u.user_role
            }, process.env.secret);
            res.status(200).json({token});
        } else {
            res.status(404).json({ message: 'User or Password do not exist' });
        }
    }

    private async registerUser(req: Request, res: Response): Promise<void> {
        const u: User = req.body;

        if(u.user_name) {
            try {
                const newUser: User = await this.repository.registerUser(u.user_name, u.user_email, u.password, u.user_role);
                res.status(201).json(newUser);
            } catch (error) { res.status(404).json({ error: "Tenemos un error"}); }
        } else {
            res.status(400).json({message: "Error. user_name cannot be empty."});
        }
    }

}