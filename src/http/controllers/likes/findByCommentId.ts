import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository"
import { GetCommentLikesUseCase } from "@/use-cases/find-likes-by-commentid-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function getCommentLikes(request:FastifyRequest, reply:FastifyReply){
        const getParamsSchema = z.object({
                commentId: z.string().uuid()
            })
        
            const {commentId} = getParamsSchema.parse(request.params)

            const likesRepository = new PrismaLikesRepository()
            const getCommentLikesUseCase = new GetCommentLikesUseCase(likesRepository)
        
            try {
        
                const likes = await getCommentLikesUseCase.execute({commentId})
                return likes
        
            } catch (err) {
                throw err
            }

}