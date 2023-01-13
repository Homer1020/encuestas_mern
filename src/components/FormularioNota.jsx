import { Input, TextArea } from './ui/Input'

const Nota = ({
	formValues,
	setFormValues,
	buttonText
}) => {

	const { titulo, descripcion, contenido, imagen } = formValues;

	const handleInputChange = e => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value })
	}

	return (
		<>
			<div className="mb-3">
				<label
					htmlFor="imagen"
					className="form-label"
				>
					Imágen
				</label>
				{
					imagen
					?
					<img
						src={ `http://localhost:5000/api/imagenes/${ imagen }` }
						className="img-fluid rounded mb-2"
						style={{ objectFit: 'cover' }}
					/>
					:
					null
				}
				<input
					id="imagen"
					name="imagen"
					type="file"
					className="form-control"
				/>
			</div>
			<Input
				type="text"
				name="titulo"
				placeholder="Ingrese su título"
				label="Título"
				value={ titulo }
				onChange={ handleInputChange }
			/>
			<TextArea
				name="descripcion"
				placeholder="Cualquier cosa..."
				label="Descripción Corta"
				value={ descripcion }
				onChange={ handleInputChange }
			/>
			<TextArea
				name="contenido"
				placeholder="Ingrese el contenido en markdown"
				label="Contenido"
				rows={ 7 }
				style={{ minHeight: '5rem' }}
				value={ contenido }
				onChange={ handleInputChange }
			/>
			<button
				className="btn btn-success"
				type="submit"
			>
				{ buttonText }
			</button>
		</>
	)
}

export default Nota