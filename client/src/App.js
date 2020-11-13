import { useEffect, useReducer, useState } from 'react'
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
	const [user, dispatch] = useReducer(AuthReducer, {}, init)
	const [fetchingUser, setFetchingUser] = useState(true)

	useEffect(() => {
		if (fetchingUser) {
			localStorage.setItem('mbr-user', JSON.stringify(user))
		}
		return () => {
			setFetchingUser(false)
		}
	}, [user, fetchingUser])

	return (
		<>
			<AuthContext.Provider value={{ user, dispatch }}>
				<AppRouter />
			</AuthContext.Provider>
		</>
	)
}

export default App
