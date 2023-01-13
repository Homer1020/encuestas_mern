import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
	const { user, logout } = useAuth()

	const handleLogout = e => {
		e.preventDefault()
		logout();
	}

	return (
		<div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
	        <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Inicio
          </NavLink>
        </li>
        {
        	user &&
        	(
        		<>
	        		<li className="nav-item">
			          <NavLink
			            to="/dashboard/notas"
			            className={({ isActive }) =>
			              isActive ? 'nav-link active' : 'nav-link'
			            }
			          >
			            Mis Encuestas
			          </NavLink>
			        </li>
			        <li className="nav-item ms-3">
			          <a
			          	href="#"
			          	onClick={ handleLogout }
			          	className="btn btn-outline-warning"
			          >
			            Cerrar Sesión
			          </a>
			        </li>
			      </>
        	)
        }
        {
        	!user &&
        	(
        		<>
        			<li className="nav-item ms-3 me-2">
			          <NavLink
			            to="/login"
			            className={({ isActive }) =>
			              isActive ? 'btn btn-outline-success active' : 'btn btn-outline-success'
			            }
			          >
			            Login
			          </NavLink>
			        </li>
			        <li className="nav-item">
			          <NavLink
			            to="/register"
			            className={({ isActive }) =>
			              isActive ? 'btn btn-outline-success active' : 'btn btn-outline-success'
			            }
			          >
			            Signup
			          </NavLink>
			        </li>
        		</>
        	)
        }
      </ul>
    </div>
	)
}

export default Navbar;