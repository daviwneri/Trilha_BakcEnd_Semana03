import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error"
import { UpdatepostUseCase } from "@/use-cases/update-post-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { string, z } from "zod"

export async function update(request:FastifyRequest, reply:FastifyReply){
    const updateParamsSchema = z.object({
        postId: z.string().uuid()
    })

    const updateBodySchema = z.object({
        title: string().optional(),
        content: string().optional()
    })

    const { postId } = updateParamsSchema.parse(request.params)
    const {title, content} = updateBodySchema.parse(request.body)

    try {

        const prismaPostsRepository = new PrismaPostsRepository()
        const updatePostUseCase = new UpdatepostUseCase(prismaPostsRepository)

        const post = await updatePostUseCase.execute({
            postId,
            data: {
                title,
                content
            }
        })

        return reply.status(200).send({ post })

    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}