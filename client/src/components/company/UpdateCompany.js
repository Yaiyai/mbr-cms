import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { EditGroup } from './EditGroup'
import useForm from './../../hooks/useForm'
import { deleteCompany, updateCompany } from './../../actions/company.action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { types } from '../../types/types'
import { CompanyContext } from '../../reducers/CompanyContext'

export const UpdateCompany = () => {
	const [auxValue, setAuxValue] = useState()
	const { company, dispatchCompany } = useContext(CompanyContext)

	const { name, phone, address, _id: id, mainEmail, mainLogo, secondaryLogo, linkedin, facebook, twitter, instagram, maquinasCategories } = company
	const { values, setValues, handleInputChange, handleFileChange } = useForm(company)

	const clearInput = () => {
		const theinput = document.getElementById('to-reset-maq-feat')
		theinput.value = ''
	}

	const handleFeatureChange = (e) => {
		setAuxValue(e.target.value)
	}

	const handleAddFeature = (e) => {
		e.preventDefault()
		if (!maquinasCategories.includes(auxValue)) {
			setValues({
				...values,
				maquinasCategories: [...maquinasCategories, auxValue],
			})
			dispatchCompany({ type: types.maquinasCategoriesUpdate, payload: [...maquinasCategories, auxValue] })
			clearInput()
		}
		clearInput()
	}

	const deleteFeature = (idx) => {
		const categoriesCopy = [...maquinasCategories]
		categoriesCopy.splice(idx, 1)
		setValues({
			...values,
			maquinasCategories: categoriesCopy,
		})
		dispatchCompany({ type: types.maquinasCategoriesUpdate, payload: categoriesCopy })
	}

	const handleDelete = async () => {
		await deleteCompany(id)
		dispatchCompany({ type: types.companyDelete })
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
		dispatchCompany({ type: types.updateCompany, payload })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatchCompany({ type: types.updateCompany, payload: values })
	}

	const saveChanges = async () => {
		await updateCompany(id, company)
		Swal.fire('¡Chachi!', 'Los cambios han sido guardados', 'success')
	}

	return (
		<>
			<h1>Datos de empresa</h1>
			<button className='my-btn mini' onClick={saveChanges}>
				Guardar Cambios
			</button>
			<button className='my-btn secondary mini' onClick={handleDelete}>
				Borrar esta empresa
			</button>

			<div className='editing'>
				<EditGroup deleteField={deleteField} nameValue={'name'} inputType={'text'} editLabel={'Nombre de empresa'} editAction={handleInputChange} editValue={name} submitEdit={handleSubmit} />
				<EditGroup deleteField={deleteField} nameValue={'address'} inputType={'text'} editLabel={'Dirección'} editAction={handleInputChange} editValue={address} submitEdit={handleSubmit} />
				<EditGroup deleteField={deleteField} nameValue={'phone'} inputType={'text'} editLabel={'Teléfono principal'} editAction={handleInputChange} editValue={phone} submitEdit={handleSubmit} />
				<EditGroup deleteField={deleteField} nameValue={'mainEmail'} inputType={'email'} editLabel={'Email principal'} editAction={handleInputChange} editValue={mainEmail} submitEdit={handleSubmit} />
				<EditGroup
					deleteField={deleteField}
					nameValue={'mainLogo'}
					imageEdit={true}
					inputType={'file'}
					editLabel={'Logo Principal'}
					editAction={handleFileChange}
					editValue={mainLogo}
					submitEdit={handleSubmit}
				/>
				<EditGroup
					deleteField={deleteField}
					nameValue={'secondaryLogo'}
					imageEdit={true}
					inputType={'file'}
					editLabel={'Logo BN'}
					editAction={handleFileChange}
					editValue={secondaryLogo}
					submitEdit={handleSubmit}
				/>
				<EditGroup deleteField={deleteField} nameValue={'twitter'} inputType={'text'} editLabel={'Twitter Url'} editAction={handleInputChange} editValue={twitter} submitEdit={handleSubmit} />
				<EditGroup deleteField={deleteField} nameValue={'facebook'} inputType={'text'} editLabel={'Facebook url'} editAction={handleInputChange} editValue={facebook} submitEdit={handleSubmit} />
				<EditGroup deleteField={deleteField} nameValue={'instagram'} inputType={'text'} editLabel={'Instagram Url'} editAction={handleInputChange} editValue={instagram} submitEdit={handleSubmit} />
				<EditGroup deleteField={deleteField} nameValue={'linkedin'} inputType={'text'} editLabel={'Linkedin Url'} editAction={handleInputChange} editValue={linkedin} submitEdit={handleSubmit} />

				<div className='edit-group categories'>
					<form onSubmit={handleAddFeature}>
						<p className='maq-cat-title'>Categorías de máquinas:</p>
						<div className='features'>
							{maquinasCategories?.map((ft, idx) => (
								<div className='each-feat' key={ft}>
									{ft}
									<FontAwesomeIcon onClick={() => deleteFeature(idx)} icon='times-circle' />
								</div>
							))}
						</div>
						<div className='button-input-group'>
							<input type='text' id='to-reset-maq-feat' onChange={handleFeatureChange} placeholder={'Añadir Característica'} name='features' />
							<button type='submit' className='my-btn mini third'>
								Añadir
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
