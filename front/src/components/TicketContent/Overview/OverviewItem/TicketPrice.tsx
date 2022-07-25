import React, { ReactElement, memo } from 'react'

interface Props {
  price: number,
}

const TicketPrice: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <>
      <p className='text-primaryColor select-none text-right leading-5'>
        {props.price} 
        <span> TRX</span>
      </p>
    </>
  )
}

export default memo(TicketPrice)