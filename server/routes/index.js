const express = require('express')
const router = express.Router()
const gridController = require('../controllers/grid')

router.get(
    '/createGrid', (req, res, next) => gridController.getCreateGrid(req, res, next)
)

router.post(
    '/mineNodeOpened', (req, res, next) => gridController.postMineNodeOpened(req, res, next)
)

module.exports = router
