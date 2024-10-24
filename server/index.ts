import { Hono } from 'hono'
import { stream } from 'hono/streaming'
import { serve } from '@hono/node-server'
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

serve({
  fetch: app.fetch,
  port: 3000,
})
