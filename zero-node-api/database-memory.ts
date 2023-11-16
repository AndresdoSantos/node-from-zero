import { randomUUID } from 'node:crypto'

interface IVideoDTO {
  title: string
  description: string
  duration: number
}

export class DatabaseMemory {
  #videos = new Map()

  list(search?: string) {
    return Array.from(this.#videos.entries())
      .map((videoArray) => {
        const id = videoArray[0]
        const data = videoArray[1]

        return {
          id,
          ...data,
        }
      })
      .filter((video) => {
        if (search) {
          return video.title.includes(search)
        }

        return true
      })
  }

  create(video: IVideoDTO) {
    // Validations can be done to see if the video is coming with the correct information
    const videoId = randomUUID()

    this.#videos.set(videoId, video)
  }

  update(id: string, video: IVideoDTO) {
    this.#videos.set(id, video)
  }

  delete(id: string) {
    this.#videos.delete(id)
  }
}
