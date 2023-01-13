import { Form, Link } from 'react-router-dom'
import { Input } from '../../components/ui/input'
import { useContext } from 'react'
import { authContext } from '../../contexts/authContext'

const Login = e => {
	const { login } = useContext(authContext)

	const handleLogin = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		
		try {
			const options = {
				method: 'post',
				body: formData
			}
			const resp = await fetch(`http://localhost:5000/login`, options)
			const respJSON = await resp.json()

			console.log(respJSON)

			if(respJSON.ok) {
				login({
					user: respJSON.user,
					token: respJSON.token
				})
			}

		} catch(err) {
			console.log(err)
		}

	}

	return (
		<div className="container">
			<div className="grid">
				<div className="g-start-4 g-col-5">
					<div className="card mt-5">
						<div className="card-body">
							<h3 className="fs-5 text-uppercase">Iniciar Sesión</h3>
							<form onSubmit={ handleLogin }>
								<Input
									name="email"
									label="Correo electrónico"
									type="text"
									placeholder="Su nombre de usuario"
								/>
								<Input
									name="password"
									label="Contraseña"
									type="password"
									placeholder="Su contraseña"
								/>
								<div className="d-flex justify-content-between align-items-center mt-4">
									<input
										type="submit"
										value="Iniciar Sesión"
										className="btn btn-success"
									/>
									<Link to="/register">
										¿Aún no tienes una cuenta?
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>	
		</div>
	)
}

export default Login