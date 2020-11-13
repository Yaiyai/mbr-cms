const express = require('express')
const tokenValidator = require('../middlewares/tokenValidator')
const { check } = require('express-validator')
const formValidator = require('../middlewares/formValidator')

const { addMaquina, updateMaquina, getMaquina, deleteMaquina, getAllMaquinas } = require('./controllers/maquina.controller')
const router = express.Router()

///api/maquinaria
router.get('/', getAllMaquinas)
router.get('/:maquinaId', getMaquina)
//Solo usuarios logeados pueden añadir, borrar o editar
router.use(tokenValidator) //Poniendolo aqui, todas las rutas que estén por debajo, solo podrán accederse si se está validado

router.post('/nueva', [check('name', 'el nombre es obligatorio').not().isEmpty(), check('image', 'la imagen principal es obligatoria').not().isEmpty(), formValidator], addMaquina)
router.post('/actualizarMaquina/:maquinaId', updateMaquina)
router.post('/borrarMaquina/:maquinaId', deleteMaquina)

module.exports = router
