import { fetchConToken } from '../helpers/fetch'

export const createMaquina = async (maquina) => {
	await fetchConToken(`maquinaria/nueva`, maquina, 'POST')
}
export const updateMaquina = async (id, maquina) => {
	await fetchConToken(`maquinaria/actualizarMaquina/${id}`, maquina, 'POST')
}
export const deleteMaquina = async (id) => {
	await fetchConToken(`maquinaria/borrarMaquina/${id}`, {}, 'POST')
}
