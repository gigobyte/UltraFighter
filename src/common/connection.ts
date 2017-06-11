import gameSettings from 'common/gameSettings'
import EventEmitter from 'events/eventEmitter'
import * as actions from 'actions/creators'
import { Position } from 'common/interfaces'
import { Action } from 'actions'

class Connection {
    private socket: SocketIOClient.Socket

    public init(address: string) {
        this.socket = io.connect(address)
        const roomId =  window.location.hash.substring(1)

        if (roomId) {
            this.emit(actions.joinRoom({roomId, username: gameSettings.username}))
        } else {
            this.emit(actions.createRoom({username: gameSettings.username}))
        }

        this.socket.on('room-created', (id: string) => {
            window.location.hash = id
        })

        this.socket.on('room-not-found', () => {
            alert('Room not found!')
        })

        this.socket.on('user-joined', (username: string) => {
            if (username !== gameSettings.username) {
                EventEmitter.emit('userjoined', username)
            }
        })

        this.socket.on('user-left', (username: string) => {
            EventEmitter.emit('userleft', username)
        })

        this.socket.on('enemy-in-room', (username: string) => {
            EventEmitter.emit('createexistingenemy', username)
        })

        this.socket.on('sync-coordinates', (data: any) => {
            EventEmitter.emit('coordinatessynced', data.data)
        })
    }

    public emit(action: Action): void {
        this.socket.emit(action.type, action.payload)
    }
}

export default new Connection()
