import React from 'react';
import { useMovieContext } from './context/MovieContext';

const MovieCard = ({ movie }) => {
    const { isFavorite, addFavorites, removeFavorites } = useMovieContext();
    const favorite = isFavorite(movie.imdbID);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        if (favorite) {
            removeFavorites(movie.imdbID);  // Remove by imdbID
        } else {
            addFavorites(movie);  // Add full movie object
        }
    };

    return (
        <div className='movie'>
            <div className="movie-header">
                <p>{movie.Year}</p>
            </div>
            <button
                className={`fav ${favorite ? 'active' : ''}`} // Toggle favorite button style
                onClick={handleFavoriteClick}
            >
                ♥
            </button>
            <div>
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
                    alt={movie.Title}  // Use movie title for alt text
                />
            </div>
            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    );
};

export default MovieCard;
