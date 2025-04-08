import { prisma } from "@/lib/prisma"
import { CommentsRepository } from "@/repositories/comments-repository"

interface CreateCommentUseCaseRequest {
    content: string,
    userId: string,
    postId: string
}


export class CreateCommentUseCase {
    constructor (private CommentsRepository: CommentsRepository){}

    async execute({content, userId, postId}: CreateCommentUseCaseRequest){
        
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        const post = await prisma.post.findUnique({
            where: { id: postId }
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        if (!post){
            throw new Error ("Post não encontrado")
        }

        await this.CommentsRepository.create({
           content,
           userId,
           postId
        })
    }
    
}