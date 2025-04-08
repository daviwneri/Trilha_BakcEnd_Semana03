import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comment-repository"
import { GetAllCommentsUseCase } from "@/use-cases/getAll-comments-use-case"
import { FastifyReply, FastifyRequest } from "fastify"

export async function getAll(request:FastifyRequest, reply:FastifyReply){

        const prismaCommentsRepository = new PrismaCommentsRepository()
        const getAllCommentsUseCase = new GetAllCommentsUseCase(prismaCommentsRepository)

        const posts = await getAllCommentsUseCase.execute()

        return reply.status(200).send({ posts })

}