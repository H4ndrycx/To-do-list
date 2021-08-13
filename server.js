const express = require('express');
const session = require('express-session');
const cors = require('cors')
const path = require('path')
const app = express();

const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json())                   

app.use(session({
    secret: "my tasks",
    resave: false,
    saveUninitialized: false,
    cookie: {secure: true, maxAge: 1000 * 60 * 60 * 24 /* one day delay */}
}))

app.use(express.static(path.resolve(__dirname, 'build')))

// routes api
require('./routes')(app)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.listen(port, (err) => {
    console.log(`listening on http://localhost:${port}`)
})
