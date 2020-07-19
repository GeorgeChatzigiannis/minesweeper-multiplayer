const gridService = require('../services/gridService')

const gridController = {}

gridController.getCreateGrid = async (req, res) => {
    const mineNodes = gridService.createGrid()
    res.json(mineNodes)
}

gridController.postMineNodeOpened = async (req, res) => {
    const clickedMineNode = req.body && req.body.mineNode
    const mineNodes = gridService.updateGrid(clickedMineNode)
    res.json(mineNodes)
}

module.exports = gridController
