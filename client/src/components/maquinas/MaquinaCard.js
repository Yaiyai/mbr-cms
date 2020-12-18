import React from 'react'

export const MaquinaCard = ({ maquina, idx, getID, askIfDelete }) => {
	return (
		<article className='maquina-card'>
			<h6>{maquina.name}</h6>
			{maquina.order ? <p>Orden en la web: {maquina.order}</p> : <p>Orden en la web: sin definir</p>}
			<div className='maquina-card-body'>
				<figure>
					<img src={maquina.image} alt={maquina.name} />
				</figure>
				<div className='button-group'>
					<button onClick={() => getID(maquina._id)} className='my-btn mini'>
						Editar
					</button>
					<button onClick={() => askIfDelete(maquina._id, idx)} className='my-btn mini secondary'>
						Borrar
					</button>
				</div>
			</div>
		</article>
	)
}
