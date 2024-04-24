import React from 'react'
import MovieList from './MovieList'
import {useSelector} from 'react-redux';


const SecondaryContainer = () => {

  const movies = useSelector((store)=> store.movies)
  {/*
  Movie List- Moviw Cards
  Popular 
  Now playing 
  Trending 
  Horror
*/}
  return (
   movies && (
   <div className=' bg-black'>
   <div className='-mt-52 relative z-20 pl-12'>
    <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} isNowPlaying />
    <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
    <MovieList title={"Popular"} movies={movies.popularMovies} />
    <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
    <MovieList title={"TV Series"} movies={movies.TVSeries} />
   </div>
  </div>
   )
  )
}

export default SecondaryContainer