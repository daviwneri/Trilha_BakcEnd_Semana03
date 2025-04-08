import { ResourceNotFoundError } from "./errors/resource-not-fount-error";
import { CommentsRepository } from "@/repositories/comments-repository";

interface GetPostCommentsUseCaseRequest {
    postId: string
}

export class GetPostCommentsUseCase {
    constructor(private commentsRepository: CommentsRepository) {}

    async execute({ postId }: GetPostCommentsUseCaseRequest){
        const comments = this.commentsRepository.findByPostId(postId)

        if (!comments){
            throw new ResourceNotFoundError()
        }

        return comments
    }
}