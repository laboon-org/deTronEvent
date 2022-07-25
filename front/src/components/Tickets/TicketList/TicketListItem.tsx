import React, { useContext } from 'react'
import { useNavigate, NavigateFunction, useParams } from 'react-router-dom';

import TicketDate from '../../TicketContent/Overview/OverviewItem/TicketDate';
import TicketSum from '../../TicketContent/Overview/OverviewItem/TicketSum';
import TicketTitle from '../../TicketContent/Overview/OverviewItem/TicketTitle';
import TicketCategories from '../../TicketContent/Overview/OverviewItem/TicketCategories';
import TicketPrice from '../../TicketContent/Overview/OverviewItem/TicketPrice';
import { FavouriteTicketListInterface, TicketInterface } from '../../../api/queries';
import TicketFavourite from '../../TicketContent/Overview/OverviewItem/TicketFavourite';
import { AccountContext } from '../../../context/AccountData';



interface Props {
  ticket: TicketInterface,
  favouriteTicketList: FavouriteTicketListInterface[],
  eventID?: number,
}

const TicketListItem: React.FC<Props> = ({ticket, eventID, favouriteTicketList}: Props): React.ReactElement => {
  const userData = useContext(AccountContext);
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (id: number): void => {
    // If access from Favorited tab in User page
    if (eventID) {
      navigate(`/event/${eventID}/ticket/${id}`)
    }
    else navigate(`ticket/${id}`);
  }
  return (
    <div 
      className='ticket-border flex w-full h-48 mt-4 cursor-pointer'
      onClick={() => handleNavigate(ticket.id)}
    >
      {/* Ticket Image */}
      <div 
        className='w-2/5 relative'
      >
        <img 
          src={ticket.image} 
          alt={ticket.event.name} 
          className="object-cover object-center h-full w-full select-none" 
        />
        <div className='absolute top-0 right-0 flex flex-col mt-1'>
          <TicketDate start={new Date(ticket.event.startDate)} end={new Date(ticket.event.endDate)} />
        </div>
      </div>
      <div className='w-3/5'>
        {/* Ticket Info */}
        <div className='w-10/12 h-full mx-auto flex flex-col'>
          {/* Ticket Name */}
          <div 
            className='overview-title mt-3 w-full text-xl font-semibold select-none' 
          >
            <TicketTitle name={ticket.event.name}/>
          </div>
          {/* Ticket Category & Price */}
          <div className='flex justify-between items-center mt-2'>
            {/* Category */}
            <div className='text-xs font-semibold'>
              <TicketCategories categories={ticket.event.eventCategories} />
            </div>
            {/* Price */}
            <div className='text-lg font-bold'>
              <TicketPrice price={ticket.price}/>
            </div>
          </div>
          
          {/* Tickets Summary + Favourite */}
          <div className='flex justify-between items-end flex-1 mt-1 mb-4'>
            {/* Tickets Summary */}
            <div className='flex items-end overflow-hidden'>
              <TicketSum 
              ticketID={ticket.id} 
              ticketTypeList={ticket.ticketType} 
              ticketOwner={ticket.ticketOwner === ticket.event.owner ? "Doesn't have owner" : (ticket.ticketOwner === userData.account.user ? "you" : ticket.ticketOwner)} />
            </div>
            {/* Favourite */}
            <div className='flex items-end justify-end'>
              {ticket.event.owner !== userData.account.user && <TicketFavourite ticketID={ticket.id} favouriteTicketList={favouriteTicketList}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketListItem