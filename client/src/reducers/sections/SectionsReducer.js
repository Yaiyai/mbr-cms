import { types } from '../../types/types'

export const SectionsReducer = (state = [], action) => {
	switch (action.type) {
		case types.getSections:
			return action.payload

		case types.addSection:
			return [...state, action.payload]

		case types.deleteSection:
			return action.payload

		case types.updateThis:
			return { ...action.payload }

		case types.sectionUpdate:
			return action.payload

		default:
			return state
	}
}
