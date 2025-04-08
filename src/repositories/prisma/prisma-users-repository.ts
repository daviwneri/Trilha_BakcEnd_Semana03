import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository, UserUpdateInput } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository{

    async update(id: string, data: UserUpdateInput) {
        const user = await prisma.user.update({
            where: {id},
            data: {
                name: data.name,
                email: data.email,
                photo: data.photo,
                password: data.password
            }
        })

        return user
    }

    async delete(id: string) {
        const user = await prisma.user.delete({
            where:{
                id
            }
        })

        return user
    }
    
    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })

        return user
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        return user
    }
    
    async create(data: Prisma.UserCreateInput) {

        const user =  await prisma.user.create({
            data
            })
            
        return user
    }

    async getAll() {
        const users = await prisma.user.findMany()
        return users
    }
}