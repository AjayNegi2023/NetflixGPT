import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTrailerVideo } from '../Utils/movieSlice';
import { API_OPTIONS } from '../Utils/Constants';


const useMovieTrailer = (movieID) => {
    //Fetch ID to get Trailer
        const dispatch = useDispatch();
        const trailerVideo = useSelector((store) => store.movies.trailerVideo);
        const getMovieVideos = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`, API_OPTIONS);
        const JSON = await data.json();
        const filterData = JSON.results.filter((vedio) => vedio.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : JSON.results[0];
        dispatch(addTrailerVideo(trailer));
    }

    useEffect(() => {
        !trailerVideo && getMovieVideos();
    }, [])

}

export default useMovieTrailer;
