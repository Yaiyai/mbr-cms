import { types } from '../types/types'

export const MaquinasReducer = (state = [], action) => {
	switch (action.type) {
		case types.getMaquinas:
			return action.payload

		case types.getThisMaquinas:
			return action.payload

		case types.maquinaUpdate:
			return { ...action.payload }

		case types.addMaquina:
			return { ...action.payload }

		case types.featuresUpdate:
			return {
				...state,
				features: action.payload,
			}
		case types.galleryUpdate:
			return {
				...state,
				gallery: action.payload,
			}
		default:
			return state
	}
}
