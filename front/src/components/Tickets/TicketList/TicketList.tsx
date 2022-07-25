import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { TicketInterface, FavouriteTicketListInterface, getFavouritedTicketList } from '../../../api/queries';
import Loading from '../../Loading/Loading';
import TicketListItem from './TicketListItem';
import ErrorPage from '../../Error/Error'

interface Props {
  tickets: TicketInterface[],
}

const TicketList: React.FC<Props> = ({tickets}: Props): React.ReactElement => {
  const [favouriteTicketList, setFavouriteTicketList] = useState<FavouriteTicketListInterface[]>([])

  const {loading, error, data} = useQuery(getFavouritedTicketList, {
    onCompleted: (data) => {
      setFavouriteTicketList(data.collection);
    }
  });

  if (loading) return <Loading />

  if (error) return <ErrorPage />

  return (
    <>
      {tickets
      ?
        tickets.map(ticket => (
          <div key={ticket.id}>
            <TicketListItem ticket={ticket} favouriteTicketList={favouriteTicketList}/>
          </div>
        ))
      :
        <div>Error: Cannot load tickets!</div>
      }
    </>
  )
}

export default TicketList