import React, { ReactElement, useContext, memo } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom';

import {ImHome} from 'react-icons/im'
import {FaSearch} from 'react-icons/fa'
import {IoTicket} from 'react-icons/io5'
import {FaUser} from 'react-icons/fa'
import { BsFillCalendarPlusFill } from 'react-icons/bs';

import './Footer.css'
import { AccountContext } from '../../context/AccountData';

interface Props {
  activePage?: string;
}

const Footer: React.FC<Props> = (props: Props): ReactElement => {
  const userData = useContext(AccountContext)
  // const userData = localStorage.getItem('user');
  // const user = userData && JSON.parse(userData);
  const navigate: NavigateFunction = useNavigate();
  const handleNavigate = (url: string): void => {
    navigate(url);
  }
  return (
    <section className='flex justify-between items-center'>
      <article id="home">
        <button 
          className={props.activePage === 'home' ? 'footer-btn active' : 'footer-btn'}
          onClick={() => handleNavigate('/home')}
        >
          <i><ImHome /></i>
          <p className=''>Home</p>
        </button>
      </article>
      <article id="search">
        <button 
          className={props.activePage === 'search' ? 'footer-btn active' : 'footer-btn'}
          onClick={() => handleNavigate('/search')}
        >
          <i><FaSearch /></i>
          <p className=''>Search</p>
        </button>
      </article>

      <article id="event">
        <button 
          className={props.activePage === 'event' ? 'footer-btn active' : 'footer-btn'}
          onClick={() => handleNavigate('/event')}
        >
          <i><BsFillCalendarPlusFill /></i>
          <p className=''>Event</p>
        </button>
      </article>

      <article id="tickets">
        <button 
          className={props.activePage === 'ticket consumption' ? 'footer-btn active' : 'footer-btn'}
          onClick={() => handleNavigate('/issuing_ticket')}
        >
          <i><IoTicket /></i>
          <p>Ticket</p>
        </button>
      </article>
      <article id="profile">
        <button 
          className={props.activePage === 'user' ? 'footer-btn active' : 'footer-btn'}
          // re
          onClick={() => handleNavigate(`/user/${userData.account?.user}`)}
        >
          <i><FaUser /></i>
          <p>Account</p>
        </button>
      </article>
    </section>
  )
}

export default memo(Footer)