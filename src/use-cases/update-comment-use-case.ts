import { CommentsRepository, CommentUpdateInput } from "@/repositories/comments-repository"
import { ResourceNotFoundError } from "./errors/resource-not-fount-error"
import { Comment } from "@prisma/client"

interface UpdateCommentUseCaseRequest {
    commentId: string
    data: CommentUpdateInput
}

interface UpdateCommentUseCaseResponse {
    comment: Comment
}


export class UpdateCommentUseCase {
    constructor (private CommentsRepossitory: CommentsRepository){}

        async execute({commentId, data}: UpdateCommentUseCaseRequest): Promise<UpdateCommentUseCaseResponse>{
            const comment = await this.CommentsRepossitory.findById(commentId)

        if (!comment){
            throw new ResourceNotFoundError()
        }

        const commentUpdated = await this.CommentsRepossitory.update(commentId, data)

        if (!commentUpdated){
            throw new ResourceNotFoundError()
        }

        return { comment: commentUpdated }

    }
    
}