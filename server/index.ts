import * as express from 'express'
import * as path from 'path'
import * as socket from 'socket.io'
import handleActions from './handleActions'

const app = express()
const server = app.listen(process.env.PORT)

app.use(express.static(path.resolve(__dirname, '..', 'dist')))

const io = socket(server)

io.sockets.on('connection', handleActions)
