import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { EventType, getEventByID } from '../../api/queries';
import ErrorPage from '../../components/Error/Error';
import Loading from '../../components/Loading/Loading';
import ActiveEventDetail from '../../components/ActiveEvent/ActiveEventDetail';

const ActiveEvent: React.FC = (): React.ReactElement => {
  const [event, setEvent] = useState<EventType[]>([])
  const { eventID } = useParams();
  const { loading, error, data } = useQuery(getEventByID, {
    variables: {
      id: eventID && parseInt(eventID),
    },
    skip: eventID === undefined || isNaN(parseInt(eventID)),
    onCompleted: (data) => {
      setEvent(data.event);
    },
    fetchPolicy: "no-cache"
  });
  if (loading) return <Loading />;

  if (error) {
    console.log(error);
    return <ErrorPage />
  }

  return (
    <>
      {event.length > 0
      ? 
        <div>
          <ActiveEventDetail event={event[0]}/>
        </div>
      : 
        <ErrorPage />
      }
    </>
  )
}
  

export default ActiveEvent