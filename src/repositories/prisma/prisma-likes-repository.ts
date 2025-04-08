import { Prisma, Like } from "@prisma/client";
import { LikesRepository } from "../likes-repository";
import { prisma } from "@/lib/prisma";

export class PrismaLikesRepository implements LikesRepository{

    async findByUserId(userId: string) {
        const likes = await prisma.like.findMany({
            where:{
                userId
            }
        })

        return likes
    }

    async findByPostId(postId: string) {
        const likes = await prisma.like.findMany({
            where:{
                postId
            }
        })

        return likes
    }

    async findByCommentId(commentId: string) {
        const likes = await prisma.like.findMany({
            where: {
                commentId
            }
        })

        return likes
    }

    async findById(id: string) {
        const like = await prisma.like.findUnique({
            where: {
                id
            }
        })

        return like
    }

    async delete(id: string) {
        const like = prisma.like.delete({
            where: {
                id
            }
        })

        return like
    }

    async create(data: Prisma.LikeUncheckedCreateInput) {
        const like = prisma.like.create({
            data
        })

        return like
    }

}