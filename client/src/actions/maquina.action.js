import { fetchConToken } from '../helpers/fetch'

export const createMaquina = async (maquina) => {
	const resp = await fetchConToken(`maquinaria/nueva`, maquina, 'POST')
	const body = await resp.json()
	return body.data
}
export const updateMaquina = async (id, maquina) => {
	const resp = await fetchConToken(`maquinaria/actualizarMaquina/${id}`, maquina, 'POST')
	const body = await resp.json()
	return body.data
}
export const deleteMaquina = async (id) => {
	await fetchConToken(`maquinaria/borrarMaquina/${id}`, {}, 'POST')
}
