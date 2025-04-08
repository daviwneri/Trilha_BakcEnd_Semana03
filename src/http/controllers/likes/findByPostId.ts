import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository"
import { GetPostLikesUseCase } from "@/use-cases/find-likes-by-postid-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function getPostLikes(request:FastifyRequest, reply:FastifyReply){
        const getParamsSchema = z.object({
                postId: z.string().uuid()
            })
        
            const {postId} = getParamsSchema.parse(request.params)

            const likesRepository = new PrismaLikesRepository()
            const getPostLikesUseCase = new GetPostLikesUseCase(likesRepository)
        
            try {
        
                const likes = await getPostLikesUseCase.execute({postId})
                return likes
        
            } catch (err) {
                throw err
            }

}