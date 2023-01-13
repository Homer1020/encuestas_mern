import { useLoaderData } from 'react-router-dom'
import { Remarkable } from 'remarkable'
import { useEffect } from 'react'
const md = new Remarkable()
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { es } from "dayjs/locale/es"

dayjs.locale("es")
dayjs.extend(relativeTime)

const Nota = () => {
	const { nota } = useLoaderData()

	useEffect(() => {
			
		document.body.style.backgroundColor = '#f5f5f5'

		return () => {
			document.body.style.backgroundColor = ''
		}
	}, [])

	return (
		<>
			<div className="container">
				<div className="banner position-relative">
					<img
						src={ `http://localhost:5000/api/imagenes/${ nota.imagen }` }
						alt={ nota.titulo }
						className="w-100"
						style={{ height: '400px', objectFit: 'cover', objectPosition: 'center' }}
					/>
					<h1
						className="text-uppercase position-absolute w-100 text-center text-white m-0"
						style={{ bottom: '10rem', left: 0, zIndex: 1 }}
					>{ nota.titulo }</h1>
					<div
						className="position-absolute"
						style={{ top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, .3)' }}
					>
					</div>
				</div>
				<div className="grid position-relative"
					style={{ marginTop: '-5rem', zIndex: '100' }}
				>
					<div className="g-start-2 g-col-10 mb-5">
						<div className="px-4 py-5 bg-white border">
							<div
								className="py-5 md-container"
								dangerouslySetInnerHTML={ {__html: md.render(nota.contenido)} }
							></div>
							<hr />
							<div>
								<p><strong>Descripción:</strong> { nota.descripcion }</p>
								<p><strong>Creado:</strong> { dayjs(nota.createdAt).fromNow() }</p>
								<p><strong>Por:</strong> { nota.User.username }</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Nota