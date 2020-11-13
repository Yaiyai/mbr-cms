import React from 'react'

export const MaquinaCard = ({ maquina, idx, getID, handleDeleteMaquina }) => {
	return (
		<article className='maquina-card'>
			<h6>{maquina.name}</h6>
			<div className='maquina-card-body'>
				<figure>
					<img src={maquina.image} alt={maquina.name} />
				</figure>
				<div className='button-group'>
					<button onClick={() => getID(maquina._id)} className='my-btn mini'>
						Editar
					</button>
					<button onClick={() => handleDeleteMaquina(maquina._id, idx)} className='my-btn mini secondary'>
						Borrar
					</button>
				</div>
			</div>
		</article>
	)
}
