const socket = io();

const chatBox = document.getElementById("input-msg");

let userIngresado = ""

async function main() {
  const { value: nombre } = await Swal.fire({
    title: "Ingresa tu alias",
    input: "text",
    inputValue: "",
    showCancelButton: false,
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    },
  });

  userIngresado = nombre;

  socket.emit("name-user", userIngresado);

  const user = document.getElementById("user")

  user.innerHTML = '<img style="height: 40px" src="/img/user.png" />' + "Hola " + nombre
}

main();

chatBox.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    socket.emit("msg_front_to_back", {
      msg: chatBox.value,
      user: userIngresado,
    });
  }
});

socket.on("listado_msgs", (msgs) => {

  const box = document.getElementById("div-msgs")

  let format = "";

  msgs.forEach(msg => format = format + "<p style='color: white; font-weight: 900; font-size: 20px; margin: 0px 5px'>" + msg.user + " :</p><br>" + "<p style='font-size: 18px; margin: 0px 20px'> " + msg.msg + "</p><br>");

  box.innerHTML = format
})

/* //FRONT MANDA MSGS AL BACK
setInterval(() => {
  socket.emit("msg_front_back", {
    msg: "hola mundo desde el front " + Date.now(),
    from: "usuario anonimo",
  });
}, 1000);

//FRONT ATAJA LOS MSGS DEL BACK
socket.on("msg_back_front", (msg) => {
  console.log(msg);
}); */
