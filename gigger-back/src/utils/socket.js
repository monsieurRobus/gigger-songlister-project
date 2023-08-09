const { Server } = require("socket.io")
const express = require("express");
const { createServer } = require("http");
const { server } = require("./server");
const Setlist = require("../api/models/Setlist.model");

const PORT= process.env.PORT_SOCKET

const httpServer = createServer(server)
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
      }
})

io.on("connect", socket => {
    
    const updateSetlist = Setlist.watch()

    updateSetlist.on('change', change => {
        socket.emit('data-update')
    })

}
)

httpServer.listen(PORT)

module.exports = {io,httpServer}