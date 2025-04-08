import { Comment, Prisma } from "@prisma/client";
import { CommentsRepository, CommentUpdateInput } from "../comments-repository";
import { prisma } from "@/lib/prisma";

export class PrismaCommentsRepository implements CommentsRepository {

    async findByPostId(postId: string) {
        const comments = await prisma.comment.findMany({
            where:{
                postId
            }
        })

        return comments
    }

    async findByUserId(userId: string) {
        const comments = await prisma.comment.findMany({
            where:{
                userId
            }
        })

        return comments
    }

    async findById(id: string) {
        const comment = await prisma.comment.findUnique({
            where:{
                id
            }
        })

        return comment
    }

    async update(id: string, data: CommentUpdateInput) {
                const comment = await prisma.comment.update({
                    where: {id},
                    data: {
                        content: data.content
                    }
                })
        
                return comment
            }

    async delete(id: string) {
        const comment = prisma.comment.delete({
            where: {
                id
            }
        })

        return comment
    }

    async getAll() {
        const comments = await prisma.comment.findMany()
        return comments
    }

    async create(data: Prisma.CommentUncheckedCreateInput){
        const comment = await prisma.comment.create({
            data
        })

        return comment
    }
    
        
}