import React, {memo} from 'react'

import IMG_COMPLETE from '../../assets/images/issued_complete.png'

const TransferComplete: React.FC = (): React.ReactElement => {
  return (
    <div className="flex flex-col justify-around items-center h-screen py-10">
      <div>
        <h6 className='text-2xl font-semibold'>Your transfer is completed!</h6>
      </div>
      <div className='w-2/3 mt-10'>
        <img src={IMG_COMPLETE} alt="Loading" />
      </div>
      <div className='mt-20'>
        
      </div>
    </div>
  )
}

export default memo(TransferComplete)