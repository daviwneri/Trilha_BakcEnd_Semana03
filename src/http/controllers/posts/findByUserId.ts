import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { GetUserPostsUseCase } from "@/use-cases/find-posts-by-userid-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function getUserPosts(request:FastifyRequest, reply:FastifyReply){
        const getParamsSchema = z.object({
                userId: z.string().uuid()
            })
        
            const {userId} = getParamsSchema.parse(request.params)

            const postsRepository = new PrismaPostsRepository()
            const getUserPostsUseCase = new GetUserPostsUseCase(postsRepository)
        
            try {
        
                const posts = await getUserPostsUseCase.execute({userId})
                return posts
        
            } catch (err) {
                throw err
            }

}