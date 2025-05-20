import { useEffect, useState } from 'react'
import axios from 'axios'
import './index.css'

const apiKey = '631f087dc87791077683c9d753605830'

function App() {

  const [inputValue, setInputValue] = useState('')
  const [movies, setMovies] = useState([])

  const handleClick = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputValue}`)
      .then((response) => {
        console.log(response.data.results);
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="netflix-app">
      <header className="netflix-header">
        <h1 className="netflix-logo">BoolFlix</h1>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Cerca un film"
            className="search-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
          />
          <button className="search-button" onClick={handleClick}>Cerca</button>
        </div>
      </header>

      <div className="content-container">
        <div className="movies-grid">
          {movies.map(movie => (
            <div key={movie.id} className="movie-card">
              <div className="movie-poster">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div className="no-poster">No Image Available</div>
                )}
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p><strong>Lingua:</strong> {movie.original_language}</p>
                <p><strong>Voto:</strong> {Math.ceil(movie.vote_average / 2)}/5</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
