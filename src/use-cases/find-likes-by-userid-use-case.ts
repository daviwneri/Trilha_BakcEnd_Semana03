import { LikesRepository } from "@/repositories/likes-repository";
import { ResourceNotFoundError } from "./errors/resource-not-fount-error";

interface GetUserLikesUseCaseRequest {
    userId: string
}

export class GetUserLikesUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute({ userId }: GetUserLikesUseCaseRequest){
        const likes = this.likesRepository.findByUserId(userId)

        if (!likes){
            throw new ResourceNotFoundError()
        }

        return likes
    }
}