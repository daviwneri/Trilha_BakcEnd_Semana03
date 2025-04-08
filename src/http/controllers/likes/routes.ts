import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { deleteLike } from "./delete";
import { get } from "./get";
import { getUserLikes } from "./findByUserId";
import { getPostLikes } from "./findByPostId";
import { getCommentLikes } from "./findByCommentId";

export async function likeRouts (app:FastifyInstance){

    app.get('/likes/:likeId', get)
    app.get('/likes/users/:userId', getUserLikes)
    app.get('/likes/posts/:postId', getPostLikes)
    app.get('/likes/comments/:commentId', getCommentLikes)

    //Authenticated

    app.post('/likes', {onRequest: [verifyJWT]}, create)

    app.delete('/likes/:likeId', {onRequest: [verifyJWT]}, deleteLike)
}