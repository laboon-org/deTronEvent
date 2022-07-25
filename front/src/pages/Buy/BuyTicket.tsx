import React, { useState } from 'react'
import { NavigateFunction, useLocation, useNavigate, useParams } from 'react-router-dom'


import './BuyTicket.css'

import SubHeader from '../../components/SubHeader/SubHeader'
import TicketList from '../../components/ActiveEvent/EventList/EventList';
import BuyTicketContent from '../../components/BuyContent/BuyTicketContent';

import { EventType } from '../../api/queries';
import ErrorPage from '../../components/Error/Error';

interface LocationState {
  event: EventType
}

const BuyTicket: React.FC = ():React.ReactElement => {
  console.log("buy ticket")
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const location = useLocation();
  const locationState = location.state as LocationState;

  const isBought = true;
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (): void => {
    if (isBought)
      navigate('confirm', {state: {event: locationState.event, totalPrice: totalPrice}});
    else
      navigate('add_funds', {state: {event: locationState.event, totalPrice: totalPrice}});
  }
  const {id} = useParams();

  if (locationState) {
    return (
      <div className='wrap border-x-only relative'>
        <div className='container'>
          {/* Header */}
          <section>
            <SubHeader pageName='Buy Ticket' rootURL={`/ticket/${id}`}/>
          </section>
          {/* Ticket Overview */}
          <section className='mt-8 relative'>
            <div>
              <h6 className='buy-ticket-title'>Ticket</h6>
              {/* <TicketList events={[locationState.event]} hideFavorite={true} /> */} 
              {/*TODO: New ticket list */}
            </div>
            <div className='absolute inset-0 z-50'></div>
          </section>
          {/* Ticket Amount */}
          <section 
            className='fixed-comp sub-footer'
          >
            <div className='footer-full-w-btn w-11/12'>
              <BuyTicketContent event={locationState.event} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>
              <button 
                type='button'
                className='primary-btn mt-6'
                onClick={handleNavigate}
              >
                Continue
              </button>
            </div>
          </section>
        </div>
      </div>
    )
  }
  else return (<ErrorPage />)
}

export default BuyTicket