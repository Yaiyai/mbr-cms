import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
	return (
		<nav className='login-nav'>
			<div className='container'>
				<ul>
					<li>
						<Link to='/'>Entrar</Link>
					</li>
					<li>
						<Link to='/signup'>Registro</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}
