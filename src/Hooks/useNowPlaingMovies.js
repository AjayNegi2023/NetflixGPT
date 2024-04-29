import React,{useEffect} from "react";
import { API_OPTIONS } from "../Utils/Constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../Utils/movieSlice";

const useNowPlayingMovies = ()=>{
    const dispatch = useDispatch();

  const getNowPlayingMovies = async()=>{
    const url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
    const data = await fetch(url, API_OPTIONS);
    const JSON = await data.json();
    dispatch(addNowPlayingMovies(JSON.results));
  }

  useEffect(()=>{
    getNowPlayingMovies();
  },[])

}

export default useNowPlayingMovies;