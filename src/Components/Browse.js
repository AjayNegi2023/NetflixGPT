import React from 'react'
import Header from './Header'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import useNowPlayingMovies from '../Hooks/useNowPlaingMovies'
import usePopularMovies from '../Hooks/usePopularMovies'
import useTopRatedMovies from '../Hooks/useTopRatedMovies'
import useUpcomingMovies from '../Hooks/useUpcomingMovies'
import useTVSeries from '../Hooks/useTVSeries'
import GPTSearch from './GPTSearch'
import { useSelector } from 'react-redux'

const Browse = () => {

  const showGPTSearch = useSelector(store => store.gpt.showGPTSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies()
  useTVSeries();


  return (
    <div>
      <Header/>
      {
        showGPTSearch ? <GPTSearch/> : 
        <>
        <MainContainer/>
        <SecondaryContainer/>
        </>
      }
      
      

    </div>
  )
}

export default Browse