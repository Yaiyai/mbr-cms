import { types } from '../types/types'

export const SectionsReducer = (state = [], action) => {
	switch (action.type) {
		case types.addSection:
			return {
				...action.payload,
			}
		case types.sectionUpdate:
			return {
				...action.payload,
			}

		default:
			return state
	}
}
