import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AccountContext } from '../../context/AccountData';

interface Props {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ element }: Props): React.ReactElement => {
  const auth = localStorage.getItem('private_route')
  const isLogin = localStorage.getItem('isLogin__DEV_TRONLINK__')
  const account = useContext(AccountContext)
  const { pathname } = useLocation()

  // TODO: should refactoring
  return (
    auth
      ?
      (
        (account.account.user === '' && pathname != '/') || !JSON.parse(isLogin === null ? 'false': isLogin)?
          <Navigate to={'/login'} />
          :
          element

      )
      : <Navigate to="/private_route" />
  )
}

export default PrivateRoute