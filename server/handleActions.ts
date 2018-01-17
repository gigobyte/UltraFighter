import * as Actions from './../shared/actions';
import Room from './room'
import Client from './client'
import { GetPayload } from '../shared/types'
import { broadcast, emit, emitTo } from './emitter'
import { uidSync } from 'uid-ts'

const rooms = new Map<Room['id'], Room>()

const handleActions = (socket: SocketIO.Socket): void => {
    socket.on('disconnect', () => {
        for (const [roomId, room] of rooms) {
            const disconnectedClient = room.findClientById(socket.id)

            if (disconnectedClient) {
                room.removeClient(disconnectedClient)

                if (room.clients.size === 0) {
                    rooms.delete(roomId)
                } else {
                    room.clients.forEach(() => broadcast(socket, Actions.userLeft(disconnectedClient)))
                }
            }
        }
    })

    socket.on('create-room', (data: GetPayload<Actions.CreateRoomAction>) => {
        const client = new Client(socket.id, data)
        const id = uidSync(5)
        const room = new Room(id)
        room.addClient(client)
        rooms.set(id, room)
        emit(socket, Actions.roomCreated(id))
    })

    socket.on('join-room', (data: GetPayload<Actions.JoinRoomAction>) => {
        const client = new Client(socket.id, data.username)
        const room = rooms.get(data.roomId)
        
        if (!room) {
            return emit(socket, Actions.roomNotFound())
        }
        
        if (room.clients.size === 2) {
            return emit(socket, Actions.roomIsFull())
        }
        
        const otherPlayer = Array.from(room.clients)[0]
        
        room.addClient(client)
        emitTo(socket, otherPlayer.id, Actions.userJoined(client))
        emit(socket, Actions.showEnemyInRoom(otherPlayer))
    })

    socket.on('sync-coordinates', (data: GetPayload<Actions.SyncCoordinatesAction>) => {
        for (const [_, room] of rooms) {
            const isPlayerInRoom = !!room.findClientById(socket.id)

            if (isPlayerInRoom) {
                room.clients.forEach(() => broadcast(socket, Actions.syncCoordinates(data)))
            }
        }
    })
}

export default handleActions