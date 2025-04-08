import { ResourceNotFoundError } from "./errors/resource-not-fount-error"
import { PostsRepository, PostUpdateInput } from "@/repositories/posts-repository"
import { Post } from "@prisma/client"

interface UpdatepostUseCaseRequest {
    postId: string
    data: PostUpdateInput
}

interface UpdatePostUseCaseResponse {
    post: Post
}


export class UpdatepostUseCase {
    constructor (private PostsRepossitory: PostsRepository){}

        async execute({postId, data}: UpdatepostUseCaseRequest): Promise<UpdatePostUseCaseResponse>{
            const post = await this.PostsRepossitory.findById(postId)

        if (!post){
            throw new ResourceNotFoundError()
        }

        const postUpdated = await this.PostsRepossitory.update(postId, data)

        if (!postUpdated){
            throw new ResourceNotFoundError()
        }

        return { post: postUpdated }

    }
    
}