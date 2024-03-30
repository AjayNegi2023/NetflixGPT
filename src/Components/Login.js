import React, { useState, useRef } from 'react'
import Header from './Header';
import { checkValidData } from '../Utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Utils/Firebase"
const Login = () => {
  const [isSignIn, setSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignIn = () => {
    setSignIn(!isSignIn)
  }

  const handleButtonClick = () => {
    //Validate The Form Data 
    const e = email.current.value;
    const p = password.current.value;
    const msg = checkValidData(e, p);
    setErrorMessage(msg);

    //IF ERROR OCCUR THEN RETURN
    if (msg) return;

    //    SIGN-UP
    if (!isSignIn) {
      createUserWithEmailAndPassword(auth, e, p)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " : " + errorMessage)
        });
    }

    else {
      //SIGN_IN
      signInWithEmailAndPassword(auth, e, p)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " : " + errorMessage)
        });
    }


  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/fb548c0a-8582-43c5-9fba-cd98bf27452f/IN-en-20240326-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt="bg" />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className='absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4 '>{isSignIn ? "Sign In" : "Sign Up"}</h1>
        {!isSignIn && <input type="text" placeholder='Enter Your Fullname' className='p-2 my-4 w-full bg-gray-700 rounded-lg' />}
        <input type="text" placeholder='Enter Your Email' className='p-2 my-4 w-full bg-gray-700 rounded-lg' ref={email} />
        <input type="password" placeholder='Enter Your password' className='p-2 my-4 w-full bg-gray-700 rounded-lg' ref={password} />
        <p className='text-red-600 font-bold py-2 '>{errorMessage}</p>
        <button className='p-4 my-4 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignIn ? "Sign In" : "Sign Up"} </button>
        <p className="cursor-pointer" onClick={toggleSignIn} >{isSignIn ? "New to Netflix? Sign Up now" : "Already have an account ?Sign In"} </p>
      </form>
    </div>
  )
}

export default Login;