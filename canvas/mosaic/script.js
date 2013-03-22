var canvas = document.getElementById('canvas')
  , context = canvas.getContext('2d')
  , imageData = context.createImageData(400, 400)
  , pixels = imageData.data

function static () {
  for (var i=0;i<pixels.length;i++) {
    pixels[i*4] = Math.floor(Math.random()*255) //r
    pixels[i*4+1] = Math.floor(Math.random()*255) //g
    pixels[i*4+2] = Math.floor(Math.random()*255) //b
    pixels[i*4+3] = 255 //alpha
  }
  context.putImageData(imageData, 0, 0)
}

window.setInterval(static, 200)
