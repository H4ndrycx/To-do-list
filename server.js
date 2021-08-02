const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json())

app.use('/', express.static('./build'))

app.listen(port, (err) => {
    if(err) { return console.log('deu merda')}
        
    console.log(`listening on http://localhost:${port}`)
})
