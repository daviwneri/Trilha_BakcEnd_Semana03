import { PostsRepository } from "@/repositories/posts-repository"
import { ResourceNotFoundError } from "./errors/resource-not-fount-error"
import { Post } from "@prisma/client"

interface DeletePostUseCaseRequest {
    postId: string
}

interface DeletePostUseCaseResponse {
    post: Post
}


export class DeletePostUseCase {
    constructor (private PostsRepository: PostsRepository){}

    async execute({postId}: DeletePostUseCaseRequest): Promise<DeletePostUseCaseResponse>{
        const post = await this.PostsRepository.delete(postId)
    

    if (!post){
        throw new ResourceNotFoundError()
    }

    return { post }

    }
    
}