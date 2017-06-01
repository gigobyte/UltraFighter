import * as express from 'express'
import * as path from 'path'

const app = express()

app.use(express.static(path.resolve(__dirname, '..', 'dist')))

app.listen(8080)
