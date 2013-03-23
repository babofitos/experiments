var x = 0
  , canvas = document.getElementById('canvas')
  , ctx = canvas.getContext('2d')

function animate(ctx, canvas) {
  x++
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillRect(x, 250, 10, 10)
  setTimeout(function() {
    animate(ctx, canvas)
  }, 33)
}

animate(ctx, canvas)