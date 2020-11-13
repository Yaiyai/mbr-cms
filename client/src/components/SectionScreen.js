import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSinToken } from '../helpers/fetch'
import { SectionsReducer } from '../reducers/SectionsReducer'
import { types } from '../types/types'

export const SectionScreen = () => {
	const { id } = useParams()

	const [thisSection, dispatch] = useReducer(SectionsReducer)

	useEffect(() => {
		fetchSinToken(`section/${id}`)
			.then((data) => data.json())
			.then((data) => dispatch({ type: types.addSection, payload: data.section }))
			.catch((err) => new Error(err))
	}, [id])

	return <div>{thisSection && <h1>{thisSection.sectionName}</h1>}</div>
}
