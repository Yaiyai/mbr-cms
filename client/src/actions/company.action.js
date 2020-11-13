import Swal from 'sweetalert2'
import { fetchConToken } from '../helpers/fetch'

export const addCompany = async (company) => {
	const resp = await fetchConToken(`company/new`, company, 'POST')
	const body = await resp.json()
	if (body.ok) {
		const companyCreated = body.company
		return companyCreated
	}
}
export const updateCompany = async (id, company) => {
	const resp = await fetchConToken(`company/update/${id}`, company, 'POST')
	const body = await resp.json()
	if (body.ok) {
		const updatedCompany = body.company

		return updatedCompany
	} else {
		const errorMsg = body.error
		Swal.fire('Error', errorMsg, 'error')
	}
}

export const deleteCompany = async (id) => {
	await fetchConToken(`company/delete/${id}`, {}, 'POST')
}
