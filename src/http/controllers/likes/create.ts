import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository"
import { CreateLikeUseCase } from "@/use-cases/create-like-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(request:FastifyRequest, reply:FastifyReply){
    const createLikeBodySchema = z.object({
        postId: z.string().optional(),
        commentId: z.string().optional()

    })

    const {postId, commentId} = createLikeBodySchema.parse(request.body)

    try {

        const prismaLikesRepository = new PrismaLikesRepository()
        const createLikeUseCase = new CreateLikeUseCase(prismaLikesRepository)

        await createLikeUseCase.execute({
            userId: request.user.sub,
            postId,
            commentId
        })

    } catch (err) {
        throw err
    }

    return reply.status(201).send('Like criado com sucesso')
}