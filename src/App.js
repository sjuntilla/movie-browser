import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//COMPONENTS
import MovieList from './components/movieList';
import MovieListHeading from './components/MovieListHeadings';
import SearchBox from './components/SearchBox';
import addFavorite from './components/AddToFavorites';
import RemoveFavorites from './components/removeFavorites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] =useState([]);

  const getMovieRequest = async(searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=770013d2`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem('movie-browser-favorites')
    );
    setFavorites(movieFavorites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('movie-browser-favorites', JSON.stringify(items));
  }

      const addFavoriteMovie = (movie) => {
      const newFavoriteList = [...favorites, movie];
      setFavorites(newFavoriteList);
      saveToLocalStorage(newFavoriteList);
    }

    const removeFavoriteMovie = (movie) => {
      const newFavoriteList = favorites.filter(
        (favorite) => favorite.imdbID !== movie.imdbID
      );
      setFavorites(newFavoriteList);
      saveToLocalStorage(newFavoriteList);
    }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading= 'Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
        <div className='row'>
        <MovieList movies= {movies} favoriteComponent={addFavorite} handleFavoritesClick={addFavoriteMovie} 
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = 'Favorites' />
      </div>
      <div className='row'>
        <MovieList movies={favorites} handleFavoritesClick={removeFavoriteMovie} favoriteComponent={RemoveFavorites} />
      </div>
    </div>
  )
};

export default App;