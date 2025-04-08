import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository"
import { GetAllPostsUseCase } from "@/use-cases/getAll-posts-use-case"
import { FastifyReply, FastifyRequest } from "fastify"

export async function getAll(request:FastifyRequest, reply:FastifyReply){

        const prismaPostsRepository = new PrismaPostsRepository()
        const getAllPostsUseCase = new GetAllPostsUseCase(prismaPostsRepository)

        const posts = await getAllPostsUseCase.execute()

        return reply.status(200).send({ posts })

}