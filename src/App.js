import React, { useState, useEffect } from 'react';
import './App.css';
import searchIcon from './searchIcon.png';
import MovieCard from './MovieCard';
import { Routes, Route, Link } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';  // MovieProvider wrapping App
import Favorites from './Favorites';

const API_URL = 'https://www.omdbapi.com?apikey=822f2f33';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search || []);
    };

    useEffect(() => {
        searchMovies('Avengers');
    }, []);

    return (
        <MovieProvider>
            <div className='app'>
                <nav className="navbar">
                    <ul className="nav-links">
                        <li><Link to="/" className="nav-link">Home</Link></li>
                        <li><Link to="/favorites" className="nav-link">Favorites</Link></li>
                    </ul>
                </nav>
                <h1>MoviesVerse</h1>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <div className="search">
                                    <input
                                        placeholder="Search for movies and series"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <img
                                        src={searchIcon}
                                        alt="Search"
                                        onClick={() => searchMovies(searchTerm)}
                                    />
                                </div>

                                {movies?.length > 0 ? (
                                    <div className="container">
                                        {movies.map((movie) => (
                                            <MovieCard key={movie.imdbID} movie={movie} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="empty">
                                        <h2>No movies found</h2>
                                    </div>
                                )}
                            </>
                        }
                    />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </div>
        </MovieProvider>
    );
};

export default App;
