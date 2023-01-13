import { useContext } from 'react'
import { Form, Link } from 'react-router-dom'
import { Input } from '../../components/ui/input'
import { authContext } from '../../contexts/authContext'

const Register = () => {
	const { login } = useContext(authContext)

	const handleLogin = async (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		
		try {
			const options = {
				method: 'post',
				body: formData
			}
			const resp = await fetch(`http://localhost:5000/register`, options)
			const respJSON = await resp.json()

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
							<h3 className="fs-5 text-uppercase">Crear Cuenta</h3>
							<form onSubmit={ handleLogin }>
								<Input
									name="username"
									label="Nombre de Usuario"
									type="text"
									placeholder="Su nombre de usuario"
								/>
								<Input
									name="email"
									label="Correo Electrónico"
									type="email"
									placeholder="Su correo electrónico"
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
										value="Crear Cuenta"
										className="btn btn-success"
									/>
									<Link to="/login">
										¿Ya tienes una cuenta?
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

export default Register