import { Message } from './interfaces'

interface IConnection {
    conn: WebSocket
    send(data: Message): void
}

class Connection implements IConnection {
    public conn: WebSocket

    constructor(address: string) {
        this.conn = new WebSocket(address)

        this.conn.addEventListener('open', () => {
            this.initSession()
        })

        this.conn.addEventListener('message', (event) => {
            this.receive(JSON.parse(event.data))
        })
    }

    private initSession() {
        const sessionId = window.location.hash.substring(1)

        if (sessionId) {
            this.send({
                type: 'join-session',
                payload: sessionId
            })
        } else {
            this.send({
                type: 'create-session'
            })
        }
    }

    private receive(message: Message) {
        if (message.type === 'session-created') {
            window.location.hash = message.payload
        }

        if (message.type === 'join-error') {
            alert(message.payload)
        }
    }

    public send(data: Message): void {
        this.conn.send(JSON.stringify(data))
    }
}

export default Connection
