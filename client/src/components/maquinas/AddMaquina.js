import React, { useContext, useReducer, useState } from 'react'
import { createMaquina } from '../../actions/maquina.action'
import { fileUpload } from '../../helpers/uploadFiles'
import useForm from '../../hooks/useForm'
import { MaquinasReducer } from '../../reducers/MaquinasReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { types } from '../../types/types'
import { CompanyContext } from '../../reducers/CompanyContext'
import Swal from 'sweetalert2'

export const AddMaquina = ({ setShow, setmaquinaSelected, setFetchingMaquinaria }) => {
	const [auxValue, setAuxValue] = useState()
	const { company } = useContext(CompanyContext)
	const { maquinasCategories } = company

	const [maquinaToCreate, dispatch] = useReducer(MaquinasReducer)
	const { values, setValues, handleInputChange, handleFileChange } = useForm()
	const { features, gallery, image } = values

	const clearInput = () => {
		const theinput = document.getElementById('to-reset-add')
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
			dispatch({ type: types.featuresUpdate, payload: [auxValue] })
			clearInput()
		} else if (!features?.includes(auxValue)) {
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
	const deletePicture = (idx) => {
		const galleryCopy = [...gallery]
		galleryCopy.splice(idx, 1)
		setValues({
			...values,
			gallery: galleryCopy,
		})
		dispatch({ type: types.galleryUpdate, payload: galleryCopy })
	}

	const handleAddGallery = (e) => {
		e.preventDefault()
		if (!gallery) {
			setValues({
				...values,
				gallery: [auxValue],
			})
			dispatch({ type: types.galleryUpdate, payload: [auxValue] })
		} else if (!gallery?.includes(auxValue)) {
			setValues({
				...values,
				gallery: [...gallery, auxValue],
			})
			dispatch({ type: types.galleryUpdate, payload: [...gallery, auxValue] })
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch({ type: types.addMaquina, payload: values })
	}

	const saveChanges = async () => {
		const newMaquina = await createMaquina(maquinaToCreate)
		if (!newMaquina) {
			Swal.fire('¡Oh-oh!', 'Ha habido un error, inténtalo de nuevo', 'error')
			await setShow(false)
		} else {
			Swal.fire('¡Chachi!', 'Los cambios han sido guardados', 'success')
			await setFetchingMaquinaria(true)
			await setmaquinaSelected(maquinaToCreate)
			await setShow(false)
		}
	}

	return (
		<article className='modal-edit'>
			<p>
				Para que lo que se introduzca funcione, tienes que escribir lo que sea, darle al botón "Añadir" y esperar a que salga este icono. <FontAwesomeIcon className='check-ok' icon='check-circle' />
			</p>
			<div className='edit-maquina'>
				<div className='left-side'>
					<form onSubmit={handleSubmit}>
						<label>Nombre de la maquina* {maquinaToCreate?.name && <FontAwesomeIcon className='check-ok' icon='check-circle' />}</label>
						{maquinaToCreate?.name && <p className='preview'>{maquinaToCreate?.name}</p>}
						<div className='button-input-group'>
							<input type='text' onChange={handleInputChange} placeholder='Nombre de la máquina' name='name' />
							<button type='submit' className='my-btn mini third'>
								Añadir
							</button>
						</div>
					</form>
					<form onSubmit={handleSubmit}>
						<label>Tipo de maquina* {maquinaToCreate?.category && <FontAwesomeIcon className='check-ok' icon='check-circle' />}</label>
						{maquinaToCreate?.category && <p className='preview'>{maquinaToCreate?.category}</p>}
						<div className='button-input-group'>
							<select onChange={handleInputChange} name='category' required>
								<option defaultValue>Seleccionar...</option>
								{maquinasCategories &&
									maquinasCategories.map((cat) => (
										<option key={cat} value={cat}>
											{cat}
										</option>
									))}
							</select>

							<button type='submit' className='my-btn mini third'>
								Añadir
							</button>
						</div>
					</form>

					<form onSubmit={handleSubmit}>
						<label>Orden en la web* {maquinaToCreate?.order && <FontAwesomeIcon className='check-ok' icon='check-circle' />}</label>

						{maquinaToCreate?.order && <p className='preview'>{maquinaToCreate?.order}</p>}

						<div className='button-file-group'>
							<input className='order' type='number' onChange={handleInputChange} name='order' />
							<button type='submit' className='my-btn mini third'>
								Añadir
							</button>
						</div>
					</form>

					<form onSubmit={handleSubmit}>
						<label>Imagen principal* {maquinaToCreate?.image && <FontAwesomeIcon className='check-ok' icon='check-circle' />}</label>

						{image && (
							<figure className='main-image'>
								<img src={image} alt='' />
							</figure>
						)}

						<div className='button-file-group'>
							<input className='file-input' type='file' onChange={handleFileChange} name='image' />
							<button type='submit' className='my-btn mini third'>
								Añadir
							</button>
						</div>
					</form>

					<form onSubmit={handleAddFeature}>
						<label>Características de la maquina {maquinaToCreate?.features && <FontAwesomeIcon className='check-ok' icon='check-circle' />}</label>
						<div className='features'>
							{features?.map((ft, idx) => (
								<div className='each-feat' key={ft}>
									{ft}
									<FontAwesomeIcon onClick={() => deleteFeature(idx)} icon='times-circle' />
								</div>
							))}
						</div>
						<div className='button-input-group'>
							<input type='text' id='to-reset-add' onChange={handleFeatureChange} placeholder={'Añadir Característica'} name='features' />
							<button type='submit' className='my-btn mini third'>
								Añadir
							</button>
						</div>
					</form>
				</div>
				<div className='right-side'>
					<form onSubmit={handleAddGallery}>
						<label>Galería de fotos de la máquina {maquinaToCreate?.gallery && <FontAwesomeIcon className='check-ok' icon='check-circle' />}</label>

						{gallery && (
							<div className='gallery'>
								{gallery?.map((picture, idx) => (
									<figure className='each-picture' key={idx}>
										<img src={picture} alt='' />
										<FontAwesomeIcon className='close-icon' onClick={() => deletePicture(idx)} icon='times-circle' />
									</figure>
								))}
							</div>
						)}

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
