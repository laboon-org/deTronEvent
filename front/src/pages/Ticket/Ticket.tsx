import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

import TicketHeader from '../../components/TicketContent/TicketHeader/TicketHeader';
import TicketOverview from '../../components/TicketContent/Overview/TicketOverview';
import TicketDetails from '../../components/TicketContent/Details/TicketDetails';
import BuyFooter from '../../components/TicketContent/TicketFooter/BuyFooter';
import { getTicketByID, TicketInterface } from '../../api/queries';
import { useQuery } from '@apollo/client';
import Loading from '../../components/Loading/Loading';
import ErrorPage from '../../components/Error/Error';
import { AccountContext } from '../../context/AccountData';

const Ticket: React.FC = (): React.ReactElement => {
  const userData = useContext(AccountContext)
  const {id, eventID} = useParams();
  const [ticket, setTicket] = useState<TicketInterface[]>([]);
  const { loading, error, data } = useQuery(getTicketByID, {
    variables: {
      id: (id && parseInt(id)),
    },
    skip: id === undefined || isNaN(parseInt(id)),
    onCompleted: (data) => {
      setTicket(data.tickets);
    },
    fetchPolicy: "no-cache"
  });
  if (loading) return <Loading />;

  if (error) {
    
    console.log(error);
    return <ErrorPage />
  }

  if (data) {
    if (!eventID || data.tickets[0].event.id !== parseInt(eventID)) return <ErrorPage />;
  }

  return (
    <>
      {ticket.length > 0 && 
        (
          <div className='wrap border-x-only min-h-screen'>
            <TicketHeader image={ticket[0].image} rootURL="-1"/>
            <div className='w-11/12 mx-auto flex flex-col items-center relative'>
              {/* Ticket Overview */}
                <TicketOverview ticket={ticket[0]} />
              {/* Ticket Details */}
              <section className='w-full mt-10 border-t border-solid border-gray-100 mb-32'>
                <TicketDetails ticket={ticket[0]} />
              </section>
              {userData.account.user !== ticket[0].event.owner && 
              ticket[0].event.status === 1 && 
              ticket[0].status === 1 &&
              ticket[0].event.owner === ticket[0].ticketOwner &&
                <BuyFooter ticket={ticket[0]} />
              }
            </div>
          </div>
        )
      }
    </>
  )
}

export default Ticket