import React, { useContext, useEffect, useReducer, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { deleteSection, updateSection } from '../actions/sections.action'
import { fetchSinToken } from '../helpers/fetch'
import useForm from '../hooks/useForm'
import Swal from 'sweetalert2'
import { AuthContext } from './../reducers/auth/AuthContext'
import { types } from '../types/types'
import { EditGroupSection } from './sections/EditGroupSection'
import { SectionsReducer } from '../reducers/sections/SectionsReducer'
import { SectionContext } from '../reducers/sections/sectionsContext'

export const SectionScreen = () => {
	const isMounted = useRef(true)
	const [thisSection, dispatch] = useReducer(SectionsReducer)
	const { id } = useParams()
	const history = useHistory()

	const { user } = useContext(AuthContext)
	const { dispatchSections } = useContext(SectionContext)

	const { values, setValues, handleInputChange, handleFileChange } = useForm()
	const { title, text, subtitle, _id: idSection, uniqueImage } = values

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		if (isMounted.current) {
			fetchSinToken(`section/${id}`)
				.then((data) => data.json())
				.then((data) => {
					setValues(data.section)
					dispatch({ type: types.addSection, payload: data.section })
				})
				.catch((err) => new Error(err))
		}
	}, [setValues, id])

	const handleDelete = async () => {
		history.push('/mbr')
		const sectionGroup = await deleteSection(id)
		dispatchSections({ type: types.deleteSection, payload: sectionGroup })
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
		dispatch({ type: types.updateThis, payload: values })
	}

	const saveChanges = async () => {
		const sectionUpdated = await updateSection(thisSection, idSection)
		// console.log(sectionUpdated)
		dispatchSections({ type: types.sectionUpdate, payload: sectionUpdated })
		Swal.fire('¡Chachi!', 'Los cambios han sido guardados', 'success')
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
			{uniqueImage && (
				<EditGroupSection
					imageEdit={true}
					nameValue={'uniqueImage'}
					deleteField={deleteField}
					inputType='file'
					editLabel={'Imagen principal'}
					editAction={handleFileChange}
					editValue={thisSection?.uniqueImage}
					submitEdit={handleSubmit}
				/>
			)}
		</section>
	)
}
