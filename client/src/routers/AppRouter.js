import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext } from './../reducers/auth/AuthContext'
import { Navbar } from '../ui/Navbar'
import { DashboardNav } from '../ui/DashboardNav'
import { DashboardScreen } from '../components/DashboardScreen'
import { CompanyScreen } from '../components/CompanyScreen'
import { LoginScreen } from '../components/auth/LoginScreen'
import { SignupScreen } from '../components/auth/SignupScreen'
import { MaquinasScreen } from '../components/MaquinasScreen'
import { SectionScreen } from '../components/SectionScreen'
import Modal from 'react-bootstrap/Modal'
import { fetchSinToken } from '../helpers/fetch'
import { AddSection } from '../components/sections/AddSection'
import { SectionsReducer } from '../reducers/sections/SectionsReducer'
import { SectionContext } from '../reducers/sections/sectionsContext'
import { types } from '../types/types'

export const AppRouter = () => {
	const isMounted = useRef(true)
	const { user } = useContext(AuthContext)
	const [sections, dispatchSections] = useReducer(SectionsReducer, {})

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	})

	useEffect(() => {
		if (isMounted.current) {
			fetchSinToken(`section`)
				.then((data) => data.json())
				.then((data) => dispatchSections({ type: types.getSections, payload: data.sections }))
				.catch((err) => new Error(err))
		}
	}, [])

	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	return (
		<Router>
			<div>
				{user.token ? (
					<>
						<SectionContext.Provider value={{ sections, dispatchSections }}>
							<div className='dashboard-container'>
								<DashboardNav handleShow={handleShow} />

								<main>
									<Switch>
										<Route exact path='/mbr' component={DashboardScreen} />
										<Route path='/mbr/empresa' component={CompanyScreen} />
										<Route path='/mbr/maquinaria' component={MaquinasScreen} />
										<Route path='/mbr/seccion/:id' component={(props) => <SectionScreen {...props} />} />
										<Redirect to='/mbr' />
									</Switch>

									<Modal dialogClassName='modal-width' centered className='my-modals' show={show} onHide={handleClose}>
										<Modal.Header>
											<h1>Añadir Sección a la web</h1>
										</Modal.Header>
										<Modal.Body>
											<AddSection handleClose={handleClose} />
										</Modal.Body>

										<Modal.Footer>
											<button className='my-btn mini secondary' onClick={handleClose}>
												cerrar
											</button>
										</Modal.Footer>
									</Modal>
								</main>
							</div>
						</SectionContext.Provider>
					</>
				) : (
					<>
						<Navbar />

						<main className='container'>
							<Switch>
								<Route exact path='/' component={LoginScreen} />
								<Route path='/registro' component={SignupScreen} />
								<Redirect to='/' />
							</Switch>
							<small>Made with &hearts; by Yai</small>
							<small>&copy; Mecánica Brañosera S.L.</small>
						</main>
					</>
				)}
			</div>
		</Router>
	)
}
