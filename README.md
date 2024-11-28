# 💬 Exploring CLoud Native Tools (Real-Time Chat Application)

## 👩‍🏫 Mentorship

- Dr. Bhupendra Kumar

---

## Team Members

- Ayush Yadav (202252308)
- Shiv Chavda (202251124)
- Suryansh Sahay (202251137)
- M. Ram Bhumeshwar (202251073)

---

## 🔗 Links & Resources

### Deployment & Code

- Frontend Code: Available in `/frontend` directory
- Backend Code: `server.js` and related files
- Monitoring Dashboard: Access at `localhost:9090` after setup

### Tech Components

- Node.js Backend with Express
- Socket.IO for real-time communication
- MongoDB for data persistence
- Prometheus for metrics collection

---

## 📖 Introduction

Our project delivers a robust real-time chat application built with modern web technologies. It features direct messaging capabilities, message history persistence, and comprehensive system monitoring. The application is designed to provide:

- Seamless real-time communication between users
- Persistent message storage and retrieval
- User online/offline status tracking
- System performance monitoring

## 🏎 Workflow

### Application Architecture

1. Frontend sends user details and messages via Socket.IO
2. Backend processes requests and manages WebSocket connections
3. MongoDB stores chat history and user status
4. Prometheus collects performance metrics

---

## 🌟 Features

- Real-time Messaging
  - Instant message delivery using WebSocket connections
  - Support for direct user-to-user communication
  - Message persistence across sessions

- User Management
  - Online/Offline status tracking
  - User activity monitoring
  - Session management

- Message History
  - Complete chat history retrieval
  - Timestamp-based message ordering
  - Persistent storage in MongoDB

- System Monitoring
  - Real-time performance metrics
  - Prometheus integration
  - System health tracking

---

## 🧑‍💻 Technical Implementation

### 1. Backend Architecture

```javascript
const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');
```

### 2. Message Handling

- Real-time event processing
- Message formatting with timestamps
- MongoDB persistence

### 3. User Management

- Socket-based user tracking
- Online status monitoring
- Session handling

### 4. Monitoring System

- Prometheus metric collection
- Performance tracking
- System health monitoring

---

## 🔧 Tech Stack

| Component          | Technology Used    |
|-------------------|-------------------|
| Frontend          | HTML, CSS, JS     |
| Backend           | Node.js, Express  |
| Real-time Comm    | Socket.IO         |
| Database          | MongoDB           |
| Monitoring        | Prometheus        |

---

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Configure MongoDB:
```javascript
const database = 'your-mongodb-connection-string';
```

4. Start the server:
```bash
npm start
```

5. Launch Prometheus (optional):
```bash
docker-compose up -d
```

---

## 📈 Future Scope

- End-to-End Encryption
- Group Chat Functionality
- File Sharing Capabilities
- Voice and Video Chat
- Message Search Functionality
- User Authentication System

---

## 🔍 System Architecture

### Socket Events

- `userDetails`: User connection management
- `chatMessage`: Message handling
- `disconnect`: User disconnection handling

### Database Collections

- `chatroom`: Message storage
- `onlineUsers`: Active user tracking

---

## 🎯 Key Features

1. Real-time Communication
   - WebSocket-based messaging
   - Instant message delivery
   - Connection status tracking

2. Data Persistence
   - MongoDB message storage
   - User session management
   - Chat history retrieval

3. System Monitoring
   - Performance metrics
   - System health tracking
   - Real-time statistics

---

This Real-Time Chat Application demonstrates the implementation of modern web technologies to create a robust communication platform. The combination of Socket.IO for real-time features and MongoDB for data persistence provides a solid foundation for future enhancements. 🚀

---