import { Position } from 'common/interfaces'

export interface CreateRoomModel {
    username: string
}

export interface JoinRoomModel {
    roomId: string,
    username: string
}

export interface SyncCoordinatesModel {
    data: Object
}
