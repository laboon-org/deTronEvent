import React, { ReactElement, useContext, useEffect, useState, memo } from 'react'
import ICON_TOTAL from '../../../assets/images/total-icon.png'
import ICON_BOUGHT from '../../../assets/images/bought-icon.png'
import TicketList from '../../Tickets/TicketList/TicketList';
import { getRemainingTicketsByEvent, getSoldTicketsByEvent, getTicketsByEvent, TicketInterface } from '../../../api/queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import { AccountContext } from '../../../context/AccountData';
import LoadingField from '../../LoadingField/LoadingField';
import {VscListFilter} from 'react-icons/vsc'
import { filters } from '../../../data/eventFilters';
import EventFilterModal from '../EventModals/EventFilterModal';

interface Props {
  id: number
  total: number
  bought: number
  ownerAddress?: string,
}
const EventAnalyseDetail: React.FC<Props> = ({id, total, bought, ownerAddress}: Props): ReactElement => {
  const userData = useContext(AccountContext)
  const [activeFilterModal, setActiveFilterModal] = useState<boolean>(false);
  const [filterIndex, setFilterIndex] = useState<number>(0)
  const [tickets, setTickets] = useState<TicketInterface[]>([]);

  const [loadAllTickets, {loading, error, data}] = useLazyQuery(getTicketsByEvent, {
    variables: {
      eventID: id,
    },
    fetchPolicy: "no-cache",
    onCompleted: (result) => {
      setTickets(result.tickets);
    }
  });
  const [loadSoldTickets, {loading: loading2, error: error2}] = useLazyQuery(getSoldTicketsByEvent, {
    variables: {
      ownerName: userData.account.user,
      eventID: id,
    },
    fetchPolicy: "no-cache",
    onCompleted: (result) => {
      setTickets(result.tickets);
    }
  });
  const [loadRemainingTickets, {loading: loading3, error: error3}] = useLazyQuery(getRemainingTicketsByEvent, {
    variables: {
      ownerName: userData.account.user,
      eventID: id,
    },
    fetchPolicy: "no-cache",
    onCompleted: (result) => {
      setTickets(result.tickets);
    }
  });
  
  useEffect(() => {
    if (filterIndex === 1) {
      loadSoldTickets();
    }
    else if (filterIndex === 2) {
      loadRemainingTickets();
    }
    else loadAllTickets();
  }, [filterIndex])

  if (loading || loading2 || loading3) return <div className='mt-12'><LoadingField /></div>

  if (error || error2 || error3) {
    console.log(error || error2 || error3);
    return <p>Error: Cannot load tickets!</p>
  }

  return (
    <>
      <EventFilterModal 
        activeFilterModal={activeFilterModal} 
        setActiveFilterModal={setActiveFilterModal} 
        filterIndex={filterIndex} 
        setFilterIndex={setFilterIndex}
      />
      <div className='event-detail-ticket w-full'>
        {/* <div className='total-event p-3'>
          <div className='flex justify-between'>
            <div className='flex primaryColor-icon font-semibold'>
              <img className='mr-1 self-center	' src={ICON_TOTAL} alt="total" />
              Total
            </div>
            <div>
              {total} Tickets
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex primaryColor-icon font-semibold'>
              <img className='mr-1 self-center' src={ICON_BOUGHT} alt="total" />
              Bought
            </div>
            <div>
              {bought} Tickets
            </div>
          </div>
        </div> */}
        <article className='w-full flex justify-between items-center'>
          <h6 className='font-semibold text-xl text-primaryColor'>{filters[filterIndex]}</h6>
          <button 
            className='flex items-center hover:opacity-80' 
            onClick={() => setActiveFilterModal(true)}
          >
            <i className='text-xl'><VscListFilter /></i>
            <span className='ml-2 font-semibold'>Filters</span>
          </button>
        </article>
        <article>
          {tickets.length > 0 
          ?
            <TicketList tickets={tickets}/>
          :
            <p className='w-full text-center text-gray-400 text-xl font-semibold mt-6'>
              {
                (filterIndex === 0 && "This event doesn't have any ticket!") ||
                (filterIndex === 1 && "This event haven't sold any ticket yet!") ||
                (filterIndex === 2 && "This event doesn't have any ticket left!")
              }
            </p>
          }
        </article>
      </div>
    </>
  )
}

export default memo(EventAnalyseDetail)