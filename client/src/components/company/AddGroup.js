import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

export const AddGroup = ({ nameValue, inputType, editLabel, editAction, editValue, submitEdit, imageEdit = false }) => {
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	return (
		<>
			<div className='edit-group'>
				{imageEdit ? (
					<>
						<p>{editLabel}: </p>
						<figure>
							<img src={editValue} alt={nameValue} />
						</figure>
					</>
				) : (
					<p>
						{editLabel}: <strong>{editValue}</strong>
					</p>
				)}
				<button onClick={handleShow}>Añadir</button>
			</div>

			<Modal className='edit-modal' show={show} onHide={handleClose}>
				<form className='edit-form' onSubmit={submitEdit}>
					<input name={nameValue} type={inputType} onChange={editAction} placeholder={editValue} />
					<button type='submit' onClick={handleClose}>
						Guardar
					</button>
				</form>
				<button onClick={handleClose}>cerrar</button>
			</Modal>
		</>
	)
}
