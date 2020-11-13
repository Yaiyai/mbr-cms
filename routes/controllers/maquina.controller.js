const Maquina = require('../../models/maquina.model')

const addMaquina = async (req, res) => {
	const { name, image } = req.body

	await Maquina.create(req.body)
		.then((data) => res.status(201).json({ ok: true, msg: 'Maquina creada', data }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'Maquina no creada', err }))
}

const updateMaquina = async (req, res) => {
	const maquinaID = req.params.maquinaId
	const checkExistence = await Maquina.findById(maquinaID)

	if (!checkExistence) {
		return res.status(404).json({ ok: false, msg: 'Maquina no encontrada, no se puede actualizar.' })
	}

	const update = req.body
	await Maquina.findByIdAndUpdate(maquinaID, update, { new: true })
		.then((data) => res.status(201).json({ ok: true, msg: 'Maquina actualizada', data }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'Maquina no actualizada', err }))
}

const deleteMaquina = async (req, res) => {
	const maquinaID = req.params.maquinaId
	const checkExistence = await Maquina.findById(maquinaID)
	if (!checkExistence) {
		return res.status(404).json({ ok: false, msg: 'Maquina no encontrada, no se puede borrar.' })
	}
	await Maquina.findByIdAndDelete(maquinaID)
		.then(() => res.status(201).json({ ok: true, msg: 'Maquina borrada' }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'Maquina no borrada', err }))
}

const getAllMaquinas = async (req, res) => {
	await Maquina.find()
		.then((data) => res.status(201).json({ ok: true, msg: 'Maquinas traidas', data }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'Maquina no encontradas', err }))
}

const getMaquina = async (req, res) => {
	const id = req.params.maquinaId

	await Maquina.findById(id)
		.then((data) => res.status(201).json({ ok: true, msg: 'Maquina encontrada', data }))
		.catch((err) => res.status(400).json({ ok: false, msg: 'Maquina no encontradas', err }))
}

module.exports = { addMaquina, updateMaquina, deleteMaquina, getAllMaquinas, getMaquina }
