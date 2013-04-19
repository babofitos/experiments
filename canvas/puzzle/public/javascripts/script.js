var canvas = document.getElementById('canvas')
  , ctx = canvas.getContext('2d')
  , img = document.createElement('image')

img.src = 'images/Dm_final.jpg'
img.onload = function(e) {
  canvasApp(ctx, img, canvas)
}

function randomizeBoard(board) {
  var newBoard = []
    , cols = board.length
    , rows = board[0].length
    , randomCol
    , randomRow
    , found = false

  for (var i=0;i<cols;i++) {
    newBoard[i] = []
    for (var j=0;j<rows;j++) {
      while (!found) {
        randomCol = Math.floor(Math.random()*cols)
        randomRow = Math.floor(Math.random()*rows)

        if (board[randomCol][randomRow] !== false) {
          newBoard[i][j] = board[randomCol][randomRow]
          found = true
          board[randomCol][randomRow] = false
        }
      }
      found = false
    }
  }
  return newBoard
}

function canvasApp(ctx, img, canvas) {
  var padX = 10
    , padY = 10
    , row = 4
    , col = 3
    , partWidth = img.width/col
    , partHeight = img.height/row
    , board = []
    , startXOffset = 10
    , startYOffset = 10

  function draw(ctx, img, canvas, board) {
    var srcX
      , srcY
      , srcW = partWidth
      , srcH = partHeight
      , destX
      , destY
      , destW = partWidth
      , destH = partHeight
      , tmpPiece


    //background
    ctx.fillStyle = '#303030'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    //border
    ctx.strokeStyle = '#FFFFFF'; 
    ctx.strokeRect(5,  5, canvas.width-10, canvas.height-10)

    for (var i=0;i<col;i++) {
      for (var j=0;j<row;j++) {
        tmpPiece = board[i][j]
        srcX = tmpPiece.finalCol*partWidth
        srcY = tmpPiece.finalRow*partHeight
        destX = partWidth*i+i*padX+startXOffset
        destY = partHeight*j+j*padY+startYOffset
        ctx.drawImage(img, srcX, srcY, srcW, srcH, destX, destY, destW, destH)

        if (tmpPiece.selected) {
          ctx.strokeStyle = 'yellow'
          ctx.strokeRect(destX, destY, partWidth, partHeight)
        }
      }
    }
  }

  function eventMouseUp(event) {
    var mouseX
      , mouseY
      , pieceX
      , pieceY
      , cols = board.length
      , rows = board[0].length
      , selectedList = []

    if ( event.layerX ||  event.layerX == 0) { // Firefox
        mouseX = event.layerX 
        mouseY = event.layerY
      } else if (event.offsetX || event.offsetX == 0) { // Opera
        mouseX = event.offsetX
        mouseY = event.offsetY
      }

    for (var c = 0; c < cols; c++) {
      for (var r =0; r < rows; r++) {
         pieceX = c*partWidth+c*padX+startXOffset
         pieceY = r*partHeight+r*padY+startYOffset
         if ( (mouseY >= pieceY) && (mouseY <= pieceY+partHeight) && (mouseX >= pieceX) && (mouseX <= pieceX+partWidth) ) {
           
           if ( board[c][r].selected) {
              board[c][r].selected = false
           } else {
              board[c][r].selected = true
           }
         }
         if (board[c][r].selected) {
            selectedList.push({ col:c
                              , row:r
                              })
         }
      
      }       
      
    }
    if (selectedList.length == 2) {
      var selected1 = selectedList[0]
      var selected2 = selectedList[1]
      var tempPiece1 = board[selected1.col][selected1.row]
      board[selected1.col][selected1.row] =  board[selected2.col][selected2.row]
      board[selected2.col][selected2.row] = tempPiece1
      board[selected1.col][selected1.row].selected = false
      board[selected2.col][selected2.row].selected = false
    }
  }

  //init board
  for (var i=0;i<col;i++) {
    board[i] = []
    for (var j=0;j<row;j++) {
      board[i][j] = { finalCol: i
                    , finalRow: j
                    , selected: false
                    }
    }
  }

  board = randomizeBoard(board)
  draw(ctx, img, canvas, board)
  canvas.addEventListener('mouseup', eventMouseUp, false)
  setInterval(function() {
    draw(ctx, img, canvas, board)
  }, 33)
}