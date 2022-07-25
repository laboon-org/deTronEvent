import React, { LazyExoticComponent, ReactElement, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from "./api/client"

import { Exit } from './context/GlobalExit';
import './App.css'
import PrivateRouteForm from './pages/PrivateRoute/PrivateRouteForm';
import PrivateRoute from './pages/PrivateRoute';
import GlobalStyles from './components/GlobalStyles/global';
import Loading from './components/Loading/Loading'
import Login from './pages/Login/Login';
import Welcome from './pages/Welcome/Welcome';
import Error from './components/Error/Error';
import AddFunds from './pages/Buy/AddFunds';
import Confirm from './pages/Buy/Confirm';

import UserSettings from './pages/User/Settings';
import UserProfile from './pages/User/Profile';
import UserWallet from './pages/User/Wallet';

import ShowQRCode from './pages/User/ShowQRCode';
import UpgradeTicket from './pages/User/UpgradeTicket';
import Transfer from './pages/Transfer/Transfer';
import AccountData from './context/AccountData';

const Home: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/Home/Home'));
const Scan: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/Scan/Scan'));
const Tickets: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/Events/Events'));
const Search: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/Search/Search'));
const ActiveEvent: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/ActiveEvent/ActiveEvent'));
const Ticket: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/Ticket/Ticket'));
const User: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/User/User'));
// const IssuedTickets: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/User/IssuedEvents'));
const BoughtTicket: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/User/BoughtTicket'));
const IssuingTicket: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/IssuingTicket/IssuingTicket'));
const Event: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/Event/Event'));
const EventDetail: LazyExoticComponent<React.FC> = React.lazy(() => import('./components/Event/EventDetail/EventDetail'));
const CreateEvent: LazyExoticComponent<React.FC> = React.lazy(() => import('./components/Event/CreateEvent'));
// const IssuedTicket: LazyExoticComponent<React.FC> = React.lazy(() => import('./pages/User/IssuedTicket'));

const App: React.FC = (): ReactElement => {
  const [isExit, setExit] = useState<boolean>(false);
  return (
    <GlobalStyles>
      <ApolloProvider client={client}>
        <AccountData>
          <Exit.Provider value={{ isExit, setExit }}>
              <div className='App'>
                <Routes>
                  <Route path="/" element={<PrivateRoute element={<Welcome />} />} />
                  <Route path="/private_route" element={<PrivateRouteForm />} />
                  <Route path="/login" element={<Login />}/>
                  <Route path="/home"
                    element={<PrivateRoute
                      element={<React.Suspense
                        fallback={<Loading />}><Home /></React.Suspense>} />} />
                  <Route path="/scan" 
                    element={<PrivateRoute 
                      element={<React.Suspense 
                        fallback={<Loading />}><Scan /></React.Suspense>} />} />
                  <Route path="/search"
                    element={<PrivateRoute
                      element={<React.Suspense
                        fallback={<Loading />}><Search /></React.Suspense>} />} />
                  <Route path="/events/:type"
                    element={<PrivateRoute
                      element={<React.Suspense
                        fallback={<Loading />}><Tickets /></React.Suspense>} />} />
                  <Route path="/active_event/:eventID"
                    element={<PrivateRoute
                      element={<React.Suspense
                        fallback={<Loading />}><ActiveEvent /></React.Suspense>} />} />
                  <Route path="/active_event/:eventID/ticket/:id"
                    element={<PrivateRoute
                      element={<React.Suspense
                        fallback={<Loading />}><Ticket /></React.Suspense>} />} />
                  {/* <Route path="active_event/:eventID/ticket/:id/buy" element={<PrivateRoute element={<BuyTicket />} />} /> */}
                  <Route path="active_event/:eventID/ticket/:id/add_funds" element={<PrivateRoute element={<AddFunds />} />} />
                  <Route path="active_event/:eventID/ticket/:id/confirm" element={<PrivateRoute element={<Confirm />} />} />
                  <Route path="/user/:userName"
                    element={<PrivateRoute
                      element={<React.Suspense fallback={<Loading />}><User /></React.Suspense>} />} />
                  <Route path="/user/:userName/issued_event/:id"
                    element={<PrivateRoute
                      element={<React.Suspense
                        fallback={<Loading />}><EventDetail /></React.Suspense>} />} />
                  <Route path="/user/:userName/issued_event/:eventID/ticket/:id"
                    element={<PrivateRoute
                      element={<React.Suspense
                        fallback={<Loading />}><Ticket /></React.Suspense>} />} />
                  <Route path="/user/:userName/bought_ticket/:id"
                    element={<PrivateRoute
                      element={<React.Suspense
                        fallback={<Loading />}><BoughtTicket /></React.Suspense>} />} />
                  <Route path="/user/:userName/bought_ticket/:id/qr_code" element={<PrivateRoute element={<ShowQRCode />} />} />
                  <Route path="/user/:userName/bought_ticket/:id/upgrade" element={<PrivateRoute element={<UpgradeTicket />} />} />
                  <Route path="/user/:userName/bought_ticket/:id/transfer" element={<PrivateRoute element={<Transfer />} />} />
                  <Route path="/user/:userName/settings" element={<PrivateRoute element={<UserSettings />} />} />
                  <Route path="/user/:userName/settings/profile" element={<PrivateRoute element={<UserProfile />} />} />
                  <Route path="/user/:userName/settings/wallet" element={<PrivateRoute element={<UserWallet />} />} />
                  <Route path="/issuing_ticket"
                    element={<PrivateRoute
                      element={<React.Suspense
                        fallback={<Loading />}><IssuingTicket /></React.Suspense>} />} />
                  <Route path="/event"
                    element={<PrivateRoute
                      element={<React.Suspense
                        fallback={<Loading />}><Event /></React.Suspense>} />} />
                  <Route path="/event/:id"
                    element={<PrivateRoute
                      element={<React.Suspense
                        fallback={<Loading />}><EventDetail /></React.Suspense>} />} />
                  <Route path="/event/:eventID/ticket/:id"
                    element={<PrivateRoute
                      element={<React.Suspense
                        fallback={<Loading />}><Ticket /></React.Suspense>} />} />
                  <Route path="/event/create_event"
                    element={<PrivateRoute
                      element={<React.Suspense
                        fallback={<Loading />}><CreateEvent /></React.Suspense>} />} />
                  <Route path="*" element={<Error />} />
                </Routes>
              </div>
          </Exit.Provider>
        </AccountData>
      </ApolloProvider>
    </GlobalStyles>
  )
}

export default App