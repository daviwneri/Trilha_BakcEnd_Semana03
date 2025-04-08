import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { get } from "./get";
import { deleteUser } from "./delete";
import { update } from "./update";
import { profile } from "./profile";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { refresh } from "./refresh";
import { getAll } from "./getAll";

export async function userRoutes(app: FastifyInstance){
    app.post('/users', register)
    app.post('/authenticate', authenticate)

    app.get('/users/:userId', get)
    app.get('/users/getall', getAll)

    app.patch('/token/refresh', refresh)

    //Authenticated

    app.get('/profile', {onRequest: [verifyJWT]}, profile)

    app.delete('/users/:userId', {onRequest: [verifyJWT]}, deleteUser)

    app.patch('/users/:userId', {onRequest: [verifyJWT]}, update)
}