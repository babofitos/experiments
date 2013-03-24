var canvas = document.getElementById('canvas')
  , ctx = canvas.getContext('2d')
  , shapes = []

for (var i = 0; i < 10; i++) {
  var x = Math.random()*250
    , y = Math.random()*250
    , width = height = Math.random()*50

  shapes.push(new Shape(x, y, width, height))
}

function Shape(x, y, width, height) {
  this.x = x
  this.y = y
  this.width = width
  this.height = height
}

function animate(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (var i = 0; i < shapes.length; i++) {
    var tmpshape = shapes[i]
    tmpshape.x++
    ctx.fillRect(tmpshape.x, tmpshape.y, tmpshape.width, tmpshape.height)
  }
  setTimeout(function() {
    animate(ctx, canvas)
  }, 33)
}

animate(ctx, canvas)