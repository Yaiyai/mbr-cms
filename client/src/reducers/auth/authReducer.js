import { types } from '../../types/types'

export const AuthReducer = (state = {}, action) => {
	switch (action.type) {
		case types.login:
			return {
				...action.payload,
			}
		case types.signup:
			return {
				...action.payload,
			}
		case types.hasToken:
			return {
				...action.payload,
			}
		case types.logout:
			return {
				logged: false,
			}

		default:
			return state
	}
}
