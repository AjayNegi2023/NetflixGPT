import React,{useEffect} from "react";
import { API_OPTIONS } from "../Utils/Constants";
import { useDispatch } from "react-redux";
import {  addPopularMovies } from "../Utils/movieSlice";

const usePopularMovies = ()=>{
    const dispatch = useDispatch();

  const getPopularMovies = async()=>{
    const url = 'https://api.themoviedb.org/3/movie/popular?page=1';
    const data = await fetch(url, API_OPTIONS);
    const JSON = await data.json();
    dispatch(addPopularMovies(JSON.results));
  }

  useEffect(()=>{
    getPopularMovies();
  },[])

}

export default usePopularMovies;