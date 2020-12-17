const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/hackersChat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

http.listen(3001, function() {
  console.log('listening on port 3001');
})
