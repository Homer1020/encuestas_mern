import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormularioNota from '../components/FormularioNota'
import NotaPreview from '../components/NotaPreview'
import { useAuth } from '../hooks/useAuth'

const CrearNota = () => {

	const navigate = useNavigate()
	const { headers } = useAuth()

	const [ formValues, setFormValues ] = useState({
		titulo: '',
		descripcion: '',
		contenido: ''
	});

	const handleCrearNota = async e => {
		e.preventDefault();
		const formData = new FormData(e.target)
		const options = {
			method: 'POST',
			body: formData,
			headers
		}
		try {
			const resp = await fetch(`http://localhost:5000/api/notas/create`, options)
			const respJSON = await resp.json()
			if(respJSON.ok) {
				return navigate('/dashboard/notas')
			}
		} catch(err) {
			console.log(err)
			return true
		}
	}

	return (
		<>
			<nav className="bg-secondary py-2 mb-5">
				<div className="container">
					<Link
					 	className="btn btn-outline-light btn-sm"
						to="/dashboard/notas"
					>
						Regresar
					</Link>
				</div>
			</nav>

			<h1 className="text-center my-5">Crear Nota</h1>
			
			<div className="container">
				<div className="grid">
					<div className="g-col-4 g-start-2">
						<div className="card">
							<div className="card-body">
								<h1 className="fs-5 text-uppercase">Cree su nueva nota</h1>	
								<form
									onSubmit={ handleCrearNota }
								>
									<FormularioNota
										formValues={ formValues }
										setFormValues={ setFormValues }
										buttonText='Agregar'
									/>
								</form>
							</div>
						</div>
					</div>
					<div className="g-col-6">
						<NotaPreview
							formValues={ formValues }
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default CrearNota