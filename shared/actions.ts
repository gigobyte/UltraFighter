import { IAction } from './actions';
import Client from '../server/client'
import Room from '../server/Room'

export type Action
    = UserLeftAction
    | CreateRoomAction
    | RoomCreatedAction
    | JoinRoomAction
    | RoomNotFoundAction
    | RoomIsFullAction
    | UserJoinedAction
    | SyncCoordinatesAction
    | KeyPressedAction
    | KeyReleasedAction
    | ShowEnemyInRoomAction

export interface IAction {
    kind: string,
    payload?: any
}

export interface UserLeftAction extends IAction {
    kind: 'user-left',
    payload: Client
}

export interface CreateRoomAction extends IAction {
    kind: 'create-room',
    payload: Client['username']
}

export interface RoomCreatedAction extends IAction {
    kind: 'room-created',
    payload: Room['id']
}

export interface JoinRoomAction extends IAction {
    kind: 'join-room',
    payload: {
        roomId: Room['id'],
        username: Client['username']
    }
}

export interface RoomNotFoundAction extends IAction {
    kind: 'room-not-found'
}

export interface RoomIsFullAction extends IAction {
    kind: 'room-is-full'
}

export interface UserJoinedAction extends IAction {
    kind: 'user-joined',
    payload: Client
}

export interface SyncCoordinatesAction extends IAction {
    kind: 'sync-coordinates',
    payload: any
}

export interface KeyPressedAction extends IAction {
    kind: 'key-pressed',
    payload: string
}

export interface KeyReleasedAction extends IAction {
    kind: 'key-released',
    payload: string
}

export interface ShowEnemyInRoomAction extends IAction {
    kind: 'show-enemy-in-room',
    payload: Client
}

export const userLeft = (user: Client): UserLeftAction => ({
    kind: 'user-left',
    payload: user
})

export const createRoom = (username: Client['username']): CreateRoomAction => ({
    kind: 'create-room',
    payload: username
})

export const roomCreated = (id: Room['id']): RoomCreatedAction => ({
    kind: 'room-created',
    payload: id
})

export const joinRoom = (roomId: Room['id'], username: Client['username']): JoinRoomAction => ({
    kind: 'join-room',
    payload: { roomId, username }
})

export const roomNotFound = (): RoomNotFoundAction => ({
    kind: 'room-not-found'
})

export const roomIsFull = (): RoomIsFullAction => ({
    kind: 'room-is-full'
})

export const userJoined = (user: Client): UserJoinedAction => ({
    kind: 'user-joined',
    payload: user
})

export const syncCoordinates = (data: any): SyncCoordinatesAction => ({
    kind: 'sync-coordinates',
    payload: data
})

export const keyPressed = (keyCode: string): KeyPressedAction => ({
    kind: 'key-pressed',
    payload: keyCode
})

export const keyReleased = (keyCode: string): KeyReleasedAction => ({
    kind: 'key-released',
    payload: keyCode
})

export const showEnemyInRoom = (enemy: Client): ShowEnemyInRoomAction => ({
    kind: 'show-enemy-in-room',
    payload: enemy
})