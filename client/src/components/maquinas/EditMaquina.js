import React, { useReducer, useState } from 'react'
import useForm from '../../hooks/useForm'
import { MaquinasReducer } from '../../reducers/MaquinasReducer'
import { types } from '../../types/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateMaquina } from '../../actions/maquina.action'
import { fileUpload } from '../../helpers/uploadFiles'

export const EditMaquina = ({ maquina, setShow, setFetchingMaquinaria, setmaquinaSelected }) => {
	const [auxValue, setAuxValue] = useState()

	const [maquinaToUpdate, dispatch] = useReducer(MaquinasReducer, maquina)
	const { values, setValues, handleInputChange, handleFileChange } = useForm(maquinaToUpdate)
	const { features, name, _id: id, gallery, image } = values

	const clearInput = () => {
		const theinput = document.getElementById('to-reset')
		theinput.value = ''
	}

	const deleteFeature = (idx) => {
		const featCopy = [...features]
		featCopy.splice(idx, 1)
		setValues({
			...values,
			features: featCopy,
		})
		dispatch({ type: types.featuresUpdate, payload: featCopy })
	}

	const deletePicture = (idx) => {
		const galleryCopy = [...gallery]
		galleryCopy.splice(idx, 1)
		setValues({
			...values,
			gallery: galleryCopy,
		})
		dispatch({ type: types.galleryUpdate, payload: galleryCopy })
	}

	const handleFeatureChange = (e) => {
		setAuxValue(e.target.value)
	}

	const handleAddFeature = (e) => {
		e.preventDefault()
		if (!features.includes(auxValue)) {
			setValues({
				...values,
				features: [...features, auxValue],
			})
			dispatch({ type: types.featuresUpdate, payload: [...features, auxValue] })
			clearInput()
		}
		clearInput()
	}

	const handleGalleryChange = async ({ target }) => {
		const file = target.files[0]
		const url = await fileUpload(file)

		setAuxValue(url)
	}

	const handleAddGallery = (e) => {
		e.preventDefault()
		if (!gallery.includes(auxValue)) {
			setValues({
				...values,
				gallery: [...gallery, auxValue],
			})
			dispatch({ type: types.galleryUpdate, payload: [...gallery, auxValue] })
			clearInput()
		}
		clearInput()
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch({ type: types.maquinaUpdate, payload: values })
	}

	const saveChanges = async () => {
		await updateMaquina(id, maquinaToUpdate)

		await setFetchingMaquinaria(true)
		await setmaquinaSelected(maquinaToUpdate)
		await setShow(false)
	}

	return (
		<article className='modal-edit'>
			<div className='edit-maquina'>
				<div className='left-side'>
					<form onSubmit={handleSubmit}>
						<label>Nombre de la maquina* {maquinaToUpdate?.name && <p className='preview'>{maquinaToUpdate?.name}</p>}</label>
						<div className='button-input-group'>
							<input type='text' onChange={handleInputChange} placeholder={name} name='name' />
							<button type='submit' className='my-btn mini third'>
								Cambiar
							</button>
						</div>
					</form>
					<form onSubmit={handleSubmit}>
						<label>Tipo de maquina* {maquinaToUpdate?.category && <p className='preview'>{maquinaToUpdate?.category}</p>}</label>
						<div className='button-input-group'>
							<select onChange={handleInputChange} name='category' required>
								<option defaultValue>Seleccionar...</option>

								<option value='Maquinaria CNC'>Maquinaria CNC</option>
								<option value='Otra maquinaria'>Otra maquinaria</option>
								<option value='Maquinaria Convencional'>Maquinaria Convencional</option>
							</select>

							<button type='submit' className='my-btn mini third'>
								Añadir
							</button>
						</div>
					</form>

					<form onSubmit={handleSubmit}>
						<label>Imagen principal* {maquinaToUpdate?.image && <FontAwesomeIcon className='check-ok' icon='check-circle' />}</label>

						<figure className='main-image'>
							<img src={image} alt='' />
						</figure>

						<div className='button-file-group'>
							<input className='file-input' type='file' onChange={handleFileChange} name='image' />
							<button type='submit' className='my-btn mini third'>
								Cambiar
							</button>
						</div>
					</form>

					<form onSubmit={handleAddFeature}>
						<label>Características de la maquina {maquinaToUpdate?.features && <FontAwesomeIcon className='check-ok' icon='check-circle' />}</label>
						<div className='features'>
							{features?.map((ft, idx) => (
								<div className='each-feat' key={ft}>
									{ft}
									<FontAwesomeIcon onClick={() => deleteFeature(idx)} icon='times-circle' />
								</div>
							))}
						</div>
						<div className='button-input-group'>
							<input type='text' id='to-reset' onChange={handleFeatureChange} placeholder={'Añadir Característica'} name='features' />
							<button type='submit' className='my-btn mini third'>
								Añadir
							</button>
						</div>
					</form>
				</div>
				<div className='right-side'>
					<form onSubmit={handleAddGallery}>
						<label>Galería de fotos de la máquina {maquinaToUpdate?.gallery && <FontAwesomeIcon className='check-ok' icon='check-circle' />}</label>

						<div className='gallery'>
							{gallery?.map((picture, idx) => (
								<figure className='each-picture' key={idx}>
									<img src={picture} alt={picture} />
									<FontAwesomeIcon className='close-icon' onClick={() => deletePicture(idx)} icon='times-circle' />
								</figure>
							))}
						</div>

						<div className='button-file-group'>
							<input className='file-input' type='file' onChange={handleGalleryChange} placeholder={'Añadir Foto'} name='gallery' />
							<button type='submit' className='my-btn mini third'>
								Añadir
							</button>
						</div>
					</form>
				</div>
			</div>
			<button className='my-btn secondary' onClick={saveChanges}>
				Guardar Cambios
			</button>
		</article>
	)
}
