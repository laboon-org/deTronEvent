import React, { ReactElement, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'


import TicketHeader from '../../components/TicketContent/TicketHeader/TicketHeader';
import TicketDetails from '../../components/TicketContent/Details/TicketDetails';
import BoughtFooter from '../../components/TicketContent/TicketFooter/BoughtFooter';
import BoughtTicketOverview from '../../components/TicketContent/Overview/BoughtTicketOverview';

import ErrorPage from '../../components/Error/Error';
import { getBoughtTicketByIDAndOwner, TicketInterface } from '../../api/queries';
import { useQuery } from '@apollo/client';
import Loading from '../../components/Loading/Loading';
import { AccountContext } from '../../context/AccountData';

const BoughtTicket: React.FC = (): ReactElement => {
  const userData = useContext(AccountContext)

  const [ticket, setTicket] = useState<TicketInterface[]>([])
  const {id, userName} = useParams();
  // const userData = localStorage.getItem('user');
  // const user = userData && JSON.parse(userData);

  if (userData.account.user !== userName) return <ErrorPage />
  
  const { loading, error, data } = useQuery(getBoughtTicketByIDAndOwner, {
    variables: {
      ownerName: userName,
      ticketID: (id && parseInt(id))
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

  if (ticket.length > 0) {
    return (
      <div className='wrap border-x-only min-h-screen'>
        <TicketHeader image={ticket[0].image} rootURL={`/user/${userName}`} />
        <div className='w-11/12 mx-auto flex flex-col items-center relative'>
          {/* Ticket Overview */}
            <BoughtTicketOverview ticket={ticket[0]}/>
          {/* Ticket Details */}
          <section className='w-full mt-10 border-t border-solid border-gray-100 mb-52'>
            <TicketDetails ticket={ticket[0]}/>
          </section>
          <BoughtFooter ticket={ticket[0]}/>
        </div>
      </div>
    )
  }
  else {
    return <ErrorPage />
  }
}

export default BoughtTicket
