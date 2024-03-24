const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the cors package

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Allow all origins
        methods: ["GET", "POST"] // Allow GET and POST requests
    }
});

app.use(cors()); // Use cors middleware
app.use(express.static('public'));
app.use(express.json());

app.post('/update-location', (req, res) => {
    io.emit('locationUpdate', req.body);
    console.log('Location updated');
    console.log(req.body);
    res.status(200).send('Location updated : ' + JSON.stringify(req.body));
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});