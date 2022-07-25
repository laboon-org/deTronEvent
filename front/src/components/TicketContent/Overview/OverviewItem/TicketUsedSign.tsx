import React, {memo} from 'react'

import './OverviewItem.css'

const TicketUsedSign = () => {
  return (
    <p className='overview_used_sign bg-gray-200 rounded-full select-none text-xs font-semibold'>Used</p>
  )
}

export default memo(TicketUsedSign)