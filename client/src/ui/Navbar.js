import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
	return (
		<nav className='login-nav'>
			<div className='container'>
				<ul>
					<li>
						<Link to='/auth/login'>Entrar</Link>
					</li>
					<li>
						<Link to='/auth/signup'>Registro</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}
