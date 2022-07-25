import React, { ReactElement, memo } from 'react'
import BoughtTickets from '../../../Tickets/BoughtTicketList/BoughtTickets';
import { TicketInterface } from '../../../../api/queries';

interface Props {
  tickets?: TicketInterface[];
}

const Bought: React.FC<Props> = ({tickets}: Props): ReactElement => {
  return (
    <article className='mb-40 mt-10'>
      {tickets && tickets.length > 0
        ? <>
            <BoughtTickets tickets={tickets}/>
          </>
        : <div className='stat-null'>You haven’t bought any ticket yet.</div>
      }
    </article>
  )
}

export default memo(Bought)