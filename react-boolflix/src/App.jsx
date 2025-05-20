import { useEffect, useState } from 'react'
import axios from 'axios'

const apiKey = '631f087dc87791077683c9d753605830'

function App() {

  const [inputValue, setInputValue] = useState('')

  const handleClick = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputValue}`)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    setInputValue

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
