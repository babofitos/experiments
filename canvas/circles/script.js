var canvas = document.getElementById('canvas')
  , ctx = canvas.getContext('2d')
  , shapes = []

for (var i = 0; i < 10; i++) {
  //center of circle
  var x = Math.random()*250
    , y = Math.random()*250
  //size of shape
    , width = height = Math.random()*50

  shapes.push(new Shape(x, y, width, height))
}

function Shape(x, y, width, height) {
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.radius = Math.random()*30
  this.angle = 0
}

function animate(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (var i = 0; i < shapes.length; i++) {
    var tmpshape = shapes[i]
      , x = tmpshape.x + tmpshape.radius*(Math.cos(tmpshape.angle*(Math.PI/180)))
      , y = tmpshape.y + tmpshape.radius*(Math.sin(tmpshape.angle*(Math.PI/180)))

    //increase angle for rotation
    tmpshape.angle += 5
    //reset after full rotation
    if (tmpshape.angle > 360) {
      tmpshape.angle = 0
    }

    ctx.fillRect(x, y, tmpshape.width, tmpshape.height)
  }
  setTimeout(function() {
    animate(ctx, canvas)
  }, 33)
}

animate(ctx, canvas)