import { Prisma, Like } from "@prisma/client";

export interface LikesRepository {

    create(data: Prisma.LikeUncheckedCreateInput): Promise<Like>
    findById(id: string): Promise<Like | null>
    delete(id: string): Promise<Like | null>
    findByUserId(userId: string): Promise<Like[]>
    findByPostId(postId: string): Promise<Like[]>
    findByCommentId(commentId: string): Promise<Like[]>

}