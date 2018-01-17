import { GetPayload } from './../../shared/types';
import * as Actions from '../../shared/actions'
import gameSettings from 'store/gameSettings'
import EventEmitter from 'infrastructure/eventEmitter'

class Connection {
    private socket: SocketIOClient.Socket

    public init() {
        this.socket = io()
        const roomId = window.location.hash.substring(1)

        if (roomId) {
            this.emit(Actions.joinRoom(roomId, gameSettings.username))
        } else {
            this.emit(Actions.createRoom(gameSettings.username))
        }

        this.socket.on('room-created', (data: GetPayload<Actions.RoomCreatedAction>) => {
            window.location.hash = data
        })

        this.socket.on('room-not-found', () => {
            alert('Room not found!')
        })

        this.socket.on('user-joined', (data: GetPayload<Actions.UserJoinedAction>) => {
            if (data !== gameSettings.username) {
                EventEmitter.emit(Actions.userJoined(data))
            }
        })

        this.socket.on('user-left', (data: GetPayload<Actions.UserLeftAction>) => {
            EventEmitter.emit(Actions.userLeft(data))
        })

        this.socket.on('show-enemy-in-room', (data: GetPayload<Actions.ShowEnemyInRoomAction>) => {
            EventEmitter.emit(Actions.showEnemyInRoom(data))
        })

        this.socket.on('sync-coordinates', (data: GetPayload<Actions.SyncCoordinatesAction>) => {
            EventEmitter.emit(Actions.syncCoordinates(data))
        })
    }

    public emit(action: Actions.Action): void {
        this.socket.emit(action.kind, action.payload)
    }
}

export default new Connection()
