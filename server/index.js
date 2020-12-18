const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

io.on('connection', function(socket) {
  console.log('a user connected', socket.id);

  socket.on('userFromClient', async ({ name }) => {
    socket.broadcast.emit('userFromServer', { name });
    const newUser = new User({
      name,
      socketId: socket.id,
      dataStart: Date.now()
    });
    await newUser.save()
  });

  socket.on('messageFromClient', ({ message }) => {
    console.log(message);
    socket.broadcast.emit('messageFromServer', { message });
  });

  socket.on('disconnect', async function() {
    console.log('user disconnected', socket.id);
    await User.findOneAndUpdate({socketId: socket.id}, {dataEnd: Date.now()})
  });
});

server.listen(4000, function() {
  console.log('listening on port 4000');
})
