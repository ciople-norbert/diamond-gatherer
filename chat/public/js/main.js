const socket = io();

socket.on('join-chat', function(){
    console.log('You joined the chat!');
    document.getElementById('join-chat-container').classList.add('display-none');
    document.getElementById('chat-container').classList.remove('display-none');
});

document.getElementById('join-chat-button').addEventListener('click', function(){
    const input = document.getElementById('user-name-input');
    const color = document.getElementById('color-input').value;
    const userName = input.value;
    if (userName.length > 0){
        document.getElementById('user-name-missing').classList.add('display-none');
        socket.emit('join-chat', userName, color);
    } else {
        document.getElementById('user-name-missing').classList.remove('display-none');
    }
});

document.getElementById('send-message-button').addEventListener('click', function(){
    const input = document.getElementById('message');
    const message = input.value;
    socket.emit('send-message', message);
    document.getElementById('message').value = '';
});

socket.on('new-message', function(messageDetails){
    const messageContainer = document.getElementById('chat-messages');
    const userNameElement = document.createElement('span');
    userNameElement.innerHTML = messageDetails['userName'] + ": ";
    messageContainer.appendChild(userNameElement);
    const messageElement = document.createElement('span');
    messageElement.innerHTML = messageDetails['messageText'] + "<br>";
    messageElement.style.color = messageDetails['messageColor'];
    messageContainer.appendChild(messageElement);
});

document.getElementById('leave-chat-button').addEventListener('click', function(){
    socket.emit('leave-chat');
});

socket.on('menu', function(){
    console.log('You left the chat!');
    document.getElementById('join-chat-container').classList.remove('display-none');
    document.getElementById('chat-container').classList.add('display-none');
});

socket.on('user-count-update', function(userCount){
    document.getElementById('user-count').innerHTML = 'Number of users in chat: ' + userCount;
    console.log(userCount);
});

socket.on('new-user', function(userName){
    const messageContainer = document.getElementById('chat-messages');
    const newUserMessage = document.createElement('p');
    newUserMessage.innerHTML = `User ${userName} has joined the chat`;
    messageContainer.appendChild(newUserMessage);
});

socket.on('user-left', function(userName){
    const messageContainer = document.getElementById('chat-messages');
    const userLeftMessage = document.createElement('p');
    userLeftMessage.innerHTML = `User ${userName} has left the chat`;
    messageContainer.appendChild(userLeftMessage);
});

