import React, { memo } from 'react'

import EventListItem from './EventListItem';
import { EventType } from '../../../api/queries';
import LoadingField from '../../LoadingField/LoadingField';

interface Props {
  events: EventType[];
  ownerAddress?: string;
  loading?: boolean;
}

const EventList: React.FC<Props> = (props: Props): React.ReactElement => {
  return (
    <>
    {props.loading
    ?
      <LoadingField />
    :
      <>
        {props.events.length > 0 && 
          <div id="ticket-list-wrap">
            {props.events 
            ? props.events.map(event => (
              <div key={event.id}>
                <EventListItem event={event} ownerAddress={props.ownerAddress}/>
              </div>
            ))
            : <div>Error 404!</div>
          }
          </div>
      }
      </>
    }
    </>
  )
}

export default memo(EventList)