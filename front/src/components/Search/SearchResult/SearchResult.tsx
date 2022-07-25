import React, { useState, useEffect, memo } from 'react'

import CategorySlider from '../../CategorySlider/CategorySlider';
import EventList from '../../ActiveEvent/EventList/EventList';
import SearchNotFound from './SearchNotFound';
import { getEventsBySearch, EventType, getEventsBySearchAndCate } from '../../../api/queries';
import { ApolloError, useLazyQuery } from '@apollo/client';
import LoadingField from '../../LoadingField/LoadingField';

interface Props {
  searchContent: string,
  categoryID: number,
}

const SearchResult: React.FC<Props> = ({searchContent, categoryID}: Props): React.ReactElement => {
  
  const [searchResult, setSearchResult] = useState<EventType[]>([]);
  const [errorState, setErrorState] = useState<ApolloError | undefined>();
  
  const [loadSearchEvents, {loading}] = useLazyQuery(getEventsBySearch, {
    onCompleted: (data) => setSearchResult(data.events),
    onError: (error) => setErrorState(error),
    fetchPolicy: 'no-cache',
  });
  
  const [loadSearchEventsByCate, {loading: loading2}] = useLazyQuery(getEventsBySearchAndCate, {
    onCompleted: (data) => setSearchResult(data.events),
    onError: (error) => setErrorState(error),
    fetchPolicy: 'no-cache',
  });

  
  useEffect(() => {
    if (categoryID === -1) {
      loadSearchEvents({variables: {search: `%${searchContent}%`}});
    }
    else {
      loadSearchEventsByCate({variables: {search: `%${searchContent}%`, categoryID: categoryID}});
    }
  }, [categoryID, searchContent])

  if (loading || loading2) return <div className='mt-12'><LoadingField /></div>;

  if (errorState) {
    console.log(errorState);
    return <p>Something has gone wrong!</p>
  }

  return (
    <>
      {searchResult.length > 0
      ?
      <>
        <article className='flex justify-between items-center'>
        <p className='font-light text-gray-800'>Search Results</p>
        <p className='font-semibold text-primaryColor'>{searchResult.length} found</p>
      </article>
      <article className='w-full mt-4 mb-36'>
        <div className='mt-4'>
          <EventList events={searchResult} />
        </div>
        </article>
      </>
      : <SearchNotFound />
      }
    </>

  ) 
}

export default memo(SearchResult)