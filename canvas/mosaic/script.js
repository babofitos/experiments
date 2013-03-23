var canvas = document.getElementById('canvas')
  , context = canvas.getContext('2d')
  , imageData = context.createImageData(400, 400)
  , pixels = imageData.data

function static (context, pixels, imageData) {
  for (var i=0;i<pixels.length;i++) {
    pixels[i*4] = Math.floor(Math.random()*255) //r
    pixels[i*4+1] = Math.floor(Math.random()*255) //g
    pixels[i*4+2] = Math.floor(Math.random()*255) //b
    pixels[i*4+3] = 255 //alpha
  }
  context.putImageData(imageData, 0, 0)
}

// window.setInterval(function(context, pixels, imageData) {
//   static(context,pixels,imageData)
// }, 200)

function mosaic (context, pixels, imageData, row, col) {
  var tileHeight = imageData.height/col
    , tileWidth = imageData.width/row
    , totalTiles = col*row
    , tileArea = tileWidth*tileHeight

  for (var r=0;r<row;r++) { //row
    for (var c=0;c<col;c++) { //column
      var red = Math.floor(Math.random()*255)
        , green = Math.floor(Math.random()*255)
        , blue = Math.floor(Math.random()*255)

      for (var tiler=0;tiler<tileHeight;tiler++) { //tile row
        for (var tilec=0;tilec<tileWidth;tilec++) { //tile col
          var trueX = (c*tileWidth)+tilec
            , trueY = (r*tileHeight)+tiler
            , pos = (trueY*(imageData.width*4))+(trueX*4)

          pixels[pos] = red
          pixels[pos+1] = green
          pixels[pos+2] = blue
          pixels[pos+3] = 255
        }
      }
    }
  }
  context.putImageData(imageData, 0, 0)
}

mosaic(context, pixels, imageData, 4, 4)