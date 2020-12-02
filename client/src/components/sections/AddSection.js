import React, { useContext, useState } from 'react'
import { fileUpload } from '../../helpers/uploadFiles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useForm from '../../hooks/useForm'
import { addSection } from '../../actions/sections.action'
import { SectionContext } from '../../reducers/sections/sectionsContext'
import { types } from '../../types/types'
import TextEditor from '../../ui/TextEditor'
// values, setValues, handleInputChange, handleFileChange, resetForm
export const AddSection = ({ handleClose }) => {
	const { dispatchSections } = useContext(SectionContext)
	const [auxValue, setAuxValue] = useState()
	const [quill, setQuill] = useState()

	const { values, setValues, handleInputChange, handleFileChange } = useForm()
	const { uniqueImage, gallery, features, formInputs } = values

	const handleQuill = (e) => {
		e.preventDefault()
		setValues({
			...values,
			text: quill,
		})
	}

	const clearInput = (input) => {
		const theinput = document.getElementById(input)
		theinput.value = ''
	}

	const deleteFormInput = (idx) => {
		const inputCopy = [...formInputs]
		inputCopy.splice(idx, 1)
		setValues({
			...values,
			formInputs: inputCopy,
		})
	}

	const handleChangeFormInput = (e) => {
		setAuxValue(e.target.value)
	}

	const handleAddFormInput = (e) => {
		e.preventDefault()
		if (!formInputs) {
			setValues({
				...values,
				formInputs: [auxValue],
			})
			clearInput('to-reset-section-inputs')
		} else if (!formInputs?.includes(auxValue)) {
			setValues({
				...values,
				formInputs: [...formInputs, auxValue],
			})
			clearInput('to-reset-section-inputs')
		}
		clearInput('to-reset-section-inputs')
	}
	const deleteFeature = (idx) => {
		const featCopy = [...features]
		featCopy.splice(idx, 1)
		setValues({
			...values,
			features: featCopy,
		})
	}

	const handleFeatureChange = (e) => {
		setAuxValue(e.target.value)
	}

	const handleAddFeature = (e) => {
		e.preventDefault()
		if (!features) {
			setValues({
				...values,
				features: [auxValue],
			})
			clearInput('to-reset-section-features')
		} else if (!features?.includes(auxValue)) {
			setValues({
				...values,
				features: [...features, auxValue],
			})
			clearInput('to-reset-section-features')
		}
		clearInput('to-reset-section-features')
	}

	const handleGalleryChange = async ({ target }) => {
		const file = target.files[0]
		const url = await fileUpload(file)

		setAuxValue(url)
	}

	const handleAddGallery = (e) => {
		e.preventDefault()
		if (!gallery) {
			setValues({
				...values,
				gallery: [auxValue],
			})
		} else if (!gallery?.includes(auxValue)) {
			setValues({
				...values,
				gallery: [...gallery, auxValue],
			})
		}
	}

	const deletePicture = (idx) => {
		const galleryCopy = [...gallery]
		galleryCopy.splice(idx, 1)
		setValues({
			...values,
			gallery: galleryCopy,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const newSection = await addSection(values)
		dispatchSections({ type: types.addSection, payload: newSection })
		handleClose()
	}

	return (
		<>
			<form className='section-form' onSubmit={handleSubmit}>
				<div className='left-side'>
					<label>Tipo de sección* {values?.sectionType && <FontAwesomeIcon className='check-ok' icon='check-circle' />}</label>
					<select onChange={handleInputChange} name='sectionType' required>
						<option value='section' defaultValue>
							Sección
						</option>
						<option value='nav'>Navegador</option>
						<option value='header'>Cabecera</option>
						<option value='footer'>Footer</option>
					</select>

					<label>Nombre de la sección* {values?.sectionName && <FontAwesomeIcon className='check-ok' icon='check-circle' />}</label>
					<input type='text' onChange={handleInputChange} name='sectionName' autoComplete='off' placeholder='Nombre de la sección' required />

					<label>Título {values?.title && <FontAwesomeIcon className='check-ok' icon='check-circle' />}</label>
					<input type='text' onChange={handleInputChange} autoComplete='off' name='title' placeholder='Título' required />

					<label>Subtítulo </label>
					<input type='text' onChange={handleInputChange} autoComplete='off' name='subtitle' placeholder='Subtítulo' />

					<label>Texto </label>
					{/* <textarea type='text' onChange={handleInputChange} autoComplete='off'  placeholder='Texto' /> */}

					<label>Imagen principal</label>
					{uniqueImage && (
						<figure className='unique-image'>
							<img src={uniqueImage} alt='' />
						</figure>
					)}

					<input className='file-input' type='file' onChange={handleFileChange} name='uniqueImage' />
				</div>

				<div className='right-side'>
					<label htmlFor=''>Galería de imágenes</label>
					<div className='gallery'>
						{gallery?.map((picture, idx) => (
							<figure className='each-picture' key={idx}>
								<img src={picture} alt='' />
								<FontAwesomeIcon className='close-icon' onClick={() => deletePicture(idx)} icon='times-circle' />
							</figure>
						))}
					</div>

					<div className='button-file-group'>
						<input className='file-input' type='file' onChange={handleGalleryChange} placeholder={'Añadir Foto'} name='gallery' />
						<button onClick={handleAddGallery} className='my-btn mini third'>
							Añadir
						</button>
					</div>

					<label htmlFor=''>Características</label>
					<div className='features'>
						{features?.map((ft, idx) => (
							<div className='each-feat' key={ft}>
								{ft}
								<FontAwesomeIcon onClick={() => deleteFeature(idx)} icon='times-circle' />
							</div>
						))}
					</div>
					<div className='button-input-group'>
						<input type='text' id='to-reset-section-features' onChange={handleFeatureChange} placeholder={'Añadir Característica'} name='features' />
						<button onClick={handleAddFeature} className='my-btn mini third'>
							Añadir
						</button>
					</div>

					<label>Inputs del formulario</label>
					<div className='features'>
						{formInputs?.map((inp, idx) => (
							<div className='each-feat' key={inp}>
								{inp}
								<FontAwesomeIcon onClick={() => deleteFormInput(idx)} icon='times-circle' />
							</div>
						))}
					</div>
					<div className='button-input-group'>
						<input type='text' id='to-reset-section-inputs' onChange={handleChangeFormInput} placeholder={'Añadir Input'} name='formInputs' />
						<button onClick={handleAddFormInput} className='my-btn mini third'>
							Añadir
						</button>
					</div>
				</div>
				<button className='my-btn mini' type='submit'>
					Guardar Datos
				</button>
			</form>
			<TextEditor setQuill={setQuill} handleQuill={handleQuill} />
		</>
	)
}
