import React, { useContext } from 'react'
import Swal from 'sweetalert2'
import { startSignup } from '../../actions/auth.action'
import { AuthContext } from './../../reducers/auth/AuthContext'
import useForm from '../../hooks/useForm'
import { Link } from 'react-router-dom'
import { types } from '../../types/types'

export const SignupScreen = () => {
	const { values, handleInputChange } = useForm({})
	const { name, email, password, password2 } = values
	const { dispatch } = useContext(AuthContext)

	const handleSignup = async (e) => {
		e.preventDefault()
		if (password === password2) {
			const signedupUser = await startSignup(name, email, password)

			dispatch({ type: types.signup, payload: signedupUser })
		} else {
			Swal.fire('Error', 'Las contraseñas deben coincidir', 'error')
		}
	}

	return (
		<>
			<section className='login'>
				<form onSubmit={handleSignup}>
					<label>Nombre</label>
					<input type='text' onChange={handleInputChange} placeholder='Tu nombre' name='name' />
					<label>Email</label>
					<input type='email' onChange={handleInputChange} placeholder='Tu email' name='email' />
					<label>Contraseña</label>
					<input type='password' onChange={handleInputChange} placeholder='Contraseña' name='password' />
					<label>Repite Contraseña</label>
					<input type='password' onChange={handleInputChange} placeholder='Repite Contraseña' name='password2' />
					<button type='submit' className='my-btn mini'>
						Registro
					</button>
				</form>
				<small>
					¿Ya estás registrado? Entra <Link to='/'>aquí</Link>{' '}
				</small>
			</section>
		</>
	)
}
