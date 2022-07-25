import React, { ReactElement, memo } from 'react'

import './StatisticHeader.css'

interface Props {
  statType: string,
  setStatType: React.Dispatch<React.SetStateAction<string>>;
  issuedEventAmount: number;
  boughtTicketsAmount: number;
  totalFavourite: number;
}

const StatisticHeader: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <>
      <article className='statistic-header flex justify-between text-sm'>
        <button 
          className={props.statType === 'issued' ? 'active' : ''}
          onClick={() => props.setStatType('issued')}
        >
          Issued
          <span>{props.issuedEventAmount}</span>
        </button>
        {/* <button
          className={props.statType === 'sold' ? 'active' : ''}
          onClick={() => props.setStatType('sold')}
        >
          Sold
          <span>{props.totalSold ? props.totalSold : 0}</span>
        </button> */}
        <button
          className={props.statType === 'bought' ? 'active' : ''}
          onClick={() => props.setStatType('bought')}
        >
          Bought
          <span>{props.boughtTicketsAmount}</span>
        </button>
        <button
          className={props.statType === 'favorited' ? 'active' : ''}
          onClick={() => props.setStatType('favorited')}
        >
          Favorited
          <span>{props.totalFavourite}</span>
        </button>
      </article>
    </>
  )
}

export default memo(StatisticHeader)