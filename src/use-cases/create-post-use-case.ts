import { prisma } from "@/lib/prisma"
import { PostsRepository } from "@/repositories/posts-repository"

interface CreatePostUseCaseRequest {
    title: string,
    content: string,
    userId: string
}


export class CreatePostUseCase {
    constructor (private PostsRepository: PostsRepository){}

    async execute({title, content, userId}: CreatePostUseCaseRequest){
        
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        await this.PostsRepository.create({
           title,
           content,
           userId
        })
    }
    
}