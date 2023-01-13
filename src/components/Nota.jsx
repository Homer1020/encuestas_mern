const Nota = ({
	imagen,
	titulo,
	contenido
}) => {
	return (
		<div className="card">
		  <img src={ imagen } className="card-img-top" alt={ `Nota ${ titulo }` } />
		  <div className="card-body">
		    <h5 className="card-title">{ titulo }</h5>
		    <p className="card-text">{ contenido }</p>
		    <a href="#" className="btn btn-primary">Leer Más</a>
		  </div>
		</div>
	)
}

export default Nota