import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comment-repository"
import { GetUserCommentsUseCase } from "@/use-cases/find-comments-by-userid-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function getUserComments(request:FastifyRequest, reply:FastifyReply){
        const getParamsSchema = z.object({
                userId: z.string().uuid()
            })
        
            const {userId} = getParamsSchema.parse(request.params)

            const commentsRepository = new PrismaCommentsRepository()
            const getUserCommentsUseCase = new GetUserCommentsUseCase(commentsRepository)
        
            try {
        
                const comments = await getUserCommentsUseCase.execute({userId})
                return comments
        
            } catch (err) {
                throw err
            }

}