import React, { ReactElement, useContext, useState } from 'react'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'

import '../../../pages/Event/Event.css'

import '../../TicketContent/Details/TicketDetails.css'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import EventHeaderDetail from '../EventHeaderDetail'
import EventCategories from '../EventCategories'
import HeaderEventDetail from './HeaderEventDetail'
import EventAnalyseDetail from './EventTicketDetail';
import EventListOwner from './EventListOwner'
import { useQuery } from '@apollo/client';
import { getEventsID } from '../../../api/queries';
import Loading from '../../Loading/Loading';
import moment from 'moment';
import { AccountContext } from '../../../context/AccountData'
import EventStatistics from './EventStatistics'

const EventDetail: React.FC = (): ReactElement => {
  const { id, userName } = useParams();
  const navigate: NavigateFunction = useNavigate();
  const userData = useContext(AccountContext)

  const [tab, setTab] = useState(1);
  const { loading, data, error } = useQuery(
    getEventsID,
    {
      variables: {
        id: id, wallet_address: userData.account.user
      },
      fetchPolicy: "no-cache"
    }
  )
  const handleRedirect = (): void => {
    navigate("/issuing_ticket", { state: { event: data.events[0].name, id: data.events[0].id, isExistData: true } })
  }
  
  if (error)
    return <div>Error 404!</div>

  return (
    <>
      {
        loading ?
          <Loading />
          :
          <div className='wrap border-x-only relative'>
            <div className='container event-detail-content'>
              <EventHeaderDetail rootURL={userName ? `/user/${userName}` : '/event'} name={data.events[0].name} />
              <HeaderEventDetail tab={tab} setTab={setTab} />
              {
                (tab === 1 && data && data.events[0]) &&
                <>
                  <img src={data.events[0].image} alt="Ticket" className='mb-3 event-header-detail__img object-cover h-64 w-full object-center' />
                  <EventCategories categories={data.events[0].eventCategoryItems} isFull />
                  <h3 className='font-semibold text-3xl mt-4'>
                    {data.events[0].name}
                  </h3>
                  <div className='flex-1'>
                    {/* time */}
                    <article className='detail-item'>
                      <div className='detail-icon'>
                        <i>
                          <FaRegCalendarCheck />
                        </i>
                      </div>
                      <div className='detail-info'>
                        <div>
                          <h6>Start Date: {moment(data.events[0].start_date).format('MMMM DD, YYYY')}</h6>
                          <p>{moment(data.events[0].start_date).format('dddd, hh:mm A')}</p>
                        </div>
                        <div className='mt-2'>
                          <h6>End Date: {moment(data.events[0].end_date).format('MMMM DD, YYYY')}</h6>
                          <p>{moment(data.events[0].end_date).format('dddd, hh:mm A')}</p>
                        </div>
                      </div>
                    </article>
                    {/* location */}
                    <article className='detail-item'>
                      <div className='detail-icon'>
                        <i>
                          <IoLocationSharp />
                        </i>
                      </div>
                      <div className='detail-info'>
                        <div>
                          <h6>Location</h6>
                          <p>{data.events[0].location}</p>
                        </div>
                      </div>
                    </article>
                  </div>

                  {!userName && 
                    <div className='footer-full-w-btn w-full mt-28 mb-6 m-auto'>
                      <button
                        type='button'
                        className='primary-btn'
                        onClick={handleRedirect}
                      >
                        Issue Tickets
                      </button>
                    </div>
                    }
                </>
              }
              {
                tab === 2 &&
                <div className='w-full'>
                  <EventAnalyseDetail
                    id={data.events[0].id}
                    total={data.events[0].ticket_issued || 0}
                    bought={data.events[0].ticket_sold || 0}
                    ownerAddress={userName} 
                  />
                </div>
              }
              {
                tab === 3 &&
                <EventStatistics
                  eventID={data.events[0].id}
                />
              }
            </div>
          </div>
      }


    </>
  )
}

export default EventDetail