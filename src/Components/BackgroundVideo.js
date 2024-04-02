import React, { useEffect } from 'react'
import { API_OPTIONS } from '../Utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { addTrailerVideo } from '../Utils/movieSlice';
const BackgroundVideo = ({ movieID }) => {
  //Fetch ID to get Trailer
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo)
  const getMovieVideos = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/823464/videos?language=en-US', API_OPTIONS);
    const JSON = await data.json();
    const filterData = JSON.results.filter((vedio) => vedio.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : JSON.results[0];
    dispatch(addTrailerVideo(trailer));
  }

  useEffect(() => {
    getMovieVideos();
  }, [])


  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      >
      </iframe>
    </div>
  )
}

export default BackgroundVideo