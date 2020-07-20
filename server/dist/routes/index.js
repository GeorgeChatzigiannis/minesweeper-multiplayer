"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gridController = require("../controllers/grid");
const router = express_1.Router();
router.get('/createGrid', (req, res) => gridController.getCreateGrid(req, res));
router.post('/mineNodeOpened', (req, res) => gridController.postMineNodeOpened(req, res));
exports.default = router;
