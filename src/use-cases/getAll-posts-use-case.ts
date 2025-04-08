import { ResourceNotFoundError } from "./errors/resource-not-fount-error"
import { Post } from "@prisma/client"
import { PostsRepository } from "@/repositories/posts-repository"

interface GetAllPostsUseCaseResponse {
    posts: Post[]
}


export class GetAllPostsUseCase {
    constructor (private PostsRepository: PostsRepository){}

    async execute(): Promise<GetAllPostsUseCaseResponse>{
        const posts = await this.PostsRepository.getAll()
    

    if (!posts){
        throw new ResourceNotFoundError()
    }

    return { posts }

    }
    
}