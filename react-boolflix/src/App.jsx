import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>BoolFlix</h1>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8">
            <input type="text" placeholder="Cerca un film" className="form-control" />
          </div>
          <div className="col-12 col-md-4">
            <button className="btn btn-primary">Cerca</button>
          </div>
        </div>
      </ div>
    </>
  )
}

export default App
