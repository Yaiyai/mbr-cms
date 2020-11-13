import React, { useContext } from 'react'
import { startLogin } from '../../actions/auth.action'
import { AuthContext } from '../../auth/AuthContext'
import useForm from '../../hooks/useForm'
import { Link } from 'react-router-dom'
import { types } from '../../types/types'

export const LoginScreen = () => {
	const { values, handleInputChange } = useForm({})
	const { email, password } = values
	const { dispatch } = useContext(AuthContext)

	const handleLogin = async (e) => {
		e.preventDefault()
		const loggedUser = await startLogin(email, password)

		dispatch({ type: types.login, payload: loggedUser })
	}
	return (
		<>
			<section className='login'>
				<form onSubmit={handleLogin}>
					<label htmlFor=''>Email</label>
					<input type='email' onChange={handleInputChange} placeholder='Tu email' name='email' />
					<label htmlFor=''>Contraseña</label>
					<input type='password' onChange={handleInputChange} placeholder='Contraseña' name='password' />
					<button type='submit' className='my-btn mini'>
						Entrar
					</button>
				</form>
				<small>
					¿No tienes cuenta? Crea una <Link to='/registro'>aquí</Link>{' '}
				</small>
			</section>
		</>
	)
}
