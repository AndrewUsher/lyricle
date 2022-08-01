import { createRouter } from './context'
import { z } from 'zod'

export const exampleRouter = createRouter()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      }
    },
  })
  .query('getArtists', {
    async resolve({ ctx }) {
      return await ctx.prisma.artist.findMany({})
    },
  })
  .mutation('addArtist', {
    input: z.object({
      name: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      console.log(input.name)
      return await ctx.prisma.artist.create({
        data: {
          name: input.name,
        },
      })
    },
  })
