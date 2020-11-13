import React, { useEffect, useReducer, useState } from 'react'
import { fetchSinToken } from '../helpers/fetch'
import { CompanyReducer } from '../reducers/CompanyReducer'
import { types } from '../types/types'
import { UpdateCompany } from './company/UpdateCompany'
import { AddCompany } from './company/AddCompany'

export const CompanyScreen = () => {
	const [fetchingCompany, setFetchingCompany] = useState(true)
	const [companyData, dispatchCompanyData] = useReducer(CompanyReducer, {})

	useEffect(() => {
		if (fetchingCompany) {
			fetchSinToken('company')
				.then((data) => data.json())
				.then((data) => dispatchCompanyData({ type: types.getCompany, payload: data.company[0] }))
				.catch((err) => new Error(err))
		}
		return () => {
			setFetchingCompany(false)
		}
	}, [fetchingCompany, companyData])

	return <>{companyData._id ? <UpdateCompany company={companyData} setFetchingCompany={setFetchingCompany} /> : <AddCompany setFetchingCompany={setFetchingCompany} company={companyData} />}</>
}
