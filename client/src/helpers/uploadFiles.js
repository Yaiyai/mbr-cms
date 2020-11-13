export const fileUpload = async (file) => {
	const cloudUrl = 'https://api.cloudinary.com/v1_1/mbr-app/upload'
	const formData = new FormData()
	formData.append('upload_preset', 'mbr-app')
	formData.append('file', file)
	let url

	await fetch(cloudUrl, { method: 'POST', body: formData })
		.then((data) => data.json())
		.then((data) => (url = data.secure_url))
		.catch((err) => console.log(err))
	return url
}
