import { useState } from 'react'
import { fileUpload } from '../helpers/uploadFiles'

const useForm = (initialState = {}) => {
	const [values, setValues] = useState(initialState)

	const resetForm = () => {
		setValues(initialState)
	}

	const handleInputChange = ({ target }) => {
		setValues({
			...values,
			[target.name]: target.value,
		})
	}
	const handleFileChange = async ({ target }) => {
		const file = target.files[0]
		const url = await fileUpload(file)
		await setValues({
			...values,
			[target.name]: url,
		})
	}

	return { values, setValues, handleInputChange, handleFileChange, resetForm }
}

export default useForm
