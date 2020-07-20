import * as gridService  from '../services/gridService'

export async function getCreateGrid (req, res) {
    const mineNodes = gridService.createGrid()
    return res.json(mineNodes)
}

export async function postMineNodeOpened (req, res) {
    const clickedMineNode = req.body && req.body.mineNode
    const mineNodes = gridService.updateGrid(clickedMineNode)
    return res.json(mineNodes)
}
