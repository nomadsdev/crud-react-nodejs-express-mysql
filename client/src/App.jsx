import { useState } from 'react'
import './App.css'

import Content from './App/Content'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Content />
    </>
  )
}

export default App
