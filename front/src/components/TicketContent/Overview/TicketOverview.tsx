import React, {memo, useContext, useState} from 'react'

import TicketCategories from './OverviewItem/TicketCategories'
import TicketPrice from './OverviewItem/TicketPrice'
import TicketTitle from './OverviewItem/TicketTitle'

import './TicketOverview.css'
import { TicketInterface } from '../../../api/queries'
import TicketFavouriteDetails from '../Details/TicketFavouriteDetails'
import { AccountContext } from '../../../context/AccountData'

interface Props {
  ticket: TicketInterface;
  hideFavourite?: boolean;
}

const TicketOverview: React.FC<Props> = ({ticket, hideFavourite}: Props): React.ReactElement => {
  const userData = useContext(AccountContext);
  return (
    <section className='w-full mt-6'>
      <article className='text-sm font-semibold'>
        <TicketCategories categories={ticket.event.eventCategories} isFull={true} />  
      </article>
      <article className='mt-4 text-3xl font-semibold'>
        <TicketTitle name={ticket.event.name} />
      </article>
      {ticket.ticketOwner !== ticket.event.owner &&
        <article className='flex w-full justify-between mt-6'>
          <div className='overview-ticket-usage flex flex-col '>
            <div>
              <small className='text-gray-600 text-base'>
                #Owned by  
                <span className='text-primaryColor font-semibold'>
                  {ticket.ticketOwner === userData.account.user 
                  ? 
                    " you" 
                  : 
                    ' ' + ticket.ticketOwner.substring(0, 8) + '...' + ticket.ticketOwner.substring(ticket.ticketOwner.length - 8, ticket.ticketOwner.length)}
                </span>
              </small>
            </div>
          </div>
        </article>
      }
      <article className='flex w-full justify-between items-center mt-6'>
        {ticket.event.owner !== userData.account.user &&
          <div >
            <TicketFavouriteDetails hideFavourite={hideFavourite} ticketID={ticket.id}/>
          </div>
        }
        <div className='flex-1 text-right'>
          <div className='text-3xl font-bold'>
            <TicketPrice price={ticket.price} />
          </div>
          {/* <div className='text-sm text-gray-600 mt-2'>
            <p>(19,564213$)</p>
          </div> */}
        </div>
      </article>
    </section>
  )
}

export default memo(TicketOverview)