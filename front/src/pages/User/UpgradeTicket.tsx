import React from 'react'
import { useParams } from 'react-router-dom';
import SubHeader from '../../components/SubHeader/SubHeader';

import IMG_UPGRADE from '../../assets/images/upgrade-ticket.png'

const UpgradeTicket = () => {
  const {id, userName} = useParams();
  return (
    <>
      <div className='wrap border-x-only'>
      <section className='container'>
        <SubHeader pageName="Upgrade Ticket" rootURL={`/user/${userName}/bought_ticket/${id}`} />
        <div className='mt-24'>
          <div className='text-center w-full'>
            <p className='font-semibold'>
              To upgrade your ticket from a single-use ticket to a multi-use ticket. 
              You need <span className='text-primaryColor'> 30 XTZ</span> to upgrade ticket
            </p>
          </div>
          <div className='w-2/5 mx-auto mt-16'>
            <img src={IMG_UPGRADE} alt="Upgrade Ticket" />
          </div>
        </div>
      </section>
      <section 
        className='fixed-comp sub-footer'
      >
        <div className='footer-full-w-btn w-11/12'>
          <button 
            className='primary-btn'
          >
            Upgrade
          </button>
          <button 
            className='secondary-btn mt-4'
          >
            Cancel
          </button>
        </div>
      </section>
    </div>
    </>
  )
}

export default UpgradeTicket