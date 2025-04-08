import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository"
import { GetUserLikesUseCase } from "@/use-cases/find-likes-by-userid-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function getUserLikes(request:FastifyRequest, reply:FastifyReply){
        const getParamsSchema = z.object({
                userId: z.string().uuid()
            })
        
            const {userId} = getParamsSchema.parse(request.params)

            const likesRepository = new PrismaLikesRepository()
            const getUserLikesUseCase = new GetUserLikesUseCase(likesRepository)
        
            try {
        
                const likes = await getUserLikesUseCase.execute({userId})
                return likes
        
            } catch (err) {
                throw err
            }

}