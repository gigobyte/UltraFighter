import * as actionModels from 'actions/models'

export interface Action {
    type: string,
    payload?: Object
}

export interface CreateRoomAction extends Action {
    payload: actionModels.CreateRoomModel
}

export interface JoinRoomAction extends Action {
    payload: actionModels.JoinRoomModel
}

export interface SyncCoordinatesAction extends Action {
    payload: actionModels.SyncCoordinatesModel
}
