import { Remarkable } from 'remarkable';
const md = new Remarkable();

const NotaPreview = ({ formValues }) => {
	return (
		<div>
			<div className="card mb-3">
				<div
					className="card-body"
					dangerouslySetInnerHTML={ {__html: md.render(formValues.contenido)} }
				></div>
			</div>

			<div className="card">
				<div className="card-body">
					<h2 className="fs-5">{ formValues.titulo }</h2>
					<p>{ formValues.descripcion }</p>
				</div>
			</div>
		</div>
	)
}

export default NotaPreview