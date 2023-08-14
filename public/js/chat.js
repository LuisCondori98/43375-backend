const socket = io()

const ingresar = document.getElementById("ingresar")

ingresar.addEventListener("click", async () => {
  const { value: user } = await Swal.fire({
    title: 'Ingrese su usuario',
    input: 'text',
    inputPlaceholder: '...',
    showCancelButton: false,
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "ingrese un nombre";
      }
    },
  })
  if (user) {
    Swal.fire({
      title: `Bienvenido ${user}`,
      icon: "success",
    })
    const form = document.getElementById("form")
    form.style.display = "inline"
    ingresar.style.display = "none"
  }

  socket.emit("user", user)

  const users = document.getElementById("user")

  users.innerText = `User ${user}`
})
