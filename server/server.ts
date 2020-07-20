'use strict'

import * as http from 'http'
import app from './app'


const port = 3100
app.set('port', port)

console.log(`Server listening on port ${port}`)

const server = http.createServer(app)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function onError (error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`)
            process.exit(1)
        // tslint:disable-next-line: no-switch-case-fall-through
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`)
            process.exit(1)
        // tslint:disable-next-line: no-switch-case-fall-through
        default:
            throw error
    }
}

function onListening (): void {
    let addr = server.address()
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`
    console.log(`Listening on ${bind}`)
}
