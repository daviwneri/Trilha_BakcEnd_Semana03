import { LikesRepository } from "@/repositories/likes-repository";
import { ResourceNotFoundError } from "./errors/resource-not-fount-error";

interface GetCommentLikesUseCaseRequest {
    commentId: string
}

export class GetCommentLikesUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({ commentId }: GetCommentLikesUseCaseRequest){
        const likes = this.likesRepository.findByCommentId(commentId)

        if (!likes){
            throw new ResourceNotFoundError()
        }

        return likes
    }
}