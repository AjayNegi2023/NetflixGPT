import React, { useEffect } from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../Utils/Firebase';
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../Utils/userSlice';
import { useDispatch } from "react-redux";
import { Logo } from '../Utils/Constants';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user)
  const handleSignout = () => {
    signOut(auth).then(() => {

    }).catch((error) => {
      navigate("/error");
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, password, photoURL } = user;
        console.log("photoURL", photoURL)
        dispatch(addUser({ uid: uid, email: email, password: password, photoURL: photoURL }));
        navigate("/browse");
      }

      else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //Unsubscribe when component will unmount
    return () => unsubscribe();
  }, []);
  return (
    <div className='absolute px-8 py-2 w-full bg-gradient-to-b from-black z-10 flex justify-between'>
      <img
        className='w-44 '
        src={Logo} alt="LOGO" />

      {user && <div className='flex p-2'>
        <img src={user?.photoURL} alt="user" className='w-12 h-12 ' />
        <button className="font-bold text-white" onClick={handleSignout}>Sign out</button>
      </div>}

    </div>
  )
}

export default Header