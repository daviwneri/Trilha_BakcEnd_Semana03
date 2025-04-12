export class EmailNotFoundError extends Error {
    constructor(){
        super('erro ao enviar o email')
    }
}