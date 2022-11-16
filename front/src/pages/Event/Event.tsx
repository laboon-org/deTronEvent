import React, { useContext, useEffect, useState } from 'react'

import './Event.css'
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import ModalUser from '../../components/Header/ModalUser';
import EventList from "../../components/Event/EventList"
import ModalWallet from '../../components/Header/ModalWallet';

import { EventType, getAvailableEventsByUser, getEventsByUser } from '../../api/queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import { AccountContext } from '../../context/AccountData';
import LoadingField from '../../components/LoadingField/LoadingField';
import EventNotFound from '../../components/Event/EventNotFound';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Checkbox, FormControlLabel } from '@mui/material';

const EventPage = () => {

  const userData = useContext(AccountContext)
  const [isCheck, setCheck] = useState<boolean>(false);
  const [events, setEvents] = useState<EventType[]>([])
  const [isWalletModal, setWalletModal] = useState<boolean>(false);
  const [isUserModal, setUserModal] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate()

  const handleCreateEvent = () => {
    navigate('/event/create_event')
  }

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheck(true);
    }
    else {
      setCheck(false);
    }
  }
  const [loadAvalableEvents, { loading, error, data }] = useLazyQuery(getAvailableEventsByUser, {
    variables:{
      userName: userData.account.user
    },
    onCompleted: (data) => {
      setEvents(data.events);
    },
    fetchPolicy: "no-cache" 
  });
  const [loadAllEvents, { loading: loading2, error: error2, data: data2 }] = useLazyQuery(getEventsByUser, {
    variables:{
      userName: userData.account.user
    },
    onCompleted: (data) => {
      setEvents(data.events);
    },
    fetchPolicy: "no-cache" 
  });

  useEffect(() => {
    if (isCheck) {
      loadAvalableEvents();
    }
    else {
      loadAllEvents()
    }
  }, [isCheck])

  return (
    <div className='event-content wrap border-x-only relative'>
      {isWalletModal && (
        <ModalWallet setWalletModal={setWalletModal} /> 
      )}
      {isUserModal && (
        <ModalUser setUserModal={setUserModal} />
      )}
      <section id="header" className='fixed-comp fixed top-0 py-6'>
        <div className='w-11/12'>
          <Header setWalletModal={setWalletModal} setUserModal={setUserModal} />
        </div>
      </section>

      <div className='container'>
        <section className='mt-28'>
          <h3 className='text-2xl font-bold'>Event</h3>
        </section>
        <section className='mt-3'>
          {(loading || loading2) 
          ? <LoadingField />
          :
            (error || error2) 
            ? 
              <p>Error: Cannot load events!</p>
            : 
              events.length > 0
              ?
                <article>
                  <label className='text-lg flex items-center mt-3 cursor-pointer'>
                    <Checkbox checked={isCheck} size="small" onChange={(e) => handleCheck(e)}/>
                    Hide expired events
                  </label>
                  <div className='mt-3'><EventList events={events} /></div>
                </article>
              :
                <EventNotFound redirect={handleCreateEvent}/>     
          }
          
        </section>
        <section className='mt-6 flex flex-col flex-1'>
        </section>
      </div>

      <section
        className='fixed-comp fixed bottom-0 pt-4 pb-3 border-t 
        border-solid border-gray-300 rounded-t-3xl'
      >
        <div className='w-11/12'>
          <Footer activePage='event' />
        </div>
      </section>
    </div>
  )
}

export default EventPage