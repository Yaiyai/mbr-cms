import { useEffect, useReducer, useRef, useState } from 'react'
import { AuthContext } from './reducers/auth/AuthContext'
import { AuthReducer } from './reducers/auth/authReducer'
import 'bootstrap/dist/css/bootstrap.min.css'
import './global.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faTimesCircle, faChevronDown, faChevronUp, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import { AppRouter } from './routers/AppRouter'
library.add(fab, faTimesCircle, faChevronDown, faChevronUp, faCheckCircle)

const init = () => {
	return JSON.parse(localStorage.getItem('mbr-user')) || { logged: false }
}
const App = () => {
	const isMounted = useRef(true)
	const [user, dispatch] = useReducer(AuthReducer, {}, init)
	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		if (isMounted.current) {
			localStorage.setItem('mbr-user', JSON.stringify(user))
		}
	}, [user])

	return (
		<>
			<AuthContext.Provider value={{ user, dispatch }}>
				<AppRouter />
			</AuthContext.Provider>
		</>
	)
}

export default App
