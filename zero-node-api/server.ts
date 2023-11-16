import fastify from 'fastify'
import z from 'zod'

// import { DatabaseMemory } from './database-memory'
import { DatabasePostgres } from './db/database-postgres'

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.get('/videos', async (request, reply) => {
  const querySchema = z.object({
    search: z.string().optional(),
  })

  const { search } = querySchema.parse(request.query)

  const videos = await database.list(search)

  return reply.send(videos)
})

server.post('/videos', async (request, reply) => {
  const bodySchema = z.object({
    title: z.string(),
    description: z.string(),
    duration: z.number(),
  })

  const { title, description, duration } = bodySchema.parse(request.body)

  await database.create({
    title,
    description,
    duration,
  })

  return reply.status(201).send()
})

server.put('/videos/:id', async (request, reply) => {
  const paramSchema = z.object({
    id: z.string(),
  })

  const { id: videoId } = paramSchema.parse(request.params)

  const bodySchema = z.object({
    title: z.string(),
    description: z.string(),
    duration: z.number(),
  })

  const { title, description, duration } = bodySchema.parse(request.body)

  await database.update(videoId, { title, description, duration })

  return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
  const paramSchema = z.object({
    id: z.string(),
  })

  const { id: videoId } = paramSchema.parse(request.params)

  await database.delete(videoId)

  return reply.send()
})

server.listen({ port: 3333 }).then(() => 'HTTP server is running.')
