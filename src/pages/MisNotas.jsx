import { useState, useEffect } from 'react'
import { Link, Form, redirect } from 'react-router-dom'
import { FaPencilAlt, FaLink, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { es } from "dayjs/locale/es";
import Nota from '../components/Nota'
import { useAuth } from '../hooks/useAuth'

dayjs.locale("es");
dayjs.extend(relativeTime)

const MySwal = withReactContent(Swal)

const MisNotas = () => {
	const [ notas, setNotas ] = useState([])
	const { headers, user } = useAuth()

	useEffect(() => {
		fetch('http://localhost:5000/api/notas', { headers })
			.then(resp => resp.json())
			.then(notas => {
				setNotas(notas)
			})
	}, [])

	const handleTogglePublicar = async (id, element) => {
		const options = {
			method: 'PATCH',
			headers
		}
		const resp = await fetch(`http://localhost:5000/api/notas/${ id }/toggle-publicar`, options)
		const respJSON = await resp.json()
		if(respJSON.ok) {
			element.textContent = respJSON.publica ? 'Si' : 'No'
			element.className = respJSON.publica ? 'badge bg-success' : 'badge bg-danger'
		}
	}

	const handleEliminarNota = async (e, id) => {
		e.preventDefault()
		try {
			const swalWithBootstrapButtons = Swal.mixin({
			  customClass: {
			    cancelButton: 'btn btn-danger',
			    confirmButton: 'btn btn-success me-3'
			  },
			  buttonsStyling: false
			})

			const result = await swalWithBootstrapButtons.fire({
			  title: '¿Estás seguro de eliminar?',
			  text: "Está acción no es reversible!",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonText: 'Si, eliminar!',
			  cancelButtonText: 'No, cancelar!',
			})
		  if (result.isConfirmed) {
		  	const resp = await fetch(`http://localhost:5000/api/notas/${ id }/eliminar`, {
					method: 'DELETE',
					headers
				})
				const respJSON = await resp.json()
				if(respJSON.ok) {
					swalWithBootstrapButtons.fire(
			      'Se eliminó!',
			      respJSON.message,
			      'success'
			    )
			    fetch('http://localhost:5000/api/notas', { headers })
						.then(resp => resp.json())
						.then(notas => {
							setNotas(notas)
						})
				}
		  } else if (
		    result.dismiss === Swal.DismissReason.cancel
		  ) {
		    swalWithBootstrapButtons.fire(
		      'Se canceló',
		      'Tu nota está asegurada ✅',
		      'error'
		    )
		  }
		} catch(err) {

		}
	}

	return (
		<>
			<div className="container">
				<h1 className="text-center my-5">Mis Encuestas</h1>
				<nav>
					<Link
					 	className="btn btn-outline-success mb-3"
						to="/dashboard/notas/crear"
					>
						Agregar Nota
					</Link>
				</nav>
				<table
					className="table"
				>
					<thead>
						<tr>
							<th>Titulo</th>
							<th>Imagen</th>
							<th>Descripción</th>
							<th>Publicada</th>
							<th>Creada</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{ notas.map(nota => (
							<tr key={ nota.id }>
								<td>
									<div className="ratio ratio-16x9">
										<img
											src={ `http://localhost:5000/api/imagenes/${ nota.imagen }` }
											className="img-fluid"
											style={{ width: '100px', objectFit: 'cover' }}
										/>
									</div>
								</td>
								<td>
									{ nota.titulo }
								</td>
								<td>
									<p className="m-0 text-truncate" style={{ maxWidth: '200px' }}>
										{ nota.descripcion }
									</p>
								</td>
								<td>
									<span
										style={{ cursor: 'pointer' }}
										className={ `badge ${ nota.publica ? 'bg-success' : 'bg-danger' }` }
										onClick={ e => { handleTogglePublicar(nota.id, e.target) } }
									>	
										{ nota.publica ? 'Si' : 'No' }
									</span>
								</td>
								<td>
									{ dayjs(nota.createdAt).fromNow() }
								</td>
								<td>
									<div className="btn-group">
										<Link
											to={ `/notas/${ nota.id }` }
											href="#"
											className="btn btn-primary"
										>
											<FaLink />
										</Link>
										<Link
											to={ `/dashboard/notas/${ nota.id }/editar` }
											className="btn btn-success"
										>
											<FaPencilAlt />
										</Link>
										<a
											className="btn btn-danger"
											href="#"
											onClick={ e => { handleEliminarNota(e, nota.id) } }
										>
											<FaTrashAlt style={{
												pointerEvents: 'none'
											}} />
										</a>
									</div>
									
								</td>
							</tr>
						)) }
					</tbody>
				</table>
			</div>
		</>
	)
}

export default MisNotas