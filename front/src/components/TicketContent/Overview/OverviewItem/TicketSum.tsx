import React, { ReactElement, memo } from 'react'
import { AiOutlineQrcode } from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import { MdOutlinePermContactCalendar } from 'react-icons/md'
import { TbTicket } from 'react-icons/tb'

import './OverviewItem.css'


interface Props {
  location?: string,
  ticketTypeList?: number,
  ticketID?: number,
  ticketOwner?: string,
}

const TicketSum: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <div className='select-none flex flex-col justify-end'>
      {props.location && (
        <div className='ticket-sum'>
          <i><IoLocationSharp /></i>
          <p className='ticket-sum-location'>{props.location}</p>
        </div>
      )}
      {props.ticketOwner && (
        <div className='ticket-sum'>
          <i><MdOutlinePermContactCalendar /></i>
          <p className='ticket-sum-owner'>
            {/* Owned by
              <span className='ml-1'>
                {props.ticketOwner === "you" 
                  ? props.ticketOwner 
                  : props.ticketOwner.substring(0, 4) + '...' + props.ticketOwner.substring(props.ticketOwner.length - 4, props.ticketOwner.length)
                }
              </span> */}
            {props.ticketOwner === "Doesn't have owner"
            ? props.ticketOwner
            :
              <>
                Owned by
                <span className='ml-1'>
                  {props.ticketOwner === "you" 
                    ? props.ticketOwner 
                    : props.ticketOwner.substring(0, 8) + '...' + props.ticketOwner.substring(props.ticketOwner.length - 8, props.ticketOwner.length)
                  }
                </span>
              </>
            }
          </p>
        </div>
      )}
      {props.ticketID && (
        <div className='ticket-sum'>
          <i><AiOutlineQrcode /></i>
          <p>ID: {props.ticketID}</p>
        </div>
      )}
      {props.ticketTypeList && (
        <div className='ticket-sum'>
          <i><TbTicket /></i>
          <p>{props.ticketTypeList === 1 ? "One time usage" : "Multi time usage"}</p>
        </div>
      )}
    </div>
  )
}

export default memo(TicketSum)