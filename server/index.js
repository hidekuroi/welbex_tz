const express = require('express')
const router = require('./routes/itemRouter')
const cors = require('cors')

const corsOptions = {
	credentials: true,
	origin: '*',
	allowedHeaders: ['Content-Type'],
	optionSuccessStatus: 200
}

const PORT = process.env.PORT || 8081

const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api', router)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
