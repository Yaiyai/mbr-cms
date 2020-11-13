import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
	return (
		<nav className='login-nav'>
			<div className='container'>
				<figure>
					<img src='https://res.cloudinary.com/mbr-app/image/upload/v1605125325/logoSecundario_lnnyol.svg' alt='' />
				</figure>
				<ul>
					<li>
						<Link to='/'>Entrar</Link>
					</li>
					<li>
						<Link to='/registro'>Registro</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}
