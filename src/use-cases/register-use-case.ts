import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExists } from "./errors/user-already-exists-error"

interface ResgisterUseCaseRequest {
    name: string,
    email: string,
    photo: string,
    password: string
}


export class RegisterUseCase {
    constructor (private UsersRepossitory: UsersRepository){}

    async execute({name, email, photo, password}: ResgisterUseCaseRequest){
        const userWithSameEmail = await this.UsersRepossitory.findByEmail(email)
    
        if (userWithSameEmail){
            throw new UserAlreadyExists()
        }
    
        const password_hash = await hash(password, 6)

        await this.UsersRepossitory.create({
            name,
            email,
            photo,
            password: password_hash
        })
    }
    
}