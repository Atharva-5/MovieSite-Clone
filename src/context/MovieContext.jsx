import { createContext, useState, useEffect, useContext } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFav = localStorage.getItem("favorites")

        if (storedFav) setFavorites(JSON.parse(storedFav))
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addFavorites = (movie) => {
        setFavorites((prev) => {
            if (prev.some((fav) => fav.imdbID === movie.imdbID)) {
                return prev; // Don't add duplicates
            }
            return [...prev, movie];
        });
    };
    const removeFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.imdbID !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some((fav) => fav.imdbID === movieId); // Check if movie is in favorites
    };

    const value = {
        favorites,
        addFavorites,
        removeFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}
