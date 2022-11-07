const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000",
    },
});
let users =[]
const addUser= (userId,socketId) =>{
    !users.some(user =>user.userId === userId) &&
        users.push({userId,socketId})
}
const removeUser = (socketId) =>{
    users = users.filter(user => user.socketId !==socketId);
}
io.on("connection",(socket) =>{
    console.log("a user connected");
    io.emit("welcome","hello this is socket server ")
    socket.on("addUser",userId =>{
        addUser(userId,socket.id)
        io.emit("getUsers",users)
    });
    socket.on("disconnect",() =>{
        console.log("a user disconnect");
        removeUser(socket.id)
        io.emit("getUsers",users)
    });
})