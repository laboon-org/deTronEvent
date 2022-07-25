import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';

import CategorySlider from '../../components/CategorySlider/CategorySlider';
import EventList from '../../components/ActiveEvent/EventList/EventList';
import SubHeader from '../../components/SubHeader/SubHeader';
import Error from '../../components/Error/Error';
import { ApolloError, useLazyQuery } from '@apollo/client';
import { EventType, getAvailableEvents, getAvailableEventsByCate, getNewestEvents } from '../../api/queries';
import { toTitleCase } from '../../util/FormatStringToTitle';



const HomeEventList: React.FC = (): React.ReactElement => {
  const [categoryID, setCategoryID] = useState<number>(-1);
  const [events, setEvents] = useState<EventType[]>([]);
  const [errorState, setErrorState] = useState<ApolloError | undefined>();
  
  const {type} = useParams();

  const title: string = type ? toTitleCase(type) : '';

  const [loadAllEvents, {loading}] = useLazyQuery(getAvailableEvents, {
    onCompleted: (data) => setEvents(data.events),
    onError: (error) => setErrorState(error),
    fetchPolicy: 'no-cache',
  });
  
  const [loadEventsByCate, {loading: loading2}] = useLazyQuery(getAvailableEventsByCate, {
    variables: {id: categoryID},
    onCompleted: (data) => setEvents(data.events),
    onError: (error) => setErrorState(error),
    fetchPolicy: 'no-cache',
  });

  const [loadNewestEvents, {loading: loading3}] = useLazyQuery(getNewestEvents, {
    onCompleted: (data) => setEvents(data.events),
    onError: (error) => setErrorState(error),
    fetchPolicy: 'no-cache',
  });

  const [loadExpiringEvents, {loading: loading4}] = useLazyQuery(getNewestEvents, {
    onCompleted: (data) => setEvents(data.events),
    onError: (error) => setErrorState(error),
    fetchPolicy: 'no-cache',
  });
  
  useEffect(() => {
    if (type === "categories") {
      if (categoryID === -1) {
        loadAllEvents();
      }
      else {
        loadEventsByCate({variables: {id: categoryID}});
      }
    }
    else if (type === "newest_event") {
      loadNewestEvents();
    }
    else if (type === "expiring_soon") {
      loadExpiringEvents();
    }
  }, [type, categoryID])


  if (errorState) {
    console.log(errorState);
    return <p>Error: Cannot load data!</p>
  }

  if (type && (type === "categories" || type === "newest_event" || type === "expiring_soon")) {
    return (
      <div className='wrap border-x-only'>
        <section className='container'>
          <SubHeader pageName={title} rootURL="/home" />
          {type === "categories" && (
            <article className='w-full mt-4'>
              <CategorySlider categoryID={categoryID} setCategoryID={setCategoryID} />
            </article>
          )}
          <article className='w-full my-4'>
              <EventList events={events} loading={loading || loading2 || loading3 || loading4}/>
          </article>
        </section>
      </div>
    )
  }
  else {
    return (
      <div><Error /></div>
    )
  }
}

export default HomeEventList