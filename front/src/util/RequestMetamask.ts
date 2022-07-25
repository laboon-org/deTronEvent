import detectEthereumProvider from "@metamask/detect-provider";
import { client } from "../api/client";
import { CREATE_USER } from "../api/mutation/createUser";
import { getDataAccount } from "../api/queries";
import Web3 from 'web3'

export default async ({ account, setAccount, navigate }: any) => {
  const { tronWeb, tronLink }: any = window

  if (tronWeb && tronLink) {
    try {
      const statusDapp = await tronLink.request({ method: 'tron_requestAccounts' })
      const accountSelected = tronWeb.defaultAddress.base58
      console.log(accountSelected);


      // Exist account from wallet metamask
      if (accountSelected) {
        localStorage.setItem('isLogin__DEV_TRONLINK__', JSON.parse('true'))
        const balance = await tronWeb.trx.getBalance(accountSelected);

        //QUERY to check account exist?
        const accountFetch: any = await client
          .query({
            query: getDataAccount,
            variables: {
              wallet_address: accountSelected
            },
            fetchPolicy: 'no-cache',
          })
          .catch((err) => console.error(err))

        // Account exist
        if (accountFetch && accountFetch.data.UserNonce[0] && accountFetch.data.UserNonce[0].UserWallet && accountFetch.data.UserNonce[0].UserWallet.wallet_address) {
          console.log('Account exist', accountFetch.data);
          setAccount({
            ...account,
            user: accountSelected,
            id: accountFetch.data.UserNonce[0].id,
            balance: Number(balance),
            fetch: true
          })
          navigate('/home')
        }

        // Create new Account
        else {
          console.log('Create new Account');
          const accountFetchNewAccount: any = await client
            .mutate({
              mutation: CREATE_USER,
              variables: {
                wallet_address: accountSelected
              },
            })
            .catch((err) => console.error(err));

          if (accountFetchNewAccount) {
            console.log('account is ready', accountFetchNewAccount);
            setAccount({
              ...account,
              user: accountSelected,
              id: accountFetchNewAccount.data.createWallet.user_id,
              balance: Number(balance),
              fetch: true
            })
            navigate('/home')
          }
        }
      } else {
        alert('Ensure proper connection of your DApp to TronLink extension wallet.');
      }

    } catch (e) {
      console.error(e);
    }
  } else {
    alert("Please install TronLink");
  }
}