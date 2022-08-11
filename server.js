const express = require('express');
const app = express();
const envelopes = require('./routes/envelopes.routes');
const errorhandler = require('errorhandler');
const cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.PORT || 4000


app.get('/', (req, res) => {
    res.json({ msg: 'Going to connect to db today!' })
})
app.use(express.json())
//app.get('/api/envelopes', envelopes.getAllEnvelopes);
app.use('/api/envelopes', envelopes);


app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))