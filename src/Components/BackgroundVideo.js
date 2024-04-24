import React, { useEffect } from 'react'
import { API_OPTIONS } from '../Utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { addTrailerVideo } from '../Utils/movieSlice';
import useMovieTrailer from '../Hooks/useMovieTrailer';
const BackgroundVideo = ({ movieID }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo)
  useMovieTrailer(movieID)
  return (
    <div className=" w-screen">
    <iframe
      className="w-screen aspect-video"
      src={
        "https://www.youtube.com/embed/" +trailerVideo?.key + "?&autoplay=1&mute=1"
      }>
      </iframe>
    </div>
  )
}

export default BackgroundVideo