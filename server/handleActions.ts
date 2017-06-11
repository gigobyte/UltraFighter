import Room from './room'
import Client from './client'
import * as Actions from '../src/actions/models'
const uid = require('uid')

const rooms = new Map<string, Room>()

const handleMessages = (socket: SocketIO.Socket) => {
    socket.on('disconnect', () => {
        for (const [roomId, room] of rooms) {
            const disconnectedClient = Array.from(room.clients).find((client) => client.id === socket.id)

            if (disconnectedClient) {
                room.removeClient(disconnectedClient)
                room.clients.forEach(() => {
                    socket.broadcast.emit('user-left', disconnectedClient.username)
                })

                if (room.clients.size === 0) {
                    rooms.delete(roomId)
                }
            }
        }
    })

    socket.on('create-room', (data: Actions.CreateRoomModel) => {
        const client = new Client(socket.id, data.username)
        const id: string = uid(5)
        const room = new Room(id)
        room.addClient(client)

        rooms.set(id, room)

        socket.emit('room-created', id)
    })

    socket.on('join-room', (data: Actions.JoinRoomModel) => {
        const client = new Client(socket.id, data.username)
        const room = rooms.get(data.roomId)

        if (room && room.clients.size === 2) {
            return
        }

        if (room) {
            room.addClient(client)
            room.clients.forEach((client) => {
                socket.broadcast.emit('user-joined', client.username)
            })
            socket.emit('enemy-in-room', Array.from(room.clients)[0].username)
        } else {
            socket.emit('room-not-found')
        }
    })

    socket.on('sync-coordinates', (data: Actions.SyncCoordinatesModel) => {
        for (const [_, room] of rooms) {
            const playerRoom = Array.from(room.clients).some((client) => client.id === socket.id)

            if (playerRoom) {
                room.clients.forEach(() => {
                    socket.broadcast.emit('sync-coordinates', data)
                })
            }
        }
    })
}

export default handleMessages
