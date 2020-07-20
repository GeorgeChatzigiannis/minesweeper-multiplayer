import * as bodyParser  from 'body-parser'
import * as cors  from 'cors'
import * as express  from 'express'

import indexRoute from './routes/index'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/', indexRoute)

export default app
