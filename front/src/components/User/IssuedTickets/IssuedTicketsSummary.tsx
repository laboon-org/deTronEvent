import React, {memo, useState} from 'react'

import './IssuedTicketsSummary.css'
import { getEventStatistic, EventStatisInterface } from '../../../api/queries';
import { useQuery } from '@apollo/client';
import LoadingField from '../../LoadingField/LoadingField';

interface Props {
  eventID: number
}

const IssuedTicketsSummary: React.FC<Props> = ({eventID}: Props): React.ReactElement => {
  const [eventStatis, setEventStatis] = useState<EventStatisInterface | undefined>();
  const {loading, error, data} = useQuery(getEventStatistic, {
    variables: {
      id: eventID,
    },
    onCompleted: (data) => {
      setEventStatis(data.event[0]);
    }
  })

  if (loading) return <LoadingField />

  if (error) return <p>Error!</p>

  return (
    <>
      {eventStatis &&
        <div className='flex justify-between'>
          <div className='issued-ticket-summary-item'>
            <p>{eventStatis.issued ? eventStatis.issued : 0}</p>
            <h6>Ticket issued</h6>
          </div>
          <div className='issued-ticket-summary-item'>
            <p>{eventStatis.sold ? eventStatis.sold : 0}</p>
            <h6>Ticket sold</h6>
          </div>
          <div className='issued-ticket-summary-item'>
            <p>{eventStatis.total ? eventStatis.total : 0}</p>
            <h6>Total proceeds</h6>
          </div>
        </div>
      }
    </>
  )
}

export default memo(IssuedTicketsSummary)