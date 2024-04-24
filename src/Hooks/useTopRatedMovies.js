import React, { useEffect } from 'react'
import { API_OPTIONS } from '../Utils/Constants';
import { useDispatch } from 'react-redux';
import { addTopRatedMovies } from '../Utils/movieSlice';

const useTopRatedMovies = () => {
    const dispatch = useDispatch()
    const getTopRatedMovies = async()=>{
        const url = 'https://api.themoviedb.org/3/movie/top_rated?page=1'
        const data= await fetch(url ,API_OPTIONS);
        const JSON = await data.json();
        dispatch(addTopRatedMovies(JSON.results))
    }
  
    useEffect(()=>{
        getTopRatedMovies()
    },[])
}

export default useTopRatedMovies