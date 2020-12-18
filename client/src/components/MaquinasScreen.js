import React, { useEffect, useReducer, useState } from 'react'
import { fetchSinToken } from '../helpers/fetch'
import { MaquinasReducer } from '../reducers/MaquinasReducer'
import { types } from '../types/types'
import { MaquinaCard } from './maquinas/MaquinaCard'
import Modal from 'react-bootstrap/Modal'
import { EditMaquina } from './maquinas/EditMaquina'
import { AddMaquina } from './maquinas/AddMaquina'
import { deleteMaquina } from '../actions/maquina.action'
import Swal from 'sweetalert2'

export const MaquinasScreen = () => {
	const [show, setShow] = useState(false)
	const [modalId, setModalId] = useState()
	const [maquinaSelected, setmaquinaSelected] = useState()

	const getID = async (id) => {
		await fetchSinToken(`maquinaria/${id}`)
			.then((data) => data.json())
			.then((data) => setmaquinaSelected(data.data))
			.then(() => handleModal(true, 'edit'))
			.catch((err) => new Error(err))
	}

	const [fetchingMaquinaria, setFetchingMaquinaria] = useState(true)
	const [maquinasData, dispatchMaquinasData] = useReducer(MaquinasReducer)

	useEffect(() => {
		if (fetchingMaquinaria) {
			fetchSinToken('maquinaria')
				.then((data) => data.json())
				.then((data) => {
					const prueba = data.data.sort((a, b) => {
						if (a.order > b.order) {
							return 1
						}
						if (a.order < b.order) {
							return -1
						}
						return 0
					})
					dispatchMaquinasData({ type: types.getMaquinas, payload: prueba })
				})
				.then(() => setFetchingMaquinaria(false))
				.catch((err) => new Error(err))
		}
	}, [fetchingMaquinaria, maquinaSelected])

	const handleDeleteMaquina = async (id) => {
		await deleteMaquina(id)
		setFetchingMaquinaria(true)
	}
	const askIfDelete = (id) => {
		Swal.fire({
			title: '¿Seguro?',
			text: 'Si borras esto, se irá al infierno de las máquinas',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '¡Bórrala, señora!',
			cancelButtonText: '¡Uy, no!',
		}).then((result) => {
			if (result.isConfirmed) {
				handleDeleteMaquina(id)
				Swal.fire('¡Máquina borrada!', 'Esta máquina se marchó para no volver', 'success')
			}
		})
	}
	const handleModal = async (visible, modalId) => {
		setShow(visible)
		setModalId(modalId)
	}

	const displayModal = (modalId) => {
		if (show) {
			switch (modalId) {
				case 'add':
					return (
						<>
							<Modal.Header>
								<Modal.Title>Añadir Máquina</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<AddMaquina setShow={setShow} setFetchingMaquinaria={setFetchingMaquinaria} setmaquinaSelected={setmaquinaSelected} />
							</Modal.Body>
						</>
					)
				case 'edit':
					return (
						<>
							<Modal.Header>
								<Modal.Title>Editando Máquina</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<EditMaquina setShow={setShow} maquina={maquinaSelected} setFetchingMaquinaria={setFetchingMaquinaria} setmaquinaSelected={setmaquinaSelected} />
							</Modal.Body>
						</>
					)
				default:
					break
			}
		}
	}

	return (
		<div>
			<section className='maquinas-head'>
				<h1>Maquinaria</h1>
				<button className='my-btn mini' onClick={() => handleModal(true, 'add')}>
					Añadir Maquina
				</button>
			</section>

			<section className='all-maquinas'>
				{maquinasData?.map((maq, idx) => (
					<MaquinaCard idx={idx} key={maq._id} maquina={maq} getID={getID} askIfDelete={askIfDelete} />
				))}
			</section>

			<Modal dialogClassName='modal-width' centered className='my-modals' show={show} onHide={() => handleModal(false, '')}>
				{displayModal(modalId)}

				<Modal.Footer>
					<button className='my-btn mini secondary' onClick={() => handleModal(false, '')}>
						cerrar
					</button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
