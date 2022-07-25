import React, { ReactElement, useContext, memo } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoTicket, IoQrCode } from 'react-icons/io5'
import { TicketInterface } from '../../../api/queries';
import { AccountContext } from '../../../context/AccountData'
import { BsClockFill } from 'react-icons/bs'

import './TicketDetails.css'

interface Props {
  ticket: TicketInterface;
}


const TicketDetails: React.FC<Props> = ({ ticket }: Props): ReactElement => {
  const userData = useContext(AccountContext)

  return (
    <>
      <article className='detail-item'>
        <div className='detail-icon'>
          <i>
            <IoQrCode />
          </i>
        </div>
        <div className='detail-info'>
          <div>
            <h6>Ticket ID</h6>
            <p>{ticket.id}</p>
          </div>
        </div>
      </article>
      <article className='detail-item'>
        <div className='detail-icon'>
          <i>
            <BsClockFill />
          </i>
        </div>
        <div className='detail-info'>
          <div>
            <h6>Ticket Status</h6>
            <p>{ticket.status === 1 ? "Usable" : "Used"}</p>
          </div>
        </div>
      </article>
      <article className='detail-item'>
        <div className='detail-icon'>
          <i>
            <IoTicket />
          </i>
        </div>
        <div className='detail-info'>
          {/* <div>
            <h6>Start Date: {formatDateFull(new Date(ticket.event.startDate)).date}</h6>
            <p>{formatDateFull(new Date(ticket.event.startDate)).time}</p>
          </div>
          <div className='mt-2'>
            <h6>End Date: {formatDateFull(new Date(ticket.event.endDate)).date}</h6>
            <p>{formatDateFull(new Date(ticket.event.endDate)).time}</p>
          </div> */}
          <h6>Ticket Type </h6>
          <p>{ticket.ticketType === 1 ? "One time usage" : "Multi time usage"}</p>
        </div>
      </article>
      
      <article className='detail-item'>
        <div className='detail-icon'>
          <i>
            <FaUser />
          </i>
        </div>
        <div className='detail-info'>
          {/* <div>
            <h6>Ticket Issuer</h6>
            <p>{ticket.event.owner}</p>
          </div> */}
          <div>
            <h6>Ticket Approver(s)</h6>
            {ticket.approvers.map((approver, index) => (
              approver.length > 35
                ?
                <div key={index}>
                  <p>{approver.substring(0, 8) + '...' + approver.substring(approver.length - 8, approver.length)}</p>
                </div>
                :
                <p key={index}>{approver}</p>
            ))
            }
          </div>
        </div>
      </article>

    </>


  )
}

export default memo(TicketDetails)