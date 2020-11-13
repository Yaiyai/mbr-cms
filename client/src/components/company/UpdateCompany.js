import React, { useReducer } from 'react'
import Swal from 'sweetalert2'
import { CompanyReducer } from '../../reducers/CompanyReducer'
import { EditGroup } from './EditGroup'
import useForm from './../../hooks/useForm'
import { deleteCompany, updateCompany } from './../../actions/company.action'
import { types } from '../../types/types'

export const UpdateCompany = ({ company, setFetchingCompany }) => {
	const [companyToUpdate, dispatch] = useReducer(CompanyReducer, company)
	const { name, phone, address, _id: id, mainEmail, mainLogo, secondaryLogo, linkedin, facebook, twitter, instagram } = companyToUpdate
	const { values, setValues, handleInputChange, handleFileChange } = useForm(companyToUpdate)

	const handleDelete = async () => {
		await deleteCompany(id)
		dispatch({ type: types.companyDelete })
		//Lift updated state to Company Screen
		setFetchingCompany(true)
		company = companyToUpdate
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
		dispatch({ type: types.UpdateCompany, payload })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch({ type: types.UpdateCompany, payload: values })
	}

	const saveChanges = async () => {
		await updateCompany(id, companyToUpdate)
		//Lift updated state to Company Screen
		setFetchingCompany(true)
		company = companyToUpdate
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
			</div>
		</>
	)
}
