import React, { useContext } from 'react'
import { startLogin } from '../../actions/auth.action'
import { AuthContext } from '../../auth/AuthContext'
import useForm from '../../hooks/useForm'
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
			<h1>login</h1>
			<form onSubmit={handleLogin}>
				<input type='email' onChange={handleInputChange} placeholder='Tu email' name='email' />
				<input type='password' onChange={handleInputChange} placeholder='Contraseña' name='password' />
				<button type='submit' className='my-btn'>
					Entrar
				</button>
			</form>
		</>
	)
}
