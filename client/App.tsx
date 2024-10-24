// @deno-types="@types/react"
import { useEffect, useState } from 'react'
import './App.css'

import { hc } from 'hono/client'
import type { App } from '../server/index.ts'

const hono = hc<App>('/api')

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    void (async () => {
      const res = await hono.api.$get()
      const decoder = new TextDecoder()
      const reader = res.body!.getReader()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value, { stream: true })
        console.log(text)
      }
      // from(res.body!).pipe(
      //   map((chunk) => decoder.decode(chunk, { stream: true })),
      // ).subscribe((text) => {
      //   console.log(text)
      // })
    })()
  }, [])

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
