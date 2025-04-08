import { ResourceNotFoundError } from "./errors/resource-not-fount-error";
import { CommentsRepository } from "@/repositories/comments-repository";

interface GetUserCommentsUseCaseRequest {
    userId: string;
}

export class GetUserCommentsUseCase {
    constructor(private commentsRepository: CommentsRepository) {}

    async execute({ userId }: GetUserCommentsUseCaseRequest){
        const comments = this.commentsRepository.findByUserId(userId)

        if (!comments){
            throw new ResourceNotFoundError()
        }

        return comments
    }
}