var canvas = document.getElementById('canvas')
  , ctx = canvas.getContext('2d')
  , shapes = []

shapes.push(new Shape(50, 50))
shapes.push(new Shape(100, 100))
shapes.push(new Shape(150, 150))

function Shape(x, y) {
  this.x = x
  this.y = y
}

function animate(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (var i = 0; i < shapes.length; i++) {
    var tmpshape = shapes[i]
    tmpshape.x++
    ctx.fillRect(tmpshape.x, tmpshape.y, 10, 10)
  }
  setTimeout(function() {
    animate(ctx, canvas)
  }, 33)
}

animate(ctx, canvas)