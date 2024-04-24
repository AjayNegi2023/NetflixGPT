import React,{useEffect} from "react";
import { API_OPTIONS } from "../Utils/Constants";
import { useDispatch } from "react-redux";
import { addTVSeries } from "../Utils/movieSlice";

const useTVSeries = ()=>{
    const dispatch = useDispatch();

  const getPopularMovies = async()=>{
    const url = 'https://api.themoviedb.org/3/tv/top_rated?page=1';
    const data = await fetch(url, API_OPTIONS);
    const JSON = await data.json();
    dispatch(addTVSeries(JSON.results));
  }

  useEffect(()=>{
    getPopularMovies();
  },[])

}

export default useTVSeries;