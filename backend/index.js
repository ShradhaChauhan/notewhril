const connectToMongo = require('./db.js');
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

connectToMongo();

app.use(cors());

app.use(express.json());

app.use('/api/notes', require('./routes/notes'));

app.use('/api/users', require('./routes/users'));

app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`notewhril backend listening on port ${PORT}`)
});