import React, { memo, useContext } from 'react'

import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { FavouriteTicketListInterface } from '../../../../api/queries'
import { AccountContext } from '../../../../context/AccountData';
interface Props {
  ticketID: number,
  favouriteTicketList: FavouriteTicketListInterface[],
}

const TicketFavourite: React.FC<Props> = ({ticketID, favouriteTicketList}: Props): React.ReactElement => {
  const userData = useContext(AccountContext)

  const checkFavouriteTicketList = (userID: number, ticketID: number): boolean => {
    let checker = false;
    favouriteTicketList.forEach(favouriteTicket => {
      if (favouriteTicket.user === userID && favouriteTicket.ticketID === ticketID) {
        checker = true;
        return true;
      }
    })
    return checker;
    
  }

  return (
    <>
      <button className='mb-1'>
        {checkFavouriteTicketList(parseInt(userData.account.id), ticketID)
        ?
          <i className='text-xl text-primaryColor'><BsHeartFill /></i>
        :
          <i className='text-xl text-primaryColor'><BsHeart /></i>
        }
      </button>
    </>
  )
}

export default memo(TicketFavourite)