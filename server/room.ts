import Client from './client'

class Room  {
    public clients: Set<Client> = new Set()

    constructor(public id: string) { }

    public addClient(client: Client): void {
        this.clients.add(client)
    }

    public removeClient(client: Client): void {
        this.clients.delete(client)
    }

    public findClientById(id: Client['id']) {
        return Array.from(this.clients).find((client) => client.id === id)
    }
}

export default Room
