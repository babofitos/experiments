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

//a rect. the radius and angle is for its rotation, not the shape of the shape
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
    //since the coords of the center of the orbit do not start at (0,0), 
    //we must add the center to the adjacent or opposite side for x and y
    //respectively
    
    //convert the angle into radians and get the cos, 
    //then multiply it by the hypotenuse
    //(radius) to get the adjacent side (x)
      , x = tmpshape.x + tmpshape.radius*(Math.cos(tmpshape.angle*(Math.PI/180)))
    //convert the angle into radians and get the sin, 
    //then multiply it by the hypotenuse
    //(radius) to get the opposite side (y)
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