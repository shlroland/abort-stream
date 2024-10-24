/// <reference lib="deno.ns" />
import { Hono } from '@hono/hono'
import { stream } from '@hono/hono/streaming'
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const app = new Hono()

const api = new Hono().get('/', (c) => {
  return stream(c, async (stream) => {
    stream.onAbort(() => {
      console.log('abort')
    })

    stream.write('Hello Hono!1')
    await sleep(10000)
    stream.write('Hello Hono!2')
    await sleep(10000)
    stream.write('Hello Hono!3')
    await sleep(10000)
    stream.write('Hello Hono!4')
    await sleep(10000)
    stream.write('Hello Hono!5')
  })
})

const client = app.get('/', (c) => {
  return c.text('Hello Hono!')
}).route('/api', api)

export type App = typeof client

Deno.serve({ port: 3000 }, app.fetch)
