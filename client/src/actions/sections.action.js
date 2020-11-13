import { fetchConToken } from '../helpers/fetch'

export const addSection = async (section) => {
	await fetchConToken(`section/new`, section, 'POST')
}
export const updateSection = async (section, id) => {
	await fetchConToken(`section/update/${id}`, section, 'POST')
}
export const deleteSection = async (id) => {
	await fetchConToken(`section/delete/${id}`, {}, 'POST')
}
