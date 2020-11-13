import React from 'react'
import { addCompany } from './../../actions/company.action'
import useForm from './../../hooks/useForm'

export const AddCompany = ({ company, setFetchingCompany }) => {
	const { values, handleInputChange, handleFileChange } = useForm({})

	const handleSubmit = async (e) => {
		e.preventDefault()
		const companyCreated = await addCompany(values)

		//Lift updated state to Company Screen
		setFetchingCompany(true)
		company = companyCreated
	}

	return (
		<>
			<form className='add-form' onSubmit={handleSubmit}>
				<input type='text' name='name' placeholder='Nombre de la empresa' onChange={handleInputChange} />
				<input type='email' name='mainEmail' placeholder='Correo Principal' onChange={handleInputChange} />
				<input type='text' name='phone' placeholder='Teléfono principal' onChange={handleInputChange} />
				<input type='text' name='address' placeholder='Dirección' onChange={handleInputChange} />
				<input type='text' name='linkedin' placeholder='URL Linkedin' onChange={handleInputChange} />
				<input type='text' name='facebook' placeholder='URL Facebook' onChange={handleInputChange} />
				<input type='text' name='instagram' placeholder='URL Instagram' onChange={handleInputChange} />
				<input type='text' name='twitter' placeholder='URL Twitter' onChange={handleInputChange} />
				<div className='input-images'>
					<div>
						<label htmlFor='mainLogo'>Logo principal</label>
						<input type='file' className='file-input' name='mainLogo' id='mainLogo' placeholder='Logo Principal' onChange={handleFileChange} />
					</div>
					<div>
						<label htmlFor='secondaryLogo'>Logo en BN</label>
						<input type='file' className='file-input' name='secondaryLogo' id='secondaryLogo' placeholder='Logo Secundario' onChange={handleFileChange} />
					</div>
				</div>
				<button className='my-btn mini' type='submit'>
					Crear empresa
				</button>
			</form>
		</>
	)
}
