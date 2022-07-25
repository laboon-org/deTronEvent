import React, { memo, useContext } from 'react';
import { ImCross } from 'react-icons/im';
import { IoMdLogIn } from 'react-icons/io';
import { IoMdLogOut } from 'react-icons/io'
import { AccountContext } from '../../context/AccountData';
import wallets from '../../data/wallets';
import { useNavigate } from 'react-router-dom';
interface Props {
  setWalletModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalWallet: React.FC<Props> = ({ setWalletModal }: Props): React.ReactElement => {
  const userData = useContext(AccountContext)
  const navigate = useNavigate()

  const cancelModal = (): void => {
    setWalletModal(false);
  }

  const disconnectWallet = () => {
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
  return (
    <section className='modal-wrap'>
      <div className='modal-bg' onClick={cancelModal}></div>
      <div className='fixed-comp modal'>
        <div className='modal-exit-btn'>
          <button onClick={cancelModal}>
            <i><ImCross /></i>
          </button>
        </div>
        <div className='w-10/12'>
          <div className='mt-12 flex justify-center w-full'>
            <p className='font-semibold text-xl'>Wallet</p>
          </div>
          <div className='mt-8 mb-4 flex flex-col items-center'>
            {wallets.map(wallet => (
              <div key={wallet.id} className='header-modal-item'>
                <div className='header-modal-title'>
                  <div className='header-modal-icon wallet'>
                    <img src={wallet.img} alt={wallet.name} />
                  </div>
                  <div className='header-modal-info wallet'>
                    <h6>{wallet.name}</h6>
                    {wallet.available
                      ?
                      <p className='text-primaryColor'>Connected</p>
                      :
                      <p className='text-gray-400'>Disconnect</p>
                    }
                  </div>
                </div>
                <div className='header-modal-value'>
                  {wallet.available
                    ?
                    <button className='wallet-modal-btn' onClick={disconnectWallet}>
                      <i><IoMdLogOut /></i>
                    </button>
                    :
                    <button className='wallet-modal-btn'>
                      <i><IoMdLogIn /></i>
                    </button>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(ModalWallet)