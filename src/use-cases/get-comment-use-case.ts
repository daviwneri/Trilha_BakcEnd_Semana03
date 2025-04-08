import { ResourceNotFoundError } from "./errors/resource-not-fount-error"
import { Comment } from "@prisma/client"
import { CommentsRepository } from "@/repositories/comments-repository"

interface GetCommentUseCaseRequest {
    commentId: string
}

interface GetCommentUseCaseResponse {
    comment: Comment
}


export class GetCommentUseCase {
    constructor (private CommentsRepossitory: CommentsRepository){}

    async execute({commentId}: GetCommentUseCaseRequest): Promise<GetCommentUseCaseResponse>{
        const comment = await this.CommentsRepossitory.findById(commentId)
    

    if (!comment){
        throw new ResourceNotFoundError()
    }

    return { comment }

    }
    
}