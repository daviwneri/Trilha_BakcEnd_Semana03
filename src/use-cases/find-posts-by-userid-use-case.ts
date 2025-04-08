import { PostsRepository } from "@/repositories/posts-repository";
import { ResourceNotFoundError } from "./errors/resource-not-fount-error";

interface GetUserPostsUseCaseRequest {
    userId: string;
}

export class GetUserPostsUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({ userId }: GetUserPostsUseCaseRequest){
        const posts = this.postsRepository.findByUserId(userId)

        if (!posts){
            throw new ResourceNotFoundError()
        }

        return posts
    }
}