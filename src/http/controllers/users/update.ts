import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error"
import { UpdateUserUseCase } from "@/use-cases/update-user-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function update(request:FastifyRequest, reply:FastifyReply){
    const updateParamsSchema = z.object({
        userId: z.string().uuid()
    })

    const updateBodySchema = z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        photo: z.string().optional(),
        password: z.string().optional()
    })

    const { userId } = updateParamsSchema.parse(request.params)
    const {name, email, photo, password} = updateBodySchema.parse(request.body)

    try {

        const prismaUsersRepository = new PrismaUsersRepository()
        const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository)

        const user = await updateUserUseCase.execute({
            userId,
            data: {
                name,
                email,
                photo,
                password
            }
        })

        return reply.status(200).send({ user })

    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}
