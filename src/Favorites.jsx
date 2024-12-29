import React from 'react';
import { useMovieContext } from './context/MovieContext';
import MovieCard from './MovieCard';

const Favorites = () => {
    const { favorites } = useMovieContext();

    return (
        <div className="favorites">
            <h2>Your Favorites</h2>
            {favorites?.length > 0 ? (
                <div className="container">
                    {favorites.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h3>No favorites added yet.</h3>
                </div>
            )}
        </div>
    );
};

export default Favorites;
