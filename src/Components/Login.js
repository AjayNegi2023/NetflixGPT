import React, { useState, useRef } from 'react'
import Header from './Header';
import { checkValidData } from '../Utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth } from "../Utils/Firebase"
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux"
import { addUser } from '../Utils/userSlice';
import { BG_URL } from '../Utils/Constants';
const Login = () => {
  const [isSignIn, setSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name=useRef(null);
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
          console.log(e)
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
          }).then(() => {
            const {uid,email,password,photoURL} = auth.currentUser;
            dispatch(addUser({uid:uid,email:email,password:password,photoURL:photoURL}));
          navigate("/browse");
          }).catch((error) => {
           setErrorMessage(error.message)
          });
          
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
          navigate("/browse");
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
        <img src={BG_URL} alt="bg" />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className='absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4 '>{isSignIn ? "Sign In" : "Sign Up"}</h1>
        {!isSignIn && <input type="text" placeholder='Enter Your Fullname' className='p-2 my-4 w-full bg-gray-700 rounded-lg' ref={name}/>}
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