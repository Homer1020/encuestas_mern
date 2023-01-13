import { createContext, useState, useEffect } from 'react'

export const authContext = createContext();

const AuthProvider = ({ children }) => {
	const [ auth, setAuth ] = useState({
		user: null,
		token: null
	})

	useEffect(() => {
		const authLS = JSON.parse(localStorage.getItem('auth'))
		if(authLS) {
			setAuth(authLS)
		}
	}, [])

	const login = (auth) => {
		try {
			localStorage.setItem('auth', JSON.stringify(auth))
			setAuth(auth)
		} catch(err) {
			console.log(err)
		}
	}

	const logout = () => {
		try {
			localStorage.setItem('auth', null)
			setAuth({
				user: null,
				token: null
			})
		} catch(err) {
			console.log(err)
		}
	}

	return (
		<authContext.Provider
			value={{
				auth,
				login,
				logout
			}}
		>
			{ children }
		</authContext.Provider>
	)
}

export default AuthProvider