const connectToMongo = require('./db.js');
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

connectToMongo();

app.use(cors({
  origin: ['http://localhost:3000', 'https://notewhril.onrender.com']
}));

app.use(express.json());

app.use('/api/notes', require('./routes/notes'));

app.use('/api/users', require('./routes/users'));

app.use('/api/auth', require('./routes/auth'));

app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`notewhril backend listening on port ${PORT}`)
});