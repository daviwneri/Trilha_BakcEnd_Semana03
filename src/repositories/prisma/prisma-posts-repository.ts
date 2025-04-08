import { prisma } from "@/lib/prisma";
import { PostsRepository, PostUpdateInput } from "@/repositories/posts-repository";
import { Prisma } from "@prisma/client";

export class PrismaPostsRepository implements PostsRepository {

    async findByUserId(userId: string) {
        const posts = await prisma.post.findMany({
            where:{
                userId
            }
        })

        return posts
    }
    
    async findById(id: string) {
        const post = await prisma.post.findUnique({
            where:{
                id
            }
        })

        return post
    }

    async update(id: string, data: PostUpdateInput) {
            const post = await prisma.post.update({
                where: {id},
                data: {
                    title: data.title,
                    content: data.content
                }
            })
    
            return post
        }
    
    async delete(id: string) {
        const post = await prisma.post.delete({
            where:{
                id
            }
        })

        return post
    }
    
    async getAll() {
        const posts = await prisma.post.findMany()
        return posts
    }

    async create(data: Prisma.PostUncheckedCreateInput) {

        const post = await prisma.post.create({
            data
        })

        return post;
    }
}