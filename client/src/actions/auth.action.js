import { fetchConToken, fetchSinToken } from '../helpers/fetch'
import Swal from 'sweetalert2'

export const startLogin = async (email, password) => {
	const resp = await fetchSinToken('auth/login', { email, password }, 'POST')
	const body = await resp.json()

	if (body.ok) {
		const loggedUser = {
			id: body.id,
			name: body.name,
			email: body.email,
			logged: true,
			token: body.token,
		}
		localStorage.setItem('mbr-user', JSON.stringify(loggedUser))
		localStorage.setItem('mbr-token', body.token)

		return loggedUser
	} else {
		const errorMsg = body.msg
		Swal.fire('Error', errorMsg, 'error')
	}
}

export const startSignup = async (name, email, password) => {
	const resp = await fetchSinToken('auth/signup', { name, email, password }, 'POST')
	const body = await resp.json()

	if (body.ok) {
		const signedupUser = {
			id: body.id,
			name: body.name,
			email: body.email,
			token: body.token,
			logged: true,
		}
		localStorage.setItem('mbr-user', JSON.stringify(signedupUser))
		localStorage.setItem('mbr-token', body.token)

		return signedupUser
	} else {
		const errorMsg = body.msg
		Swal.fire('Error', errorMsg, 'error')
	}
}

export const hasToken = async () => {
	const resp = await fetchConToken('auth/renew')
	const body = await resp.json()

	if (body.ok) {
		localStorage.setItem('mbr-token', body.token)
		return {
			id: body.id,
			name: body.name,
			token: body.token,
			logged: true,
		}
	} else {
		const errorMsg = body.msg
		Swal.fire('Error', errorMsg, 'error')
	}
}
