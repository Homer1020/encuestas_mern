import { Navigate } from "react-router-dom";
import { useContext } from 'react'
import { authContext } from './contexts/authContext'

export const AuthRoute = ({ children }) => {
  const { auth } = useContext(authContext)
  if(!auth.user) return <Navigate to="/login" replace={true} />
  return children
}