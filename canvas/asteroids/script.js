$(document).ready(function() {
  var canvas = $("#myCanvas")
    , context = canvas.get(0).getContext("2d")
    , canvasWidth = canvas.width()
    , canvasHeight = canvas.height()

  $(window).resize(resizeCanvas)

  function resizeCanvas() {
    canvas.attr("width", $(window).get(0).innerWidth)
    canvas.attr("height", $(window).get(0).innerHeight)
    canvasWidth = canvas.width()
    canvasHeight = canvas.height()
  }

  resizeCanvas()

  var playAnimation = true
    , startButton = $("#startAnimation")
    , stopButton = $("#stopAnimation")

  startButton.hide()
  startButton.click(function() {
    $(this).hide()
    stopButton.show()
    playAnimation = true
    animate()
  })
  stopButton.click(function() {
    $(this).hide()
    startButton.show()
    playAnimation = false
  })

  function Asteroid(x, y, radius, mass, vX, vY, aX, aY) {
    this.x = x
    this.y = y
    this.radius = radius
    this.mass = mass
    this.vX = vX
    this.vY = vY
    this.aX = aX
    this.aY = aY
  }

  var asteroids = []

  for (var i = 0; i < 10; i++) {
    var x = 20+(Math.random()*(canvasWidth-40))
      , y = 20+(Math.random()*(canvasHeight-40))
      , radius = 5+Math.random()*10
      , mass = radius/2
      , vX = Math.random()*4-2
      , vY = Math.random()*4-2
      // , aX = Math.random()*0.2-0.1
      // , aY = Math.random()*0.2-0.1
      , aX = 0
      , aY = 0


    asteroids.push(new Asteroid(x, y, radius, mass, vX, vY, aX, aY))
  }

  function reverse(asteroid) {
    if (asteroid.x - asteroid.radius < 0) {
      asteroid.x = asteroid.radius
      asteroid.vX *= -1
      asteroid.aX *= -1
    } else if (asteroid.x + asteroid.radius > canvasWidth) {
      asteroid.x = canvasWidth - asteroid.radius
      asteroid.vX *= -1
      asteroid.aX *= -1
    }

    if (asteroid.y - asteroid.radius < 0) {
      asteroid.y = asteroid.radius
      asteroid.vY *= -1
      asteroid.aY *= -1
    } else if (asteroid.y + asteroid.radius > canvasHeight) {
      asteroid.y = canvasHeight - asteroid.radius
      asteroid.vY *= -1
      asteroid.aY *= -1
    }
  }

  function limitSpeed(tmpAsteroid) {
    if (Math.abs(tmpAsteroid.vX < 10)) {
      tmpAsteroid.vX += tmpAsteroid.aX
    }
    if (Math.abs(tmpAsteroid.vY < 10)) {
      tmpAsteroid.vY += tmpAsteroid.aY
    }
  }

  function friction(tmpAsteroid) {
    if (Math.abs(tmpAsteroid.vX) > 0.1) {
      tmpAsteroid.vX *= 0.9
    } else {
      tmpAsteroid.vX = 0
    }

    if (Math.abs(tmpAsteroid.vY) > 0.1) {
      tmpAsteroid.vY *= 0.9
    } else {
      tmpAsteroid.vY = 0
    }
  }

  function animate() {
    var asteroidsLength = asteroids.length

    context.clearRect(0, 0, canvasWidth, canvasHeight)
    context.fillStyle = "rgb(255, 255, 255)"

    for (var i = 0; i < asteroidsLength; i++) {
      var tmpAsteroid = asteroids[i]

      for (var j = i+1; j < asteroidsLength; j++) {
        var tmpAsteroidB = asteroids[j]
          , dX = tmpAsteroidB.x - tmpAsteroid.x
          , dY = tmpAsteroidB.y - tmpAsteroid.y
          , distance = Math.sqrt((dX*dX)+(dY*dY))

          if (distance < tmpAsteroid.radius + tmpAsteroidB.radius) {
            var angle = Math.atan2(dY, dX)
            var sine = Math.sin(angle)
            var cosine = Math.cos(angle)
            var x = 0
            var y = 0
            var xB = dX * cosine + dY * sine
            var yB = dY * cosine - dX * sine
            var vX = tmpAsteroid.vX * cosine + tmpAsteroid.vY * sine
            var vY = tmpAsteroid.vY * cosine - tmpAsteroid.vX * sine
            var vXb = tmpAsteroidB.vX * cosine + tmpAsteroidB.vY * sine
            var vYb = tmpAsteroidB.vY * cosine - tmpAsteroidB.vX * sine
            // vX *= -1
            // vXb *= -1
            var vTotal = vX - vXb
            vX = ((tmpAsteroid.mass - tmpAsteroidB.mass) * vX + 2 * tmpAsteroidB.mass * vXb) / (tmpAsteroid.mass + tmpAsteroidB.mass)
            vXb = vTotal + vX
            xB = x + (tmpAsteroid.radius + tmpAsteroidB.radius)
            tmpAsteroid.x = tmpAsteroid.x + (x * cosine - y * sine)
            tmpAsteroid.y = tmpAsteroid.y + (y * cosine + x * sine)
            tmpAsteroidB.x = tmpAsteroid.x + (xB * cosine - yB * sine)
            tmpAsteroidB.y = tmpAsteroid.y + (yB * cosine + xB * sine)
            tmpAsteroid.vX = vX * cosine - vY * sine
            tmpAsteroid.vY = vY * cosine + vX * sine
            tmpAsteroidB.vX = vXb * cosine - vYb * sine
            tmpAsteroidB.vY = vYb * cosine + vXb * sine
          }
      }

      tmpAsteroid.x += tmpAsteroid.vX
      tmpAsteroid.y += tmpAsteroid.vY

      //speed check
      limitSpeed(tmpAsteroid)

      //friction
      // friction(tmpAsteroid)

      //reverse direction on boundary
      reverse(tmpAsteroid)

      context.beginPath()
      context.arc(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, 0, Math.PI*2, false)
      context.closePath()
      context.fill()
    }
    if (playAnimation) {
      setTimeout(animate, 33)
    }
  }
  animate()
})