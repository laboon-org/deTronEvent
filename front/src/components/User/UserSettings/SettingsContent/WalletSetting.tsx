import React, { useContext, memo } from 'react'
import {BsCheckLg} from 'react-icons/bs'
import {BiCopy} from 'react-icons/bi'

import IMG_MOONBASE from '../../../../assets/images/icon-moonbase.png'
import IMG_TETHER from '../../../../assets/images/icon-tether.png'
import IMG_TRON from '../../../../assets/images/icon-tron.png'

import SubHeader from '../../../SubHeader/SubHeader'

import wallets from '../../../../data/wallets'
import { useParams } from 'react-router-dom';
import ErrorPage from '../../../Error/Error'
import { AccountContext } from '../../../../context/AccountData'

const WalletSetting = () => {
  const userData = useContext(AccountContext)
console.log(userData);

  const {userName} = useParams();
  // const userData = localStorage.getItem('user');
  // const user = userData && JSON.parse(userData);

  if (userData.account.user !== userName) return <ErrorPage />
  return (
    <div className='wrap border-x-only'>
      <div className='container relative'>
        <section>
          <SubHeader pageName='My Wallet' rootURL={`/user/${userName}/settings`} />
        </section>
        <section className='mt-10 wallet-setting-section'>
          {wallets.map(wallet => (
            <article
              key={wallet.id}
              className={wallet.available ? 'flex justify-between items-center cursor-pointer mt-6' : 'hidden'}
            >
              <div className='flex items-center'>
                <img src={wallet.img} alt={wallet.name} className="object-cover h-8" />
                <p className='ml-2 font-semibold'>{wallet.name.toUpperCase()}</p>
              </div>
              <div>
                <i className='text-primaryColor'><BsCheckLg /></i>
              </div>
            </article>
          ))}
        </section>
        <section className='mt-6 wallet-setting-section'>
          <h6 className=''>Wallet Address:</h6>
          <div className='flex justify-between items-center mt-1'>
            <p className='text-primaryColor'>{userData.account.user}</p>
            <button className='hover:text-primaryColor'>
              <i className='text-xl'><BiCopy /></i>
            </button>
          </div>
        </section>
        <section className='mt-6 wallet-setting-section'>
          <h6 className='mt-6 font-semibold text-lg'>Balance:</h6>
          <div className='balance-items'>
            {/* TODO: change flexible data */}
            <div className='mt-3 flex justify-between items-start'>
              <div className='flex items-center'>
                <img src={IMG_MOONBASE} alt="Tezos" className='object-cover h-6'/>
                <p className='ml-3 text-lg'>Tron Network?</p>
              </div>
              <div className='flex flex-col items-end'>
                <p className='text-lg font-semibold'>{Number(userData.account.balance).toFixed(3)}<span> TRX</span></p>
                {/* <p className='ml-3 text-sm text-gray-500'>(0 $)</p> */}
              </div>
            </div>

            {/* Disabled: Hiep Le */}
            {/* <div className='mt-3 flex justify-between items-start'>
              <div className='flex items-center'>
                <img src={IMG_TETHER} alt="Tether" className='object-cover h-6'/>
                <p className='ml-3 text-lg'>Tether</p>
              </div>
              <div className='flex flex-col items-end'>
                <p className='text-lg font-semibold'>0.000<span> USDT</span></p>
                <p className='ml-3 text-sm text-gray-500'>(0 $)</p>
              </div>
            </div> */}

            <div className='mt-3 flex justify-between items-start'>
              <div className='flex items-center'>
                <img src={IMG_TRON} alt="Etherum" className='object-cover h-6'/>
                <p className='ml-3 text-lg'>Tron?</p>
              </div>
              <div className='flex flex-col items-end'>
                <p className='text-lg font-semibold'>0.000<span> TRX</span></p>
                {/* <p className='ml-3 text-sm text-gray-500'>(0 $)</p> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default memo(WalletSetting)