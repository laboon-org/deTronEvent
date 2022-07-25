import React, { ReactElement, memo, useContext } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { RiWallet3Fill } from 'react-icons/ri'
import { RiQrScan2Line } from 'react-icons/ri'
import { IoSettingsSharp } from 'react-icons/io5';

import IMG_LOGO from '../../assets/images/tron.png'

import IMG_AVATAR from '../../assets/images/user-avatar.png';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import './Header.css'
// import { useCurrentUser, UserInfo } from '../../context/CurrentUser';
import { AccountContext, UserInfo } from '../../context/AccountData';


interface Props {
  isUserPage?: boolean;
  setWalletModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setUserModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = (props: Props): ReactElement => {
  const userData = useContext(AccountContext)
  // const userData = localStorage.getItem('user');
  // const user: UserInfo = userData && JSON.parse(userData);
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (url: string): void => {
    navigate(url);
  }
  return (
    <div className='home-header flex justify-between h-8 items-center'>
      <div className='header-left-items h-full flex items-center'>
        <article id="logo">
          <button className='flex items-center'>
            <img src={IMG_LOGO} alt="deTronEvent" className='h-12 w-12' />
            <p className='text-lg text-primaryColor font-bold select-none leading-5 w-1/3 ml-2 text-left'>
              deTronEvent
            </p>
          </button>
        </article>
      </div>
      {props.isUserPage
      ?
      <div className="header-right-items">
        <article id="header-user-setting" className='h-5/6'>
          <button onClick={() => handleNavigate("settings")}>
            <i className='text-primaryColor text-xl'><IoSettingsSharp /></i>
          </button>
        </article>
      </div>
      :
      <div className="header-right-items">
        <article>
          <button className='header-scan' onClick={() => handleNavigate("/scan")}>
            <i><RiQrScan2Line /></i>
          </button>
        </article>
        <article>
          <button
            className='header-wallet-overview'
            onClick={() => props.setWalletModal && props.setWalletModal(true)}
          >
            <i><RiWallet3Fill /></i>
          </button>
        </article>
        <article id="header-user-overview">
          <button className='user-avt-btn' onClick={() => props.setUserModal && props.setUserModal(true)}>
            <div className='icon-wallet-custom'>
            <Jazzicon  diameter={100} seed={jsNumberForAddress(userData.account.user)} />
            </div>
            {/* <img src={userData.account && userData.account.img} alt="User"/> */}
          </button>
        </article>
      </div>
    }
    </div>
  )
}

export default memo(Header)