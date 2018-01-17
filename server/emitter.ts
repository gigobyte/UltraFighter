import { Action } from '../shared/actions'

export const broadcast = (socket: SocketIO.Socket, action: Action) => {
    socket.broadcast.emit(action.kind, action.payload)
}

export const emit = (socket: SocketIO.Socket, action: Action) => {
    socket.emit(action.kind, action.payload)
}

export const emitTo = (socket: SocketIO.Socket, id: string, action: Action) => {
    socket.to(id).emit(action.kind, action.payload)
}