import { useQuery } from '@apollo/client';
import React, { memo, useContext } from 'react'
import { FavouriteTicketListInterface } from '../../../../api/queries';
import { AccountContext } from '../../../../context/AccountData';
import TicketListItem from '../../../Tickets/TicketList/TicketListItem';

interface Props {
  favouriteTickets?: FavouriteTicketListInterface[];
}

const Favorited: React.FC<Props> = ({favouriteTickets}: Props): React.ReactElement => {

  return (
    <article className='mb-40 mt-10'>
      {favouriteTickets
        ? 
          <>
            {favouriteTickets.map(favourite => (
              <div key={favourite.id}>
                <TicketListItem ticket={favourite.ticket} eventID={favourite.ticket.event.id} favouriteTicketList={favouriteTickets}/>
              </div>
            ))}
          </>
        : <div className='stat-null'>You haven’t liked any ticket yet.</div>
      }
    </article>
  )
}

export default memo(Favorited)