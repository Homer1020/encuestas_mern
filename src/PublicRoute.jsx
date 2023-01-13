import { Navigate } from "react-router-dom";
import { useContext } from 'react'
import { authContext } from './contexts/authContext'

export const PublicRoute = ({ children }) => {
  const { auth } = useContext(authContext)
  if(auth.user) return <Navigate to="/dashboard/notas" replace={true} />
  return children
}