import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const TextEditor = ({ setQuill, handleQuill, setParsed }) => {
	const [value, setValue] = useState('')
	const quillRef = useRef(null)

	const createHTLM = (text) => {
		return { __html: text }
	}

	const modules = {
		toolbar: {
			container: [
				[{ header: '1' }, { header: '2' }, { font: [] }],
				[{ size: [] }],
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
				['link'],
			],
		},
		clipboard: {
			matchVisual: false,
		},
	}

	useEffect(() => {
		setQuill(value)
		setParsed(createHTLM(value))
	}, [value, setQuill, setParsed])

	return (
		<div>
			<div className='text-editor'>
				<ReactQuill ref={quillRef} modules={modules} formats={TextEditor.formats} theme='snow' value={value} onChange={setValue} />
			</div>
			<form onSubmit={handleQuill}>
				<button type='submit' className='my-btn mini secondary'>
					Guardar texto
				</button>
			</form>
		</div>
	)
}

TextEditor.formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link']

export default TextEditor
