import { Router as Router, Request, Response } from 'express'
import * as gridController  from '../controllers/grid'
const router = Router()

router.get('/createGrid', (req: Request, res: Response) => gridController.getCreateGrid(req, res))
router.post('/mineNodeOpened', (req: Request, res: Response) => gridController.postMineNodeOpened(req, res))

export default router
