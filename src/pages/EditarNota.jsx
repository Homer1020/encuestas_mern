import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import FormularioNota from '../components/FormularioNota'
import NotaPreview from '../components/NotaPreview'
import { useAuth } from '../hooks/useAuth'

export const loader = async ({ params }) => {
	const { id } = params;
	const resp = await fetch('http://localhost:5000/api/notas/' + id)
	const respJSON = await resp.json()
  return { nota: respJSON };
}

const EditarNota = () => {
	const { headers, user } = useAuth()
	const { nota } = useLoaderData()
	const navigate = useNavigate()

	const handleActualizarNota = async (e, id) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const options = {
			method: 'PUT',
			body: formData,
			headers
		}
		try {
			const resp = await fetch(`http://localhost:5000/api/notas/${ id }/editar`, options)
			const respJSON = await resp.json()
			alert('Se actualizo correctamente')
			return navigate('/dashboard/notas')
		} catch(err) {
			console.log(err)
			alert('Error al actualizar')
			return false
		}
	}

	const [ formValues, setFormValues ] = useState(nota);
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
			<h1 className="text-center my-5">Editar Nota { nota.titulo }</h1>

			<div className="container">
				<div className="grid">
					<div className="g-col-4 g-start-2">
						<div className="card">
							<div className="card-body">
								<h1 className="fs-5 text-uppercase">Cree su nueva nota</h1>	
								<form
									encType="multipart/form-data"
									onSubmit={ e => { handleActualizarNota(e, nota.id) } }
								>
									<FormularioNota
										formValues={ formValues }
										setFormValues={ setFormValues }
										buttonText='Actualizar'
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

export default EditarNota