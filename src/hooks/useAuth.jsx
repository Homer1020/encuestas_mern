import { useContext } from 'react'
import { authContext } from '../contexts/authContext'

export const useAuth = () => {
	const { auth, logout } = useContext(authContext)
	const headers = new Headers();
	headers.append('Authorization', `Bearer ${ auth.token }`)
	return { headers, user: auth.user, logout }
}