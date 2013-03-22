var canvas = document.getElementsByTagName('canvas')[0]
  , context = canvas.getContext('2d')
  , coords = document.getElementById('display-coords')



function drawGrid (context, stepx, stepy) {
  context.save()

  context.clearRect(0,0,canvas.width,canvas.height);
  context.lineWidth = .5
  context.strokeStyle = 'lightgray'

  for (var i=stepx+.5;i<canvas.width;i+=stepx) {
    context.beginPath()
    context.moveTo(i, 0)
    context.lineTo(i, canvas.height)
    context.stroke()
    context.closePath()
  }

  for (var j=stepy+.5;j<canvas.height;j+=stepy) {
    context.beginPath()
    context.moveTo(0, j)
    context.lineTo(canvas.width, j)
    context.stroke()
    context.closePath()
  }
  context.restore()
}

function getCoords (canvas, x, y) {
  var cbound = canvas.getBoundingClientRect()

  //boundingClientRect gets the canvas (not context) values
  //multiply to get scaled coords
    , scaledX = x-cbound.left*(canvas.width/cbound.width)
    , scaledY = y-cbound.top*(canvas.height/cbound.height)

  return {x: scaledX, y: scaledY}
  
}

function displayCoords (x, y) {
  var hud = coords

  hud.innerHTML = x.toFixed(0) + ', ' + y.toFixed(0)
}

function drawHorizontalLine (y) {
  context.beginPath()
  context.moveTo(0, y+0.5)
  context.lineTo(canvas.width, y+0.5)
  context.stroke()
}

function drawVerticalLine (x) {
  context.beginPath()
  context.moveTo(x+0.5, 0)
  context.lineTo(x+0.5, canvas.height)
  context.stroke()
}

function drawGuideLines (x, y) {
  drawHorizontalLine(y)
  drawVerticalLine(x)
}

drawGrid(context, 10, 10)

canvas.addEventListener('mousemove', function(e) {
  //pass canvas and mouse coords
  var mouseloc = getCoords(canvas, e.clientX, e.clientY)

  displayCoords(mouseloc.x, mouseloc.y)
  //if drawgrid is not called the old guidelines will stack up on the context...
  drawGrid(context, 10, 10)
  drawGuideLines(mouseloc.x, mouseloc.y)
})
