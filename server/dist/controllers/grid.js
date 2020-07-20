"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMineNodeOpened = exports.getCreateGrid = void 0;
const gridService = require("../services/gridService");
async function getCreateGrid(req, res) {
    const mineNodes = gridService.createGrid();
    return res.json(mineNodes);
}
exports.getCreateGrid = getCreateGrid;
async function postMineNodeOpened(req, res) {
    const clickedMineNode = req.body && req.body.mineNode;
    const mineNodes = gridService.updateGrid(clickedMineNode);
    return res.json(mineNodes);
}
exports.postMineNodeOpened = postMineNodeOpened;
