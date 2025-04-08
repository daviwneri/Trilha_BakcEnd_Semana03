import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetAllUsersUseCase } from "@/use-cases/getAll-users-use-case"
import { FastifyReply, FastifyRequest } from "fastify"

export async function getAll(request:FastifyRequest, reply:FastifyReply){

        const prismaUsersRepository = new PrismaUsersRepository()
        const getAllUsersUseCase = new GetAllUsersUseCase(prismaUsersRepository)

        const users = await getAllUsersUseCase.execute()

        return reply.status(200).send({ users })

}
