import { UsersRepository } from "@/repositories/users-repository"
import { ResourceNotFoundError } from "./errors/resource-not-fount-error"
import { User } from "@prisma/client"

interface GetUserUseCaseRequest {
    userId: string
}

interface GetUserUseCaseResponse {
    user: User
}


export class GetUserUseCase {
    constructor (private UsersRepossitory: UsersRepository){}

    async execute({userId}: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse>{
        const user = await this.UsersRepossitory.findById(userId)
    

    if (!user){
        throw new ResourceNotFoundError()
    }

    return { user }

    }
    
}