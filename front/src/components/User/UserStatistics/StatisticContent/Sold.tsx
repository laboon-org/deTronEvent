import React, { memo } from 'react'
import { AccountContext } from '../../../../context/AccountData';
import { useQuery } from '@apollo/client';
import { getUserStatistic, UserStatisticInterface } from '../../../../api/queries';
import Loading from '../../../Loading/Loading';
import ErrorPage from '../../../Error/Error'

interface Props {
  userStatis: UserStatisticInterface;
}

const Sold: React.FC<Props> = ({userStatis}: Props): React.ReactElement => {

  return ( 
    <article className='mb-40 mt-16'>
      {userStatis.totalSoldTickets && userStatis.totalSoldTickets > 0
      ? 
        <>
          <div className='sold-stat'>
            <h6>Ticket:</h6>
            <div className='sold-stat-wrap'>
              <div className='sold-stat-details'>
                <p>One time usage<span>{userStatis.totalOneTimeTickets ? userStatis.totalOneTimeTickets : 0}</span></p>
                <p><span>{userStatis.totalMoneyOfOneTimeTickets ? userStatis.totalMoneyOfOneTimeTickets : 0} TRX</span></p>
              </div>
              <div className='sold-stat-details'>
                <p>Multi time usage<span>{userStatis.totalMultiTimeTickets ? userStatis.totalMultiTimeTickets : 0}</span></p>
                <p><span>{userStatis.totalMoneyOfMultiTimeTickets ? userStatis.totalMoneyOfMultiTimeTickets : 0} TRX</span></p>
              </div>
            </div>
          </div>
          <div className='sold-stat flex justify-between mt-10'>
            <h6 className=''>Total proceeds:</h6>
            <div className='font-semibold text-right '>
              <p className='text-xl text-primaryColor'>{userStatis.totalMoney ? userStatis.totalMoney : 0} TRX</p>
              {/* <p className='text-gray-500'>(4.235.678.50 $)</p> */}
            </div>
          </div>
        </>
        
      : <div className='stat-null'>You haven’t sold any ticket yet.</div>
      }
    </article>
  )
}

export default memo(Sold)