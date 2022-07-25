import React, {memo} from 'react'
import { useNavigate, NavigateFunction, useParams } from 'react-router-dom';
import { FaUser } from 'react-icons/fa'
import {IoIosArrowForward} from 'react-icons/io'
import {IoWalletSharp} from 'react-icons/io5'
import {ImExit} from 'react-icons/im'

import { useGlobalExit } from '../../../context/GlobalExit'

import SubHeader from '../../SubHeader/SubHeader'
import Disconnect from '../../DisconnectModal/DisconnectModal'

import './UserSettings.css'


const UserSetting: React.FC = () => {
  const {userName} = useParams();
  const {isExit, setExit} = useGlobalExit();
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (url: string): void => {
    navigate(url);
  }
  return (
    <div className='wrap border-x-only relative'>
      {isExit && (
        <Disconnect setExit={setExit} />
      )}
      <div className='container'>
        <section>
          <SubHeader pageName='Settings' rootURL={`/user/${userName}`} />
        </section>
        <section className='mt-6'>
          <article 
            className='user-setting-items primary' 
            onClick={() => handleNavigate('profile')}
          >
            <div>
              <i className='primary-item-icon'><FaUser /></i>
              <p>My Profile</p>
            </div>
            <div>
              <button className='user-setting-next-btn'>
                <i><IoIosArrowForward /></i>
              </button>
            </div>
          </article>
          <article 
            className='user-setting-items primary' 
            onClick={() => handleNavigate('wallet')}
          >
            <div>
              <i className='primary-item-icon'><IoWalletSharp /></i>
              <p>My Wallet</p>
            </div>
            <div>
              <button className='user-setting-next-btn'>
                <i><IoIosArrowForward /></i>
              </button>
            </div>
          </article>
          <article 
            className='user-setting-items exit'
            onClick={() => setExit(true)}
          >
            <div className='user-setting-title'>
              <i className='exit-icon'><ImExit /></i>
              <p>Disconnect</p>
            </div>
          </article>
        </section>
      </div>
    </div>
  )
}

export default memo(UserSetting)