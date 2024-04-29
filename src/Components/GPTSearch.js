import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTMovieSuggestions from './GPTMovieSuggestions'
import { BG_URL } from '../Utils/Constants'

const GPTSearch = () => {
  return (
    <div>
        <div className='absolute -z-10'>
            <img src={BG_URL} alt="BG_IMG"/>
        </div>
        <GPTSearchBar/>
        <GPTMovieSuggestions/>
    </div>
  )
}

export default GPTSearch