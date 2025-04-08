import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { getAll } from "./getAll";
import { deleteComment } from "./delete";
import { update } from "./update";
import { get } from "./get";
import { getUserComments } from "./findByUserId";
import { getPostComments } from "./findByPostId";

export async function commentRoutes(app: FastifyInstance){

    app.get('/comments/:commentId', get)
    app.get('/comments/getall', getAll)
    app.get('/comments/users/:userId', getUserComments)
    app.get('/comments/posts/:postId', getPostComments)

    //Authenticated

    app.post('/comments', {preHandler: verifyJWT}, create)

    app.delete('/comments/:commentId', {preHandler: verifyJWT}, deleteComment)

    app.patch('/comments/:commentId', {preHandler: verifyJWT}, update)
}