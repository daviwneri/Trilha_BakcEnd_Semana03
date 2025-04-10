import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "@/use-cases/authenticate-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function authenticate(request:FastifyRequest, reply:FastifyReply){
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    try {

        const {email, password} = authenticateBodySchema.parse(request.body)

        const prismaUsersRepository = new PrismaUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

        const { user } = await authenticateUseCase.execute({
            email,
            password
        })

        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id
            }
        })

        const refreshToken = await reply.jwtSign({}, {
            sign: {
                sub: user.id,
                expiresIn: '7d'
            }
        })

        return reply
                .status(200)
                .setCookie('refreshToken', refreshToken, {
                    path: '/', 
                    secure: true,
                    sameSite: true,
                    httpOnly: true
                })
                .send({ token })

    } catch (err) {
        return reply.status(401).send('Usuário não autorizado')
    }
}
