import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getAll } from "./getAll";
import { deletePost } from "./delete";
import { update } from "./update";
import { get } from "./get";
import { getUserPosts } from "./findByUserId";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function postRoutes(app: FastifyInstance){

    app.get('/posts/:postId', get)
    app.get('/posts/getall', getAll)
    app.get('/posts/users/:userId', getUserPosts)

    //Authenticated

    app.post('/posts', {onRequest: [verifyJWT]}, create)

    app.delete('/posts/:postId', {onRequest: [verifyJWT]}, deletePost)

    app.patch('/posts/:postId', {onRequest: [verifyJWT]}, update)
}