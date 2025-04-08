import { UsersRepository } from "@/repositories/users-repository"
import { ResourceNotFoundError } from "./errors/resource-not-fount-error"
import { User } from "@prisma/client"

interface DeleteUserUseCaseRequest {
    userId: string
}

interface DeleteUserUseCaseResponse {
    user: User
}


export class DeleteUserUseCase {
    constructor (private UsersRepository: UsersRepository){}

    async execute({userId}: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse>{
        const user = await this.UsersRepository.delete(userId)
    

    if (!user){
        throw new ResourceNotFoundError()
    }

    return { user }

    }
}