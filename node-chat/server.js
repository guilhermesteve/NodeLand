const express = require('express')
const path = require('path')
const http = require('http')
const socketIo = require('socket.io')

const app = express()

const server = http.createServer(app)
const io = socketIo(server)

server.listen(3000)

app.use(express.static(path.join(__dirname, 'public')))

let connectedUsers = [];


io.on('connection', (socket) => {
    console.log('Nova Conexão')

    socket.on('join-request', (username) => {
        socket.username = username;
        connectedUsers.push(socket);

        socket.emit('user-ok', connectedUsers.map(client => client.username))

        socket.broadcast.emit('list-update', {
            joined: username,
            list: connectedUsers.map(client => client.username)
        })
    })

    socket.on('disconnect', () => {

        console.log('Desconectado ' + socket.username)
        connectedUsers = connectedUsers.filter(u => u.username != socket.username)

        socket.broadcast.emit('list-update', {
            left: socket.username,
            list: connectedUsers.map(client => client.username)
        })
    })

    socket.on('send-msg', (msg) => {
        let obj = {
            username : socket.username,
            message: msg
        }  
        socket.emit('show-msg',obj);
        socket.broadcast.emit('show-msg',obj)
    })
})