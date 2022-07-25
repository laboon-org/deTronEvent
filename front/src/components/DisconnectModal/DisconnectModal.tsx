import React, { useContext, memo } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom';
import './Disconnect.css'
import IMG_EXIT from '../../assets/images/disconnect-btn-2.png'
import { AccountContext, UserInfo } from '../../context/AccountData';
import detectEthereumProvider from "@metamask/detect-provider";

interface Props {
  setExit: React.Dispatch<React.SetStateAction<boolean>>;
}

const Disconnect: React.FC<Props> = (props: Props): React.ReactElement => {
  const userData = useContext(AccountContext)

  const navigate: NavigateFunction = useNavigate();
  const confirmExit = async () => {
    // TODO: no recommend this solution!
    localStorage.setItem('isLogin__DEV_TRONLINK__', JSON.parse('false'))
    userData.setAccount(
      {
        id: '',
        user: '',
        img: '',
        fetch: false, 
        balance: 0
      }
    )
    navigate('/login');
  }
  const cancelExit = (): void => {
    props.setExit(false);
  }

  return (
    <section
      className='modal-wrap'
    >
      <div
        className='modal-bg'
        onClick={cancelExit}
      ></div>
      <div
        className='fixed-comp modal'
      >
        <div className='mt-16'>
          <img src={IMG_EXIT} alt="Exit" className='object-cover h-12' />
        </div>
        <div className='mt-10'>
          <p className='font-semibold text-xl'>Are you sure want to disconnect?</p>
        </div>
        <div className='dis-btn w-10/12 flex justify-between mt-10 mb-10'>
          <button className='secondary-btn' onClick={cancelExit}>
            Cancel
          </button>
          <button className='primary-btn ml-4' onClick={confirmExit}>
            Yes
          </button>
        </div>
      </div>
    </section>
  )
}

export default memo(Disconnect)