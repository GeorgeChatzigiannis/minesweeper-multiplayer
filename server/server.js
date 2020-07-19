#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('./app')
const http = require('http')

const port = 3100

/**
 * Get port from environment and store in Express.
 */

app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port)

server.on('listening', onListening)
console.log(`Server listening on port ${port}`)


/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
    const addr = server.address()
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
    console.log('Listening on ' + bind)
    console.log(`http://localhost:${addr.port}`)
}
