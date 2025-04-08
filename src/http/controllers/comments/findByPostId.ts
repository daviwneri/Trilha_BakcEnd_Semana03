import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comment-repository"
import { GetPostCommentsUseCase } from "@/use-cases/find-comments-by-postid-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function getPostComments(request:FastifyRequest, reply:FastifyReply){
        const getParamsSchema = z.object({
                postId: z.string().uuid()
            })
        
            const {postId} = getParamsSchema.parse(request.params)

            const commentsRepository = new PrismaCommentsRepository()
            const getPostCommentsUseCase = new GetPostCommentsUseCase(commentsRepository)
        
            try {
        
                const comments = await getPostCommentsUseCase.execute({postId})
                return comments
        
            } catch (err) {
                throw err
            }

}