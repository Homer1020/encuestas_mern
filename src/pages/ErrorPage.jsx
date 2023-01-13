import { Link, useRouteError } from 'react-router-dom'

const NotFound = () => (
	<>
		<p>Página no encontrada</p>
		<Link to="/">Salir de aquí</Link>
	</>
)

const ErrorPage = () => {
	const error = useRouteError()

	console.log(error)

	return (
		<div>
			<h1>Oops! Ocurrio un error</h1>
			{ error.status === 404 && <NotFound /> }
		</div>
	)
}

export default ErrorPage