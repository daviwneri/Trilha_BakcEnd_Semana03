import { app } from "./app";
import { env } from "./env/index"

app.listen({
    host: "0.0.0.0",
    port: env.PORT

}).then(() => {
    console.log(`🚀 O servidor está rodando em http://localhost:${env.PORT}`)
})