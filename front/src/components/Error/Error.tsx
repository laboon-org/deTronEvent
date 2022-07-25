import React, { useEffect, useState, memo } from 'react'

import IMG_ERROR from '../../assets/images/search-not-found.png'
import { NavigateFunction, useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = (): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const [countDown, setCountDown] = useState<number>(3);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000)
    return () => clearTimeout(timer);
  }, [])

  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000)

      return () => clearTimeout(timer);
    }
  }, [countDown])

  return (
    <div className='wrap border-x-only'>
      <div className='container justify-center'>
        <div className='w-3/5'>
          <img src={IMG_ERROR} alt="404 Not Found!" className='object-cover'/>
        </div>
        <div className='text-center mt-10 text-primaryColor '>
          <p className='font-bold' style={{fontSize: 60}}>OOPS!</p>
          <small className='font-semibold text-xl'>SOMETHING HAS GONE WRONG...</small>
        </div>
        <div className='mt-12 text-center'>
          <p className='text-lg'>
            You will be redirected to home page after 
            <span className='font-semibold text-primaryColor'> {countDown} </span> 
            seconds
          </p>
        </div>
      </div>
    </div>
  )
}

export default memo(ErrorPage)