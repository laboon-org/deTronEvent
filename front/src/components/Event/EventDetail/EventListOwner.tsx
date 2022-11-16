import { useQuery } from '@apollo/client'
import React, { ReactElement, useContext, useState, memo } from 'react'
import { FaUser } from 'react-icons/fa'

import { TbTicket } from 'react-icons/tb'
import { getTicketsByEvent, TicketInterface } from '../../../api/queries'
import { AccountContext } from '../../../context/AccountData'
interface Props{
  id: number
}
const EventListOwner:  React.FC<Props> = ({id}:Props): ReactElement => {
  const userData = useContext(AccountContext)

  const [tickets, setTickets] = useState<TicketInterface[]>([]);
  useQuery(getTicketsByEvent, {
    variables: {
      ownerName: userData.account.user,
      eventID: id,
    },
    onCompleted: (result) => {
      setTickets(result.tickets);
    }
  });
  return (
    <>
      {
        tickets.map((ele: TicketInterface) =>

          <div key={ele.id} className='event-detail-ticket w-full mb-4'>
            <div className='total-event p-3'>
              <div className='flex justify-between'>
                <div className='flex primaryColor-icon font-semibold'>
                  <i className='mr-2  self-center'>
                    <TbTicket />
                  </i>
                  Ticket ID
                </div>
                <div>
                  {ele.id}
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='flex primaryColor-icon font-semibold'>
                  <i className='mr-2  self-center'>
                    <FaUser />
                  </i>
                  Owner
                </div>
                <div>
                  {ele.ticketOwner}
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default memo(EventListOwner)