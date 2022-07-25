import React, { useContext, useState } from 'react'
import type { } from '@mui/x-date-pickers/themeAugmentation';
import EVENT_ICON from '../../../assets/images/event-icon.png'
import CATEGORY_ICON from '../../../assets/images/category-icon.png'
import LOCATION_ICON from '../../../assets/images/location-icon.png'
import { ImCheckmark } from 'react-icons/im'
import { Event, EventType, getAvailableEventsByUser } from '../../../api/queries';
import { useQuery } from '@apollo/client';

import LoadingField from '../../../components/LoadingField/LoadingField'
import { AccountContext } from '../../../context/AccountData';
import { toTitleCase } from '../../../util/FormatStringToTitle';

interface SelectedEvent {
  id: number,
  name: string
}
interface Props {
  showModal: React.Dispatch<React.SetStateAction<boolean>>
  setData: (value: SelectedEvent) => void;
  currentSelected: SelectedEvent
}

const SelectEventModal: React.FC<Props> = ({ showModal, setData, currentSelected }: Props): React.ReactElement => {
  const userData = useContext(AccountContext)

  const [selected, setSelected] = useState<SelectedEvent>(currentSelected)
  const { loading, error, data } = useQuery(getAvailableEventsByUser, {
    variables: {
      userName: userData.account.user,
    },
    fetchPolicy: "no-cache"
  });

  const handleSelected = () => {
    setData(selected)
    showModal(false)
  }

  if (error) console.log(error);
  
  return (
    <section className='modal-wrap'>
      <div className='modal-bg'></div>
      <div className='fixed-comp modal'>
        <div className='mt-4 font-bold text-xl mb-4'>
          Events
        </div>
        <div className='wrap-event-list w-11/12'>
          {
            loading &&
            <LoadingField />
          }
          { error &&
            <div>Error: Can&apos;t load events!</div>
          }
          {
            data &&
            data.events.map((event: EventType) => {
              return ((
                <div key={event.id} onClick={() => setSelected({ id: event.id, name: event.name })} className='mt-6 border-bottom hover:opacity-60 cursor-pointer'>
                  <div className='event-item'>
                    <div className='flex justify-between items-center font-bold text-xl mb-4'>
                      {event.name}
                      {
                        selected.id === event.id &&
                        <i className='primaryColor-icon'>
                          <ImCheckmark />
                        </i>
                      }
                    </div>
                    <div className='flex items-center mb-3'>
                      <img src={EVENT_ICON} className="mr-2" alt="event_id" />
                      <div>{event.id}</div>
                    </div>
                    <div className='flex items-center mb-3'>
                      <img src={CATEGORY_ICON} className="mr-2" alt="category" />
                      <span>
                        {event.eventCategories.map((category, index) => {
                          return (
                            <span key={category.category.id}>
                              {toTitleCase(category.category.name)}
                              {event.eventCategories.length - 1 === index ? '' : ', '}
                            </span>
                          )
                        })}
                      </span>
                    </div>
                    <div className='flex items-center mb-3'>
                      <img src={LOCATION_ICON} className="mr-2" alt="location" />
                      <div>{event.location}</div>
                    </div>
                  </div>
                </div>
              )
              )
            })
          }
        </div>
        <div className='w-10/12'>
          <div className='footer-full-w-btn mb-6 mt-3'>
            <button className='primary-btn cursor-pointer' onClick={handleSelected}>
              OK
            </button>
          </div>
        </div>
      </div>

    </section>
  )
}

export default SelectEventModal