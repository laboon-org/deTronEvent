import React, { memo, useContext, useState, useEffect } from 'react'
import { FavouritedDataInterface, getFavouritedDataByTicketAndUser, TicketInterface } from '../../../api/queries';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { AccountContext } from '../../../context/AccountData'
import LoadingField from '../../LoadingField/LoadingField'
import { ADD_FAVOURITE, REMOVE_FAVOURITE } from '../../../api/mutation/handleFavourite';
interface Props {
  hideFavourite?: boolean,
  ticketID: number,
}

const TicketFavouriteDetail: React.FC<Props> = ({hideFavourite, ticketID}: Props): React.ReactElement => {
  const userData = useContext(AccountContext);
  const [favourited, setFavourited] = useState<FavouritedDataInterface[]>([]);
  const [isFetched, setFetched] = useState<boolean>(false);
  const [loadFavourite, {loading, error, data}] = useLazyQuery(getFavouritedDataByTicketAndUser, {
    variables: {
      userID: userData.account.id,
      ticketID: ticketID,
    },
    onCompleted: (data) => {
      setFavourited(data.collection)
    },
    fetchPolicy: "no-cache",
  })
  
  useEffect(() => {
    loadFavourite();
  },[])

  const [addFavourite, {loading: loading2, error: error2}] = useMutation(ADD_FAVOURITE);

  const [removeFavourite, {loading: loading3, error: error3}] = useMutation(REMOVE_FAVOURITE);

  const handleAddFavourite = (): void => {
    addFavourite({
      variables: {
        userID: userData.account.id,
        ticketID: ticketID,
      },
      onCompleted: () => {
        loadFavourite();
      },
    })
  }

  const handleRemoveFavourite = (): void => {
    removeFavourite({
      variables: {
        userID: userData.account.id,
        ticketID: ticketID,
      },
      onCompleted: () => {
        loadFavourite();
      },
    })
  }

  if (loading || loading2 || loading3) return <LoadingField />

  if (error || error2) {
    console.log(error || error2 || error3);
    return <>ERROR!</>
  }
  return (
    <>
      {hideFavourite 
        ?
          <></>
        :
          favourited.length > 0 
          ?
            <button 
              className='w-44 text-xl font-semibold text-white bg-primaryColor py-2 px-4 border border-solid rounded-3xl border-primaryColor'
              onClick={handleRemoveFavourite}
            >
              Favourited
            </button>
          :
            <button 
              className='w-44 text-xl font-semibold text-primaryColor py-2 px-4 border border-solid rounded-3xl border-primaryColor'
              onClick={handleAddFavourite}
            >
              Add to Favourite
            </button>
        }
    </>
  )
}

export default memo(TicketFavouriteDetail)