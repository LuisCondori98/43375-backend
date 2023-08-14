const socket = io()

// socket.emit("msg-back", "hola amigo backend")

socket.on("message", (data) => {
  console.log(data)
})

console.log(socket)