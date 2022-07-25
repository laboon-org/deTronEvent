import React, { useContext, useEffect, useState } from 'react'
import SubHeader from '../../components/SubHeader/SubHeader'
import { useParams, useLocation } from 'react-router-dom';

import ErrorPage from '../../components/Error/Error';
import { AccountContext } from '../../context/AccountData';
import { CREATE_QRCODE } from '../../api/mutation/createQrCode';
import { useMutation, useLazyQuery } from '@apollo/client';
import { TicketInterface, getTicketByID } from '../../api/queries';
import Loading from '../../components/Loading/Loading';

interface LocationState {
  ticket: TicketInterface,
}

const ShowQRCode: React.FC = (): React.ReactElement => {
  const {id, userName} = useParams();
  const userData = useContext(AccountContext)
  const location = useLocation();
  const locationState = location.state as LocationState;
  const [createQrCode, { data, loading, error }] = useMutation(CREATE_QRCODE);

  useEffect(() => {
    createQrCode({
      variables: {
        ticket_id: locationState.ticket.id,
      }
    })
  }, [])

  if (loading) return <Loading />;

  if (userData.account.user !== userName || error) return <ErrorPage />;
  
  return (
    <>
    {locationState
    ?
      <>
        { data &&
          <div className='wrap border-x-only'>
            <section className='container'>
              <SubHeader pageName="QR Code" rootURL={`/user/${userName}/bought_ticket/${id}`} />
              <div className='mt-24 w-full'>
                <div className='text-center w-3/4 mx-auto'>
                  <p className='font-semibold'>Please use this QR Code to join event.</p>
                </div>
                <div className='w-4/5 mx-auto mt-6'>
                  <img src={data.createQrCode.data.qrcode} alt="QR Code" className="object-cover w-full"/>
                </div>
              </div>
            </section>
          </div>
        }
      </>
    :
      <ErrorPage />
    }
    </>
  )
}

export default ShowQRCode