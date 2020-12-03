import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const TextEditor = ({ setQuill, handleQuill, setParsed }) => {
	const [value, setValue] = useState('')

	const createHTLM = (text) => {
		return { __html: text }
	}

	useEffect(() => {
		setQuill(value)
		setParsed(createHTLM(value))
	}, [value, setQuill, setParsed])

	return (
		<div>
			<div className='text-editor'>
				<ReactQuill modules={TextEditor.modules} formats={TextEditor.formats} theme='snow' value={value} onChange={setValue} />
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
		[{ header: '1' }, { header: '2' }, { font: [] }],
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
