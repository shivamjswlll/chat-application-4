import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin: "*",
        methods : ['GET', 'POST']
    }
});

export const getReceiverSocketId = (receiverid) => {
    return userSocketmap[receiverid];
}

const userSocketmap = {}; // {userId, socketId}

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;

    if(userId !== 'undefined') 
        userSocketmap[userId] = socket.id;
    
    io.emit('getOnlineUsers', Object.keys(userSocketmap));

    socket.on('disconnect', () => {
        delete userSocketmap[userId],
          io.emit("getOnlineUsers", Object.keys(userSocketmap));
    });
});

export {app, io, server};
