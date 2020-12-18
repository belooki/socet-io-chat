import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Messages from './components/Messages';
import './App.css';

const socket = io.connect('http://localhost:4000')

const App = () => {

  // Создаем стэйты для сообщения, имени, массива сообщений и объекта юзер с полями "имя", "айди сокета"
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});

  // Добавляем в массив сообщений новые сообщения с сервера
  useEffect(function() {
    socket.on('messageFromServer', ({ message }) =>
      setMessages(messages => [...messages, message])
    );
  }, []);

  // При отправке формы ввода имени добавляем в объект user имя и эмитим его в сокет
  const getName = () => {
    setUser({...user, name: name})
    socket.emit('userFromClient', { name });
  };

  // При отправке формы ввода сообщения добавялем в массив сообщений новое и эммитим объект(с полями юзера и текстом) в сокет
  const addMessageHandler = message => {
    console.log(user);
    const newMessage = {
      ...user,
      text: message
    };
    socket.emit('messageFromClient', { message: newMessage });
    setMessages(messages => [...messages, newMessage]);
  };

  const submitHandler = e => {
    e.preventDefault();
    if (message) {
      addMessageHandler(message);
      setMessage('');
    }
  };

  return (
    <>
      {user.name ? (
        <div className="jumbotronMessage">
          <Messages messages={messages} />
          <form onSubmit={submitHandler} className="formMessage">
            <input onChange={(e) => setMessage(e.target.value)} value={message} type="text" className="inputMessage"/>
            <button type="submit" className="btn btn-secondary ml-3">Отправить</button>
          </form>
        </div>
      ) : (
        <>
          <div className="jumbotron jumbotronForm">
            <form onSubmit={getName} className="formContainer mt-1">
                <label>Введите ваше имя</label>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text"/>
              <button type="submit" className="btn btn-primary btn-lg mt-3">Зайти в чат</button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default App;
