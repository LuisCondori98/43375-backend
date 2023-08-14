const socket = io()

// socket.on("message", data => {

//   const name = prompt("Ingrese su nombre")

//   document.getElementById("saludo").innerHTML = data + " " + name.valueOf()

//   setTimeout(() => {

//     document.getElementById("saludo").innerHTML = ""
//   }, 3000)

//   console.log(data)

//   socket.emit("user", name.valueOf())
// })

// const botonDelete = document.querySelectorAll(".delete")

// const deleteProduct = (id) => {
//   fetch(`/api/products/${id}`, {
//     method: "delete"
//   })
// }

document.querySelectorAll(".delete").forEach(butt => butt.addEventListener('click', () => {
  // console.log("borrado")
  const deleteProduct = (id) => {
    fetch(`/api/products/${id}`, {
      method: "delete"
    })
  }
  deleteProduct(butt.value)
}));

console.log(socket)
