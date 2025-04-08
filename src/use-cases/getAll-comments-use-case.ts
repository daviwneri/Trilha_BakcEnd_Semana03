import { ResourceNotFoundError } from "./errors/resource-not-fount-error"
import { Comment } from "@prisma/client"
import { CommentsRepository } from "@/repositories/comments-repository"

interface GetAllCommentsUseCaseResponse {
    comments: Comment[]
}


export class GetAllCommentsUseCase {
    constructor (private CommentsRepository: CommentsRepository){}

    async execute(): Promise<GetAllCommentsUseCaseResponse>{
        const comments = await this.CommentsRepository.getAll()
    

    if (!comments){
        throw new ResourceNotFoundError()
    }

    return { comments }

    }
    
}