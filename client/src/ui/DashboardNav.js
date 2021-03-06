import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './../reducers/auth/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SectionContext } from '../reducers/sections/sectionsContext'
import { types } from '../types/types'

export const DashboardNav = ({ handleShow }) => {
	const { sections } = useContext(SectionContext)
	const { dispatch, user } = useContext(AuthContext)

	const handleLogout = async () => {
		await dispatch({ type: types.logout })
		await localStorage.removeItem('mbr-token')
		await localStorage.removeItem('mbr-user')
	}

	return (
		<>
			<nav className='dash-nav'>
				<ul>
					<li>
						<Link to='/mbr'>
							<figure>
								<img src='https://res.cloudinary.com/mbr-app/image/upload/v1605125325/logoSecundario_lnnyol.svg' alt='' />
							</figure>
						</Link>
					</li>
					<li>
						<Link to='/mbr/empresa'>Datos de empresa</Link>
					</li>
					<li>
						<Link to='/mbr/maquinaria'>Maquinaria</Link>
					</li>
					<li className='dropdown'>
						<p data-toggle='dropdown'>
							Secciones de la web <FontAwesomeIcon icon='chevron-down' />
						</p>
						{sections.length > 0 && (
							<ul className='dropdown-menu'>
								{sections.map((st) => (
									<li key={st._id}>
										<Link to={`/mbr/seccion/${st._id}`}>{st.sectionName}</Link>
									</li>
								))}
							</ul>
						)}
					</li>
				</ul>
				<div className='btn-group'>
					<small>Made with &hearts; by Yai</small>
					<small>&copy; Mecánica Brañosera S.L.</small>
					{user.email === 'admin@yai.com' && (
						<button className='my-btn third mini' onClick={handleShow}>
							Añadir Sección
						</button>
					)}
					<button className='my-btn secondary mini' onClick={handleLogout}>
						Cerrar Sesión
					</button>
				</div>
			</nav>
		</>
	)
}
