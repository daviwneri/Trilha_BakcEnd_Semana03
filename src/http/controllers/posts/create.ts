import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { CreatePostUseCase } from "@/use-cases/create-post-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(request:FastifyRequest, reply:FastifyReply){
    const createPostBodySchema = z.object({
        title: z.string(),
        content: z.string(),

    })

    const {title, content} = createPostBodySchema.parse(request.body)

    try {

        const prismaPostsRepository = new PrismaPostsRepository()
        const createPostUseCase = new CreatePostUseCase(prismaPostsRepository)

        await createPostUseCase.execute({
            title,
            content,
            userId: request.user.sub
        })

    } catch (err) {
        throw err
    }

    return reply.status(201).send('Post criado com sucesso')
}
