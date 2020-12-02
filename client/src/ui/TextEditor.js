import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const TextEditor = ({ setQuill, handleQuill }) => {
	const [value, setValue] = useState('')

	useEffect(() => {
		setQuill(value)
	}, [value, setQuill])

	return (
		<div>
			<div className='text-editor' style={{ marginBottom: '40px' }}>
				<ReactQuill modules={TextEditor.modules} formats={TextEditor.formats} theme='snow' value={value} onChange={setValue} style={{ height: '300px' }} />
			</div>
			<form onSubmit={handleQuill}>
				<button type='submit' className='my-btn mini secondary'>
					Guardar texto
				</button>
			</form>
		</div>
	)
}

TextEditor.modules = {
	toolbar: [
		[{ header: '4' }, { header: '5' }, { font: [] }],
		[{ size: [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
		['link'],
		['clean'],
	],
	clipboard: {
		matchVisual: false,
	},
}
TextEditor.formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link']

export default TextEditor
