import { useEffect, useState } from 'react'
import axios from 'axios'
import ReactCountryFlag from 'react-country-flag'
import './index.css'

const apiKey = '631f087dc87791077683c9d753605830'

const languageToCountryCode = {
  'en': 'US',
  'it': 'IT',
};

function App() {
  const [inputValue, setInputValue] = useState('')
  const [movies, setMovies] = useState([])
  const [tvShows, setTvShows] = useState([])

  const handleClick = () => {
    // Cerca film
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputValue}`)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error)
      })

    // Cerca serie TV
    axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${inputValue}`)
      .then((response) => {
        setTvShows(response.data.results);
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
            placeholder="Cerca film e serie TV"
            className="search-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
          />
          <button className="search-button" onClick={handleClick}>Cerca</button>
        </div>
      </header>

      <div className="content-container">
        {/* Sezione Film */}
        {movies.length > 0 && (
          <div className="content-section">
            <h2 className="section-title">Film</h2>
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
                    <span className="content-badge">Film</span>
                  </div>
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p className="language-info">
                      {languageToCountryCode[movie.original_language] ? (
                        <ReactCountryFlag
                          countryCode={languageToCountryCode[movie.original_language]}
                          svg
                          title={movie.original_language}
                        />
                      ) : (
                        <span className="language-code">{movie.original_language.toUpperCase()}</span>
                      )}
                    </p>
                    <p><strong>Voto:</strong> {Math.ceil(movie.vote_average / 2)}/5</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sezione Serie TV */}
        {tvShows.length > 0 && (
          <div className="content-section">
            <h2 className="section-title">Serie TV</h2>
            <div className="movies-grid">
              {tvShows.map(tvShow => (
                <div key={tvShow.id} className="movie-card">
                  <div className="movie-poster">
                    {tvShow.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                        alt={tvShow.name}
                      />
                    ) : (
                      <div className="no-poster">No Image Available</div>
                    )}
                    <span className="content-badge">Serie</span>
                  </div>
                  <div className="movie-info">
                    <h3>{tvShow.name}</h3>
                    <p className="language-info">
                      {languageToCountryCode[tvShow.original_language] ? (
                        <ReactCountryFlag
                          countryCode={languageToCountryCode[tvShow.original_language]}
                          svg
                          title={tvShow.original_language}
                        />
                      ) : (
                        <span className="language-code">{tvShow.original_language.toUpperCase()}</span>
                      )}
                    </p>
                    <p><strong>Voto:</strong> {Math.ceil(tvShow.vote_average / 2)}/5</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
