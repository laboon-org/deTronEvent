import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import SubHeader from '../../components/SubHeader/SubHeader';
import IssuedTicketsSummary from '../../components/User/IssuedTickets/IssuedTicketsSummary';
import UserInfomation from '../../components/User/UserInfo/UserInfo';

import { UserInfo } from '../../context/CurrentUser';
import { useQuery, useLazyQuery } from '@apollo/client';
import { EventType, getEventByIDAndOwner, getIssuedTickets, TicketInterface } from '../../api/queries';
import Loading from '../../components/Loading/Loading';
import ErrorPage from '../../components/Error/Error';
import { AccountContext } from '../../context/AccountData';
import TicketList from '../../components/Tickets/TicketList/TicketList';


const IssuedTickets: React.FC = (): React.ReactElement => {
  const userData = useContext(AccountContext)

  const [specificEvent, setSpecificEvent] = useState<EventType[]>([])
  const [ticketsOfEvent, setTicketsOfEvent] = useState<TicketInterface[]>([])
  const {id, userName} = useParams();
  // const userData = localStorage.getItem('user');
  // const user = userData && JSON.parse(userData)

  if (userData.account.user !== userName) return <ErrorPage />

  const { loading, error, data } = useQuery(getEventByIDAndOwner, {
    variables: {
      eventID: (id && parseInt(id)),
      userName: userName,
    },
    skip: id === undefined,
    onCompleted: (data) => {
      setSpecificEvent(data.events);
    },
    fetchPolicy: "no-cache",
  });

  const [loadTicketsByEvent, {loading: loading2, error: error2}] = useLazyQuery(getIssuedTickets, {
    onCompleted: (data) => {
      setTicketsOfEvent(data.tickets)
    },
    fetchPolicy: "no-cache",
  })

  useEffect(() => {
    if (data) {
      loadTicketsByEvent({
        variables: {
          ownerName: userData.account.user,
          eventID: data.events[0].id,
      }})
    }
  }, [data])

  if (loading || loading2) return <Loading />;

  if (error || error2) {
    console.log(error || error2);
    return <ErrorPage />
  }
  
  return (
    <>
      {specificEvent.length > 0 &&
        <div className='wrap border-x-only relative'>
          <div className='container relative'>
            {/* Header */}
            <SubHeader pageName={`Issued tickets of ${specificEvent[0].name}` } rootURL={`/user/${userName}`}/>
            {/* User Info */}
            <section id="user-info" className='flex flex-col items-center mt-10'>
              <UserInfomation />
            </section>
            {/* Issued event summary */}
            <section className='mt-10'> 
              <IssuedTicketsSummary eventID={specificEvent[0].id}/>
            </section>
            <section className=' mt-10 mb-32'>
              <p className='font-semibold text-lg'>Avaiable: {ticketsOfEvent.length}</p>
              <TicketList tickets={ticketsOfEvent} />
            </section>
            <section 
              id="footer" 
              className='fixed-comp fixed bottom-0 pt-4 pb-3 
              border-t border-solid border-gray-300 rounded-t-3xl'
            >
              <div className='w-11/12'>
                <Footer activePage='user' />
              </div>
            </section>
          </div>
        </div>
      }
    </>
  )
}

export default IssuedTickets