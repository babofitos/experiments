var canvas = document.getElementsByTagName('canvas')[0]
  , context = canvas.getContext('2d')

drawGrid(context, 10, 10)

function drawGrid (context, stepx, stepy) {
  context.save()

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