import { types } from '../types/types'

export const CompanyReducer = (state = [], action) => {
	switch (action.type) {
		case types.getCompany:
			return {
				...action.payload,
			}
		case types.addCompnany:
			return {
				...action.payload,
			}
		case types.companyUpdate:
			return {
				...action.payload,
			}
		case types.deleteProperty:
			return {
				...action.payload,
			}
		case types.maquinasCategoriesUpdate:
			return {
				...state,
				maquinasCategories: action.payload,
			}
		case types.companyDelete:
			return {}
		default:
			return state
	}
}
