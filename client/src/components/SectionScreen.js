import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { deleteSection, updateSection } from '../actions/sections.action'
import { fetchSinToken } from '../helpers/fetch'
import useForm from '../hooks/useForm'
import { AuthContext } from './../reducers/auth/AuthContext'
import { SectionsReducer } from '../reducers/SectionsReducer'
import { types } from '../types/types'
import { EditGroupSection } from './sections/EditGroupSection'

export const SectionScreen = ({ setFetchingSections }) => {
	const [thisSection, dispatch] = useReducer(SectionsReducer)
	const [fetching, setFetching] = useState(true)
	const { id } = useParams()
	const history = useHistory()

	const { user } = useContext(AuthContext)

	const { values, setValues, handleInputChange } = useForm()
	const { title, text, subtitle, _id: idSection } = values

	useEffect(() => {
		if (fetching) {
			fetchSinToken(`section/${id}`)
				.then((data) => data.json())
				.then((data) => {
					setValues(data.section)
					dispatch({ type: types.addSection, payload: data.section })
				})
				.then(() => setFetching(false))
				.catch((err) => new Error(err))
		}
	}, [fetching, setValues, id])

	const handleDelete = async () => {
		history.push('/mbr')
		setFetchingSections(true)
		await deleteSection(id)
	}

	const deleteField = async (property) => {
		const payload = {
			...values,
			[property]: '',
		}
		setValues({
			...values,
			[property]: '',
		})
		dispatch({ type: types.sectionUpdate, payload })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch({ type: types.sectionUpdate, payload: values })
	}

	const saveChanges = async () => {
		await updateSection(idSection, thisSection)
	}

	return (
		<section className='section-screen'>
			<h1>
				Sección <span>{thisSection?.sectionName}</span>
			</h1>
			<button className='my-btn mini' onClick={saveChanges}>
				Guardar Cambios
			</button>
			{user.email === 'admin@yai.com' && (
				<button className='my-btn secondary mini' onClick={handleDelete}>
					Borrar esta empresa
				</button>
			)}

			{(title || title === '') && (
				<EditGroupSection nameValue={'title'} deleteField={deleteField} inputType='text' editLabel={'Título'} editAction={handleInputChange} editValue={thisSection?.title} submitEdit={handleSubmit} />
			)}
			{subtitle && (
				<EditGroupSection
					nameValue={'subtitle'}
					deleteField={deleteField}
					inputType='text'
					editLabel={'Subtítulo'}
					editAction={handleInputChange}
					editValue={thisSection?.subtitle}
					submitEdit={handleSubmit}
				/>
			)}
			{text && (
				<EditGroupSection nameValue={'text'} deleteField={deleteField} inputType='text' editLabel={'Texto'} editAction={handleInputChange} editValue={thisSection?.text} submitEdit={handleSubmit} />
			)}
		</section>
	)
}
//  nameValue, deleteField, inputType, editLabel, editAction, editValue, submitEdit, (imageEdit = false)
