import React from 'react'

import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate, NavigateFunction } from 'react-router-dom';

interface Props {
  image: string;
  rootURL: string,
}

const EventGoBack: React.FC<Props> = ({ image, rootURL }: Props): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (): void => {
    navigate(rootURL);
  }
  return (
    <>
        <div className='flex items-center py-6'>

          <i
            className='text-primaryColor text-2xl 
            p-2 bg-white rounded-full cursor-pointer opacity-80 hover:opacity-100'
            onClick={handleNavigate}
          >
            <IoMdArrowRoundBack />
          </i>
          <h3 className='ml-3 font-semibold text-lg'>
            BTS Concert
          </h3>
        </div>
    </>
  )
}

export default EventGoBack