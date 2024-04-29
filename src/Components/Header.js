import React, { useEffect } from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../Utils/Firebase';
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../Utils/userSlice';
import { useDispatch } from "react-redux";
import { Logo, SUPPORTED_LANG } from '../Utils/Constants';
import { toggleGPTSearchView } from '../Utils/gptSlice';
import { changeLanguage } from '../Utils/configSlice';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGPTSearch = useSelector(store => store.gpt.showGPTSearch);
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

  const handleSearchClick = ()=>{
    dispatch(toggleGPTSearchView());
  }

  const handleLangChange = (e)=>{
    dispatch(changeLanguage(e.target.value))
  }
  return (
    <div className='absolute px-8 py-2 w-full bg-gradient-to-b from-black z-10 flex justify-between'>
      <img
        className='w-44 '
        src={Logo} alt="LOGO" />

      {user && <div className='flex p-2'>
       { showGPTSearch && <select className='p-2 m-2 rounded-lg bg-gray-500 text-white' onChange={handleLangChange}>
            {
                SUPPORTED_LANG.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
            }
        </select>}
        <button className='py-2 px-4 mx-4 mt-2 bg-purple-800 text-white rounded-lg' onClick={handleSearchClick}>{ showGPTSearch ? "Home" : "GPT Search"}</button>
        <img src={user?.photoURL} alt="user" className='w-12 h-12 ' />
        <button className="font-bold text-white" onClick={handleSignout}>Sign out</button>
      </div>}

    </div>
  )
}

export default Header