import * as ActionModels from 'actions/models'
import * as Actions from 'actions'

export const createRoom = (data: ActionModels.CreateRoomModel): Actions.CreateRoomAction => ({
    type: 'create-room',
    payload: data
})

export const joinRoom = (data: ActionModels.JoinRoomModel): Actions.JoinRoomAction => ({
    type: 'join-room',
    payload: data
})

export const syncCoordinates = (data: ActionModels.SyncCoordinatesModel): Actions.SyncCoordinatesAction => ({
    type: 'sync-coordinates',
    payload: data
})
