import { useLazyQuery, useMutation } from '@apollo/client'
import detectEthereumProvider from '@metamask/detect-provider'
import React, { useEffect } from 'react'
import { createContext, useState } from "react"
import { Navigate, NavigateFunction, useNavigate } from 'react-router-dom';
import { CREATE_USER } from '../api/mutation/createUser'
import { getDataAccount } from '../api/queries'
import Web3 from 'web3'
import Loading from '../components/Loading/Loading';
interface Props {
  children: React.ReactElement,
}
export interface UserInfo {
  id: string,
  user: string,
  img: string,
  balance: number
  fetch: boolean
}
export type CurrentUser = {
  account: UserInfo,
  setAccount: React.Dispatch<React.SetStateAction<UserInfo>>
  checked?: boolean
}
export const AccountContext = createContext<CurrentUser>({
  account: {
    id: '',
    user: '',
    img: '',
    balance: 0,
    fetch: false
  },
  setAccount: () => { return },
  checked: false,
})

const AccountData: React.FC<Props> = ({ children }: Props): React.ReactElement => {
  const [DataAccount, { data, loading }] = useLazyQuery(getDataAccount)
  const navigate: NavigateFunction = useNavigate();

  const [checked, setChecked] = useState(true)
  const [account, setAccount] = useState({
    id: '',
    user: '',
    // TODO: change this data
    img: '',
    balance: 0,
    fetch: false
  })
  const tronLinkListener = async function (e: any, func: any) {
    if (e.data.message && e.data.message.action == "disconnect") {
      localStorage.setItem('isLogin__DEV_TRONLINK__', JSON.parse('false'))
      navigate('/login')
      window.location.reload();
    }
    if (e.data.message && e.data.message.action == "accountsChanged") {
      console.log("accountsChanged event", e.data.message.data.address)
      window.location.reload();
    }
  }
  useEffect(() => {
    const checkTronLink = async () => {
      const { tronWeb, tronLink }: any = window

      if (tronWeb && tronLink) {
        const accountSelected = tronWeb.defaultAddress.base58
        console.log('current account APP ', accountSelected);

        // Case Account exist from wallet
        if (accountSelected) {
          // GET balance from wallet
          const balance = await tronWeb.trx.getBalance(accountSelected);

          //QUERY to check account exist?
          const accountFetch = await DataAccount({
            variables: {
              wallet_address: accountSelected
            }
          })

          //account exist
          if (accountFetch && accountFetch.data.UserNonce[0] && accountFetch.data.UserNonce[0].UserWallet && accountFetch.data.UserNonce[0].UserWallet.wallet_address) {
            setAccount({
              ...account,
              user: accountSelected,
              id: accountFetch.data.UserNonce[0].id,
              balance: Number(balance),
              fetch: true
            })
            console.log('account exist');
          }
          else {
            console.log('account not exist', accountFetch);
            navigate('/login')
          }
          setChecked(false)

        }
        else {
          setChecked(false)
          alert('Ensure proper connection of your DApp to TronLink extension wallet.');
        }
      } else {
        alert('TronLink extension wallet not detected');
        setChecked(false)
      }
    };
    (
      async () => {
        // check TronLink DATA
        let statusData = false
        const myInterval = setInterval(async () => {
          const { tronWeb, tronLink }: any = window
          if (tronWeb && tronLink && tronWeb.defaultAddress.base58) {
            clearInterval(myInterval)
            statusData = true
            await checkTronLink()
          }
        }, 10);
        setTimeout(async function () {
          // Clear the interval
          clearInterval(myInterval)
          if (!statusData) await checkTronLink();
        }, 2000)
      }
    )()

    window.addEventListener('message', (e: any) => tronLinkListener(e, checkTronLink))
    return () => {
      window.removeEventListener('message', (e: any) => tronLinkListener(e, checkTronLink))
    }
  }, []);
  return (
    <AccountContext.Provider value={{ account, setAccount, checked }}>

      {
        checked ?
          <Loading />
          :
          (

            children

          )

      }
    </AccountContext.Provider>
  )
}

export default AccountData