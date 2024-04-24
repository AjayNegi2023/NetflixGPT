import React, { useEffect } from 'react'
import { API_OPTIONS } from '../Utils/Constants';
import { useDispatch } from 'react-redux';
import { addUpcomingMovies } from '../Utils/movieSlice';
const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const getUpcomingMovies = async()=>{
        const url = 'https://api.themoviedb.org/3/movie/upcoming?page=1';
        const data = await fetch(url , API_OPTIONS);
        const JSON = await data.json();
        dispatch(addUpcomingMovies(JSON.results));
    }

    useEffect(()=>{
        getUpcomingMovies()
    },[])
}

export default useUpcomingMovies