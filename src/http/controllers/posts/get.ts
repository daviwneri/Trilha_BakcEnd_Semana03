import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error"
import { GetPostUseCase } from "@/use-cases/get-post-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function get(request:FastifyRequest, reply:FastifyReply){
    const getParamsSchema = z.object({
        postId: z.string().uuid()
    })

    const {postId} = getParamsSchema.parse(request.params)

    try {

        const prismaPostsRepository = new PrismaPostsRepository()
        const getPostUseCase = new GetPostUseCase(prismaPostsRepository)

        const post = await getPostUseCase.execute({
            postId
        })

        return reply.status(200).send({ post })

    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}
