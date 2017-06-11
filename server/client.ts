export interface IClient {
    id: string
    username: string
}

class Client implements IClient {
    public id: string
    public username: string

    constructor(id: string, username: string) {
        this.id = id
        this.username = username
    }
}

export default Client
