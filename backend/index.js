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

if(process.env.NODE_ENV=="production"){
  app.use(express.static("client/build"));
  const path = require('path');
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}

app.listen(PORT, () => {
  console.log(`notewhril backend listening on port ${PORT}`)
});