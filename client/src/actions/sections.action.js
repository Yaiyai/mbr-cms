import { fetchConToken, fetchSinToken } from '../helpers/fetch'

export const addSection = async (section) => {
	console.log(section)
	const resp = await fetchConToken(`section/new`, section, 'POST')
	const body = await resp.json()
	return body.section
}
export const updateSection = async (section, id) => {
	await fetchConToken(`section/update/${id}`, section, 'POST')
	const resp = await fetchSinToken(`section`)
	const body = await resp.json()
	return body.sections
}
export const deleteSection = async (id) => {
	await fetchConToken(`section/delete/${id}`, {}, 'POST')
	const resp = await fetchSinToken(`section`)
	const body = await resp.json()
	return body.sections
}
