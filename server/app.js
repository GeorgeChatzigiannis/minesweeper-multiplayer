const bodyParser = require('body-parser')
const cors = require('cors');
const express = require('express');

const index = require('./routes')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/', index)


module.exports = app
