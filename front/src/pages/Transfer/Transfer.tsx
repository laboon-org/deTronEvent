import { useMutation } from '@apollo/client';
import moment from 'moment';
import React, { useState } from 'react'
import { useParams, useNavigate, NavigateFunction, useLocation } from 'react-router-dom';
import { CREATE_EXCHANGE } from '../../api/mutation/createExchange';
import { TicketInterface } from '../../api/queries';

import SubHeader from '../../components/SubHeader/SubHeader'
import TransferTicket from '../../components/TransferTicket/TransferTicket';
import Process from './Process';

interface LocationState {
  ticket: TicketInterface
}

const Transfer = () => {
  const { id, userName } = useParams();
  const location = useLocation();
  const locationState = location.state as LocationState
  const [address, setAddress] = useState<string>('');
  const [exchangeStatus, setExchangeStatus] = useState<boolean>(false);

  const [createExchange, { data, loading, error }] = useMutation(CREATE_EXCHANGE);
  const handleTransfer = (): void => {
    setExchangeStatus(true)
    createExchange({
      variables: {
        owner_address: address,
        ticket_id: locationState.ticket.id,
        create_at: moment().format('YYYY/MM/DD')
      }
    })
  }
  return (
    <>
      {locationState
        ?
        <>
          {
            !exchangeStatus || error ?
              <div className='wrap border-x-only'>
                <section className='container'>
                  <SubHeader pageName="Upgrade Ticket" rootURL="-1" />
                  <div className='mt-10'>
                    <TransferTicket address={address} setAddress={setAddress} />
                  </div>
                </section>
                <section className='fixed-comp sub-footer'>
                  <div className='footer-full-w-btn w-11/12'>
                    <button
                      className={`primary-btn ${address || 'disable-button'}`}
                      onClick={handleTransfer}
                    >
                      Transfer
                    </button>
                  </div>
                </section>
              </div>
              :
              <Process loading={loading} data={data} />
          }
        </>
        :
        <div>Error 404!</div>
      }
    </>
  )
}

export default Transfer