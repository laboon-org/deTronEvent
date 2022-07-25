import React, { ReactElement, useContext } from 'react'
import { Link } from 'react-router-dom'

import './Welcome.css'
import IMG_LOGO from '../../assets/images/tron.png'
import { AccountContext } from '../../context/AccountData';
import LoadingField from '../../components/LoadingField/LoadingField';
const Welcome: React.FC = (): ReactElement => {
  const account = useContext(AccountContext)
  const isLogin = localStorage.getItem('isLogin')
  return (
    <div className='welcome-bg min-h-screen relative bg-no-repeat	bg-cover bg-center'>
      <div className="absolute inset-0 bg-black opacity-40 z-0">
      </div>
      {/* Container */}
      <div className='container relative z-50'>

        {/* Logo */}
        <div className='flex-1 flex justify-center items-center w-2/5'>
          <img src={IMG_LOGO} alt="NTS" />
        </div>

        {/* Welcome line */}
        <div className='text-center font-semibold'>
          <p
            id="greeting"
            className='text-white text-2xl'
          >
            Welcome to
          </p>
          <h1
            id="title"
            className='welcome-title text-primaryColor text-3xl mt-2'
          >
            deTronEvent
          </h1>
        </div>

        {/* Next button */}
        <div id="next-btn" className='w-full mt-12 mb-20'>
          <Link
            to={account.account?.fetch && JSON.parse(isLogin === null ? 'false': isLogin) ? '/home' : '/login'}
            className={`${account.checked && 'disable-button'} text-white bg-primaryColor block w-full text-3xl rounded-2xl py-4
            cursor-pointer font-semibold hover:bg-white hover:text-primaryColor text-center`}
          >
            {
              account.checked && isLogin ?
                <LoadingField />
                :
                'NEXT'
            }

          </Link>
        </div>
      </div>
    </div>
  )
}

export default Welcome