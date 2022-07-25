import React, { useContext, memo } from 'react'
import { useParams } from 'react-router-dom';
import { AccountContext, UserInfo } from '../../../../context/AccountData'
import ErrorPage from '../../../Error/Error';
import SubHeader from '../../../SubHeader/SubHeader'
import UserInfomation from '../../UserInfo/UserInfo'


const ProfileSetting = () => {
  const {userName} = useParams();
  const userData = useContext(AccountContext)

  // const userData = localStorage.getItem('user');
  const user: UserInfo = userData && userData.account;

  if (user.user !== userName) return <ErrorPage />
  return (
    <div className='wrap border-x-only'>
      <div className='container relative'>
        <section>
          <SubHeader pageName='My Profile' rootURL={`/user/${userName}/settings`} />
        </section>
        <section className='flex flex-col items-center mt-10'>
          <UserInfomation />
        </section>
        <section className='flex flex-col items-center mt-20'>
          <div>
            <p className='text-sm text-center w-10/12 mx-auto'>
              To edit your wallet name, click on the button below 
              and follow the instructions at the website:
              <span className='text-primaryColor font-semibold'> https://www.pns.link</span>
            </p>
          </div>
          <div className='w-full mt-10'>
            <a
              href="https://www.pns.link"
              className='block w-full text-center text-xl py-4 font-semibold 
              rounded-3xl bg-primaryColor text-white cursor-pointer opacity-80 
              hover:opacity-100'
            >
              Edit Name
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default memo(ProfileSetting)