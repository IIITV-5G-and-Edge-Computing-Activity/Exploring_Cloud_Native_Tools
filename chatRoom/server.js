const express = require('express');
const client = require("prom-client"); // Metric Collection
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const path = require('path'); // Include path module for serving static files

const port = 8500;

const dbname = 'projectchatroom';
const chatCollection = 'chatroom';
const userCollection = 'onlineUsers';

const database = 'mongodb+srv://iiitv202252308:IT202252308@iiitv-database.el72tyd.mongodb.net/projectchatroom?retryWrites=true&w=majority&appName=iiitv-database';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Prometheus Metrics Collection
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

app.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
});

// Body parser middleware (now part of Express)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'frontend')));

// Define a route for '/'
app.get('/', (req, res) => {
    res.send('Welcome to the Chat Server!'); // Simple message for root route
});

// MongoDB connection
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Format chat message
function formatMessage(data) {
    if (!data || !data.fromUser || !data.toUser || !data.msg) {
        console.error('Invalid message data:', data);
        return {
            from: data ? data.fromUser : 'Unknown',
            to: data ? data.toUser : 'Unknown',
            message: 'Invalid message data',
            timestamp: new Date()
        };
    }

    return {
        from: data.fromUser,
        to: data.toUser,
        message: data.msg,  // Use msg instead of message
        timestamp: new Date()
    };
}


// Socket.io connections
io.on('connection', (socket) => {
    console.log('New User Logged In with ID ' + socket.id);

    // Handle chat messages
    socket.on('chatMessage', async (data) => {
        try {
            // Log incoming data for debugging
            console.log('Received chat data:', data);

            // Check if the message format is correct
            const message = formatMessage(data);
            
            // Ensure the message is correctly formatted before inserting
            if (message.message === 'Invalid message data') {
                console.error('Invalid message format');
                return;
            }

            const chat = mongoose.connection.collection(chatCollection);
            await chat.insertOne(message); // Insert the message into the DB
            io.emit('message', message); // Emit the message to all connected clients
        } catch (err) {
            console.error('Error handling chat message:', err);
        }
    });

    // Handle user details (login and chat history)
    socket.on('userDetails', async (data) => {
        try {
            const chatHistoryCollection = mongoose.connection.collection(chatCollection);
            const onlineUsers = mongoose.connection.collection(userCollection);

            const onlineUser = { ID: socket.id, name: data.fromUser };
            await onlineUsers.insertOne(onlineUser); // Store user as online
            console.log(`${onlineUser.name} is online...`);

            // Fetch and send chat history between users
            const chatHistory = await chatHistoryCollection.find({
                $or: [
                    { from: data.fromUser, to: data.toUser },
                    { from: data.toUser, to: data.fromUser }
                ]
            }).toArray();
            socket.emit('output', chatHistory); // Send chat history to the client
        } catch (err) {
            console.error('Error handling user details:', err);
        }
    });

    // Handle user disconnection
    socket.on('disconnect', async () => {
        try {
            const onlineUsers = mongoose.connection.collection(userCollection);
            await onlineUsers.deleteOne({ ID: socket.id }); // Remove user from online users
            console.log(`User ${socket.id} went offline...`);
        } catch (err) {
            console.error('Error handling user disconnect:', err);
        }
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Chat Server listening on port ${port}...`);
});
