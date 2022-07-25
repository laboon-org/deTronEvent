import React, { ReactElement, memo, useContext } from 'react'

import { EventType } from '../../../../api/queries';
import EventList from '../../../ActiveEvent/EventList/EventList';
import { AccountContext } from '../../../../context/AccountData';

interface Props {
  events?: EventType[];
}

const Issued: React.FC<Props> = (props: Props): ReactElement => {
  const userData = useContext(AccountContext)

  return (
    <article className='mb-40 mt-10'>
      {props.events
        ?
        <EventList events={props.events} ownerAddress={userData.account.user} />
        :
        <div className='stat-null'>You haven’t issued any event yet.</div>
      }
    </article>
  )
}

export default memo(Issued)