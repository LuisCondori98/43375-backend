const socket = io()

$(document).ready(function() {
  $(".card-item").click(function() {
    $(this).hide()
  })
})

document.querySelectorAll(".delete").forEach(butt => butt.addEventListener('click', () => {
  const deleteProduct = (id) => {
    fetch(`/api/products/${id}`, {
      method: "delete"
    })
  }
  deleteProduct(butt.value)
}));

console.log(socket)
