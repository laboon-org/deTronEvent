import React, { ReactElement, useEffect, useState, memo } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { ApolloError, useLazyQuery, useQuery } from '@apollo/client';

import CategorySlider from '../CategorySlider/CategorySlider';
import EventSlider from '../ActiveEvent/EventSlider/EventSlider';
import { EventType, getAvailableEvents, getAvailableEventsByCate, getExpiringEvents, getNewestEvents } from '../../api/queries';

interface Props {
  type: string;
}

const Content: React.FC<Props> = (props: Props): ReactElement => {
  const [categoryID, setCategoryID] = useState<number>(-1);
  const [events, setEvents] = useState<EventType[]>([]);
  const [errorState, setErrorState] = useState<ApolloError | undefined>();
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (type: string): void => {
    navigate(`/events/${type.toLowerCase().replace(/\s/g, "_")}`)
  }

  const [loadAllEvents, {loading}] = useLazyQuery(getAvailableEvents, {
    onCompleted: (data) => setEvents(data.events),
    onError: (error) => setErrorState(error),
    fetchPolicy: 'no-cache',
  });
  
  const [loadEventsByCate, {loading: loading2}] = useLazyQuery(getAvailableEventsByCate, {
    onCompleted: (data) => setEvents(data.events),
    onError: (error) => setErrorState(error),
    fetchPolicy: 'no-cache',
  });

  const [loadNewestEvents, {loading: loading3}] = useLazyQuery(getNewestEvents, {
    onCompleted: (data) => setEvents(data.events),
    onError: (error) => setErrorState(error),
    fetchPolicy: 'no-cache',
  });

  const [loadExpiringEvents, {loading: loading4}] = useLazyQuery(getExpiringEvents, {
    onCompleted: (data) => setEvents(data.events),
    onError: (error) => setErrorState(error),
    fetchPolicy: 'no-cache',
  });
  
  useEffect(() => {
    if (props.type === "Categories") {
      if (categoryID === -1) {
        loadAllEvents();
      }
      else {
        loadEventsByCate({variables: {id: categoryID}});
      }
    }
    else if (props.type === "Newest Event") {
      loadNewestEvents();
    }
    else if (props.type === "Expiring Soon") {
      loadExpiringEvents();
    }
  }, [props.type, categoryID])


  if (errorState) {
    console.log(errorState);
    return <p>Error: Cannot load data!</p>
  }

  
  
  return (
    <>
      <section id="home-content" className='mt-12'>
        <article className='w-full flex justify-between'>
          <p className='font-semibold text-lg'>{props.type}</p>
          <button 
            className='text-primaryColor opacity-80 hover:opacity-100 focus:opacity-100'
            onClick={() => handleNavigate(props.type)}
          >
            See all
          </button>
        </article>
        {/* Categories slider */}
        {props.type === "Categories" && (
          <article className='mt-4'>
            <CategorySlider categoryID={categoryID} setCategoryID={setCategoryID} />
          </article>
          )}
            <article id="tickets" className='mt-4'>
              <EventSlider events={events} loading={loading || loading2 ||loading3 || loading4}/>
            </article>
      </section>
    </>
  )
}

export default memo(Content)