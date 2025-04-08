import { CommentsRepository } from "@/repositories/comments-repository"
import { ResourceNotFoundError } from "./errors/resource-not-fount-error"
import { Comment } from "@prisma/client"

interface DeleteCommentUseCaseRequest {
    commentId: string
}

interface DeleteCommentUseCaseResponse {
    comment: Comment
}


export class DeleteCommentUseCase {
    constructor (private CommentsRepository: CommentsRepository){}

    async execute({commentId}: DeleteCommentUseCaseRequest): Promise<DeleteCommentUseCaseResponse>{
        const comment = await this.CommentsRepository.delete(commentId)
    

    if (!comment){
        throw new ResourceNotFoundError()
    }

    return { comment }

    }
    
}