import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

export const EditGroup = ({ nameValue, deleteField, inputType, editLabel, editAction, editValue, submitEdit, imageEdit = false }) => {
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	return (
		<>
			{editValue ? (
				<div className='edit-group'>
					{imageEdit ? (
						<div>
							<p>{editLabel}: </p>

							<figure>
								<img src={editValue} alt={nameValue} />
							</figure>
						</div>
					) : (
						<p>
							{editLabel}: <strong>{editValue}</strong>
						</p>
					)}
					<div>
						<button className='my-btn mini secondary' onClick={() => deleteField(nameValue)}>
							Borrar
						</button>
						<button className='my-btn mini' onClick={handleShow}>
							Editar
						</button>
					</div>
				</div>
			) : (
				<div className='edit-group'>
					<p>
						{editLabel}: <small>Sin datos</small>
					</p>
					<button className='my-btn mini' onClick={handleShow}>
						Añadir
					</button>
				</div>
			)}

			<Modal className='edit-modal my-modals' show={show} onHide={handleClose}>
				<Modal.Header>
					<Modal.Title>{editValue}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form className='edit-form' onSubmit={submitEdit}>
						<input name={nameValue} type={inputType} onChange={editAction} placeholder={editValue} />
						<button className='my-btn' type='submit' onClick={handleClose}>
							Guardar
						</button>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<button className='my-btn' onClick={handleClose}>
						cerrar
					</button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
