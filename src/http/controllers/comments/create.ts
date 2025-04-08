import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comment-repository"
import { CreateCommentUseCase } from "@/use-cases/create-comment-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(request:FastifyRequest, reply:FastifyReply){
    const createPostBodySchema = z.object({
        content: z.string(),
        postId: z.string()

    })

    const {content, postId} = createPostBodySchema.parse(request.body)

    try {

        const prismaCommentsRepository = new PrismaCommentsRepository()
        const createCommentUseCase = new CreateCommentUseCase(prismaCommentsRepository)

        await createCommentUseCase.execute({
            content,
            userId: request.user.sub,
            postId
        })

    } catch (err) {
        throw err
    }

    return reply.status(201).send('Comentário criado com sucesso')
}
