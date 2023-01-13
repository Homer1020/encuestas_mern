import { Link, useLoaderData } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { es } from "dayjs/locale/es";


dayjs.locale("es");
dayjs.extend(relativeTime)

export const loader = async () => {
	const resp = await fetch('http://localhost:5000/api/notas/all')
	const respJSON = await resp.json()
	return respJSON;
}

const HomePage = () => {
	const notas = useLoaderData()

	return (
		<div className="container">
			<div className="grid py-5">
				{ notas.map(nota => (
					<div
						key={ nota.id }
						className="g-col-3"
					>
						<div className="card shadow-sm">
						<div className="ratio ratio-16x9">
							<img
								src={
									nota.imagen
									? `http://localhost:5000/api/imagenes/${ nota.imagen }`
									: '/nota.jpg'
								}
								alt={ nota.titulo }
								className="card-img-top"
								style={{ objectFit: 'cover' }}
								/>
							</div>
							<header className="card-header">
								<h3 className="fs-6 card-title m-0">{ nota.titulo }</h3>
							</header>
							<div className="card-body">
								<p className="card-text text-truncate">{ nota.descripcion }</p>
								<p className="cerd-text"><strong>Creado:</strong> { dayjs(nota.createdAt).fromNow() }</p>
								<p className="cerd-text"><strong>Por:</strong> { nota.User.username }</p>
								<div className="d-flex justify-content-between">
									<Link to={ `/notas/${ nota.id }` } className="btn btn-outline-primary btn-sm">Leer Más</Link>
								</div>
							</div>
						</div>
					</div>
				)) }
			</div>
		</div>
	)
}

export default HomePage