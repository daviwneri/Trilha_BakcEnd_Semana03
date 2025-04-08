import { UsersRepository } from "@/repositories/users-repository"
import { ResourceNotFoundError } from "./errors/resource-not-fount-error"
import { User } from "@prisma/client"

interface GetAllUsersUseCaseResponse {
    users: User[]
}


export class GetAllUsersUseCase {
    constructor (private UsersRepossitory: UsersRepository){}

    async execute(): Promise<GetAllUsersUseCaseResponse>{
        const users = await this.UsersRepossitory.getAll()
    

    if (!users){
        throw new ResourceNotFoundError()
    }

    return { users }

    }
    
}