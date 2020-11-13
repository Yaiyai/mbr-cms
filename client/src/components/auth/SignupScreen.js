import React, { useContext } from 'react'
import Swal from 'sweetalert2'
import { startSignup } from '../../actions/auth.action'
import { AuthContext } from '../../auth/AuthContext'
import useForm from '../../hooks/useForm'
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
			<h1>signup</h1>
			<form onSubmit={handleSignup}>
				<input type='text' onChange={handleInputChange} placeholder='Tu nombre' name='name' />
				<input type='email' onChange={handleInputChange} placeholder='Tu email' name='email' />
				<input type='password' onChange={handleInputChange} placeholder='Contraseña' name='password' />
				<input type='password' onChange={handleInputChange} placeholder='Repite Contraseña' name='password2' />
				<button type='submit' className='my-btn'>
					Registro
				</button>
			</form>
		</>
	)
}
