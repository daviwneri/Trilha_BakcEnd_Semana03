import { ResourceNotFoundError } from "./errors/resource-not-fount-error"
import { Like } from "@prisma/client"
import { LikesRepository } from "@/repositories/likes-repository"

interface GetLikeUseCaseRequest {
    likeId: string
}

interface GetPostUseCaseResponse {
    like: Like
}


export class GetLikeUseCase {
    constructor (private LikesRepossitory: LikesRepository){}

    async execute({likeId}: GetLikeUseCaseRequest): Promise<GetPostUseCaseResponse>{
        const like = await this.LikesRepossitory.findById(likeId)
    

    if (!like){
        throw new ResourceNotFoundError()
    }

    return { like }

    }
    
}