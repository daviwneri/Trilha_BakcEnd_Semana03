import { LikesRepository } from "@/repositories/likes-repository";
import { ResourceNotFoundError } from "./errors/resource-not-fount-error";

interface GetPostLikesUseCaseRequest {
    postId: string
}

export class GetPostLikesUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({ postId }: GetPostLikesUseCaseRequest){
        const likes = this.likesRepository.findByPostId(postId)

        if (!likes){
            throw new ResourceNotFoundError()
        }

        return likes
    }
}