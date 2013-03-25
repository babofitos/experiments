var canvas = document.getElementById('canvas')
  , ctx = canvas.getContext('2d')

function Shape(x, y, width, height) {
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.reverseX = false
  this.reverseY = false
}


var square = new Shape(0, 50, 10, 10)

function move(shape) {
  if (shape.reverseX) {
    shape.x--
  } else {
    shape.x++
  }

  if (shape.reverseY) {
    shape.y--
  } else {
    shape.y++
  }
}

function isEdge(shape) {
  if (shape.x < 0) {
    shape.reverseX = false
  } else if ((shape.x + shape.width) > canvas.width) {
    shape.reverseX = true
  }
  if (shape.y < 0) {
    shape.reverseY = false
  } else if ((shape.y + shape.height) > canvas.height) {
    shape.reverseY = true
  }
}

function animate(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  move(square)
  ctx.fillRect(square.x, square.y, square.width, square.height)
  isEdge(square)
  window.setTimeout(function() {
    animate(ctx, canvas)
  }, 33)
}

animate(ctx, canvas)