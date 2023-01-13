import { Link, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

const App = () => (
	<>
		<header>
			<nav className="navbar navbar-expand-lg bg-dark navbar-dark">
			  <div className="container">
			    <Link className="navbar-brand" to="/">EncuestasDEV</Link>
			    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			      <span className="navbar-toggler-icon"></span>
			    </button>
			    <Navbar />
			  </div>
			</nav>
		</header>
		<main>
			<Outlet />
		</main>
		<footer className="bg-dark text-white py-3 mt-5">
			<div className="container">
				<p className="mb-0 text-uppercase text-center text-muted">Homer Moncayo - Todos los derechos reservados { new Date().getFullYear() }</p>
			</div>
		</footer>
	</>
)

export default App