import React from 'react'
import { useSelector } from 'react-redux';
import BackgroundVideo from './BackgroundVideo';
import BackgroundTitle from './BackgroundTitle';


const MainContainer = () => {

    const movies = useSelector((store) => store.movies?.nowPlayingMovies)
    if (!movies) return;
    const mainMovie = movies[0];

    const { original_title, overview, id, key } = mainMovie;
    return (
        <div>
            <BackgroundTitle title={original_title} overview={overview} />
            <BackgroundVideo movieID={id} />
        </div>
    )
}

export default MainContainer