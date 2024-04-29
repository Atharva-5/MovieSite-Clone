import { useState, useEffect } from 'react';
import './App.css';
import searchIcon from './searchIcon.png';
import MovieCard from './MovieCard';
const API_URL = 'https://www.omdbapi.com?apikey=822f2f33';


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies = async (title) => {
        console.log("calling");
        const response = await fetch(`${API_URL}&s=${title}`);

        const data = await response.json();
        console.log("received", data);


        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('John Wick');
    }, []);

    return (
        <div className='app'>
            <h1>MoviesVerse</h1>
            <div className='search'>
                <input placeholder='Search for movies and series'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img src={searchIcon}
                    alt='Search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className='container'>
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className='empty'>
                            <h2>No movies found</h2>
                        </div>
                    )
            }

        </div>
    );
}

export default App;
