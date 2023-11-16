import { randomUUID } from 'node:crypto'

import { sql } from './sql.js'

interface IVideoDTO {
  title: string
  description: string
  duration: number
}

export class DatabasePostgres {
  async list(search?: string) {
    let videos

    if (search) {
      videos = await sql`select * from videos where title ilike ${
        '%' + search + '%'
      }`
    } else {
      videos = await sql`select * from videos`
    }

    return videos
  }

  async create(video: IVideoDTO) {
    const videoId = randomUUID()

    const { description, duration, title } = video

    await sql`insert into videos (id, title, description, duration) values (${videoId}, ${title}, ${description}, ${duration})`
  }

  async update(id: string, video: IVideoDTO) {
    const { description, duration, title } = video

    await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id};`
  }

  async delete(id: string) {
    await sql`delete from videos WHERE id = ${id};`
  }
}
