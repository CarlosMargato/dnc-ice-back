import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import z from 'zod';

const app = fastify()

const prisma = new PrismaClient

app.post('/users', async (request, reply) =>{
    const createUserSchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        telefone: z.string(),
        escola: z.string(),
    })
    const {nome, email, telefone, escola} = createUserSchema.parse(request.body)

    await prisma.user.create({
        data:{
            nome,
            email,
            telefone,
            escola,
        }
    })

    return reply.status(201).send()
})

app.listen({
    host:'0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then(() => {
  console.log('Rodando');
  
})