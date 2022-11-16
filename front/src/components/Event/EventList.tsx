import React, { ReactElement, memo } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IoLocationSharp } from 'react-icons/io5'
import { AiFillPlusCircle } from 'react-icons/ai'

import EventNotFound from './EventNotFound';
import IMG_ADD_EVENT from '../../assets/images/add-event-img.png'
import TicketTitle from '../TicketContent/Overview/OverviewItem/TicketTitle';
import TicketCategories from '../TicketContent/Overview/OverviewItem/TicketCategories';
import { EventType } from '../../api/queries';
import TicketDate from '../TicketContent/Overview/OverviewItem/TicketDate';
import TicketSum from '../TicketContent/Overview/OverviewItem/TicketSum';
import EventListItem from '../ActiveEvent/EventList/EventListItem';

interface Props {
  events?: EventType[];
}

const Issued: React.FC<Props> = (props: Props): ReactElement => {
  const navigate: NavigateFunction = useNavigate()

  const handleNavigate = (url: string) => {
    navigate(url);
  }

  const handleCreateEvent = () => {
    navigate('/event/create_event')
  }
  return (
    <article className='mb-40'>

      {(props.events && props.events.length > 0) &&
        <>
          <div className='w-full flex justify-end z-40'>
            <button type='button' onClick={handleCreateEvent} className="event-add-btn">
              <p className='ml-4 mr-2 text-primaryColor font-semibold text-lg'>Add event</p>
              <i className='text-primaryColor'><AiFillPlusCircle /></i>
            </button>
          </div>
          {
            props.events.map(event => (
              <div key={event.id}>
                <EventListItem event={event} fromEventPage />
            </div>
            ))
          }
        </>
      }
    </article>
  )
}

export default memo(Issued)