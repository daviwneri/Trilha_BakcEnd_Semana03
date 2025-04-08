import { prisma } from "@/lib/prisma";
import { LikesRepository } from "@/repositories/likes-repository";

interface CreateLikeUseCaseRequest {
    userId: string,
    postId?: string,
    commentId?: string
}

export class CreateLikeUseCase {
    constructor (private LikesRepository: LikesRepository) {}

    async execute({ userId, postId, commentId}: CreateLikeUseCaseRequest){

        if ((!postId && !commentId) || (postId && commentId)) {
            throw new Error("O like deve estar associado a apenas um post ou um comentário.");
        }

        const user = await prisma.user.findUnique({ 
            where: { id: userId }
        })
        
        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        await this.LikesRepository.create({
            userId,
            postId,
            commentId
         })
        
    }
}