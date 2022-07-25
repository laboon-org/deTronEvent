import React, { useContext } from 'react'
import { NavigateFunction, useParams, useNavigate, useLocation } from 'react-router-dom';
import { TicketInterface } from '../../api/queries';
import ConfirmContent from '../../components/BuyContent/ConfirmContent';
import ErrorPage from '../../components/Error/Error';
import SubHeader from '../../components/SubHeader/SubHeader';
import { useMutation } from '@apollo/client';
import LoadingModal from '../../components/BuyContent/LoadingModal';
import CompleteModal from '../../components/BuyContent/CompleteModal';
import { AccountContext } from '../../context/AccountData';
import { CREATE_BUY_TICKET } from '../../api/mutation/createBuyTicket';
import wallets from '../../data/wallets';

import moment from 'moment';

interface LocationState {
  ticket: TicketInterface
}


const Confirm = () => {
  const userData = useContext(AccountContext)

  // const userData = localStorage.getItem('user');
  // const user = userData && JSON.parse(userData);
  const {eventID, id} = useParams();
  const location = useLocation();
  const locationState = location.state as LocationState;
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (url: string) => {
    navigate(url);
  }

  const [createBuyTicket, { loading, error, data }] = useMutation(CREATE_BUY_TICKET);

  const handleBuyTicket = (): void => {
    createBuyTicket({
      variables: {
        transactionID: locationState.ticket.transactions[0].id,
        userID: userData.account.id,
        ticketID: locationState.ticket.id,
        ownerAddress: userData.account.user,
        create_at: moment().format('YYYY/MM/DD')
      }
    })
  }

  if (loading) return <LoadingModal />

  if (error) {
    console.log(error)
    return <p>Error: Something happened!</p>
  }

  if (data) return <CompleteModal />

  if (locationState) {
    return (
      <div className='wrap border-x-only'>
        <div className='container'>
          {/* Header */}
          <section className='relative'>
            <SubHeader pageName='Confirm' rootURL="-1" />
            <div className='absolute h-7 w-7 right-0 top-1/2 mt-2'>
              <img src={wallets[0].img} alt="Wallet" className='object-cover object-center'/>
            </div>
          </section>
          <section className='mb-56'>
            <ConfirmContent totalPrice={locationState.ticket.price} walletName={wallets[0].name} walletImg={wallets[0].img}/>
          </section>
          {/* Footer */}
          <section className='fixed-comp sub-footer'>
            <div className='footer-full-w-btn w-11/12'>
              <button className='primary-btn' onClick={handleBuyTicket}>
                Confirm
              </button>
              <button className=' mt-4 secondary-btn' onClick={() => handleNavigate(`/active_event/${eventID}`)}>
                Cancel
              </button>
            </div>
          </section>
        </div>
      </div>
    )
  }
  else return <ErrorPage />
}

export default Confirm