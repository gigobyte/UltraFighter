import { IClient } from './client'

interface IRoom {
    id: string,
    clients: Set<IClient>
    addClient(client: IClient): void
    removeClient(client: IClient): void
}

class Room implements IRoom {
    public id: string
    public clients: Set<IClient>

    constructor(id: string) {
        this.id = id
        this.clients = new Set()
    }

    public addClient(client: IClient): void {
        this.clients.add(client)
    }

    public removeClient(client: IClient): void {
        this.clients.delete(client)
    }
}

export default Room
