import React, { useRef } from 'react'
import lang from '../Utils/languageConstant'
import { useSelector } from 'react-redux'
import openai from '../Utils/openAi'
import { API_OPTIONS } from '../Utils/Constants';

const GPTSearchBar = () => {
    const langKey = useSelector((store)=> store.config.lang);
    const searchText = useRef(null);

    const searchMovieTMDB = async (movie) => {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
  
      return json.results;
    };


    const handleSearchClick = async()=>{
      const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query "+searchText.current.value+". Only give me names of 5 movies, comma seperated like the example Result given ahead. Example Result : KGF,Kantara,Pushpa,Salaar,Ghost"
        //API CALL 
        const gptResults =   await openai.chat.completions.create({
          messages: [{ role: 'user', content: gptQuery}],
          model: 'gpt-3.5-turbo',
        });

      if(!gptResult.choices){
        return ;
      }

      console.log(gptResults.choices);
        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
        const tmdbResults = await Promise.all(promiseArray);

        


    }
  return (
    <div className='pt-[10%] flex justify-center'>
        <form className='w-1/2 bg-black grid grid-cols-12 ' onSubmit={(e)=>e.preventDefault()} >
            <input type="text" placeholder={lang[langKey].getSearchPlaceholder} className='p-4 m-4 col-span-9 ' ref={searchText}/>
            <button className='m-4 py-2 px-4 bg-red-700 text-white rounded-lg col-span-3' onClick={handleSearchClick}>{lang[langKey].search} </button>
        </form>
    </div>
  )
}

export default GPTSearchBar