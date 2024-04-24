import {createSlice} from "@reduxjs/toolkit";
const movieSlice = createSlice(
    {
        name:"movies",
        initialState:{
            nowPlayingMovies: null,
            popularMovies: null,
            topRatedMovues:null,
            upcomingMovies:null,
            TVSeries:null,
            trailerVideo : null
        },
        reducers:{
            addNowPlayingMovies:(state,action)=>{
                state.nowPlayingMovies=action.payload;
            },
            addTrailerVideo : (state , action)=>{
                state.trailerVideo = action.payload;
            },
            addPopularMovies:(state,action)=>{
                state.popularMovies=action.payload;
            },
            addTopRatedMovies : (state , action)=>{
                state.topRatedMovies = action.payload;
            },
            addUpcomingMovies : (state , action)=>{
                state.upcomingMovies = action.payload;
            },
            addTVSeries : (state , action)=>{
                state.TVSeries = action.payload;
            }
        }

    }
);

export const {addNowPlayingMovies,addTrailerVideo,addPopularMovies,addTopRatedMovies,addTVSeries,addUpcomingMovies}=movieSlice.actions
export default movieSlice.reducer;