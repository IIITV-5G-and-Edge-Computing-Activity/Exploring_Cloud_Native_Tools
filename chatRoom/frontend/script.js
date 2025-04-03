function storeDetails() {
    const fromUser = document.getElementById('from').value;
    const toUser = document.getElementById('to').value;
    try {
        socket.emit('userDetails', { fromUser, toUser });        
    } catch (error) {
        console.log(error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // Socket initialization
    const socket = io();

    // Your other socket-related code here

    // Define storeDetails function
    

    // Attach storeDetails function to button click event
    const doneButton = document.querySelector('.btn2');
    if (doneButton) {
        doneButton.addEventListener('click', storeDetails);
    }

    //Submit message
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault(); //Prevents default logging to a file
            const msg = e.target.elements.msg.value;
            const fromUser = document.getElementById('from').value;
            const toUser = document.getElementById('to').value;
            const final = {
                'fromUser': fromUser,
                'toUser': toUser,
                'msg': msg
            };
            socket.emit('chatMessage', final); //emits chat message along with sender and receiver to server
            document.getElementById('msg').value = "";
        });
    }

    // Socket event listeners
    socket.on('output', (data) => {
        console.log(data);
    });

    socket.on('output', (data) => { //receives the entire chat history upon logging in between two users and displays them
        const chatMessages = document.querySelector('.chat-messages');
        for (let i = 0; i < data.length; i++) {
            outputMessage(data[i]);
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    socket.on('message', (data) => { //receives a message and displays it
        outputMessage(data);
        console.log(data);
        const chatMessages = document.querySelector('.chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    function outputMessage(message) {
        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `<p class="meta">${message.from}<span> ${message.time}, ${message.date}</span></p>
            <p class ="text">${message.message}</p>`;
        document.querySelector('.chat-messages').appendChild(div);
    }
});
