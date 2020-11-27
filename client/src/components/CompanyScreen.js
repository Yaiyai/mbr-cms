import React, { useEffect, useRef, useContext } from 'react'
import { UpdateCompany } from './company/UpdateCompany'
import { AddCompany } from './company/AddCompany'
import { CompanyContext } from '../reducers/CompanyContext'

export const CompanyScreen = () => {
	const isMounted = useRef(true)
	const { company } = useContext(CompanyContext)

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	return <>{company._id ? <UpdateCompany /> : <AddCompany />}</>
}
