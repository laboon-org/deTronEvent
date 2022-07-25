import React from 'react'

import IMG_NOTFOUND from '../../assets/images/search-not-found.png'

interface Props{
  redirect: () => void;
}
const EventNotFound: React.FC<Props> = ({redirect}: Props): React.ReactElement=> {
  return (
    <>
      <div className='w-3/5 mx-auto pt-4'>
        <img src={IMG_NOTFOUND} alt="Not found" className='object-cover' />
      </div>
      <div className='w-full flex flex-col items-center mt-8'>
        <h6 className='text-xl font-semibold text-primaryColor'>No event created yet</h6>
        <div className='footer-full-w-btn w-11/12 mt-10'>
          <button
            type='button'
            className='primary-btn'
            onClick={redirect}
          >
            Create Event
          </button>
        </div>
      </div>
    </>
  )
}

export default EventNotFound