/*
 * Copyright (C) 2012 David Geary. This code is from the book
 * Core HTML5 Canvas, published by Prentice-Hall in 2012.
 *
 * License:
 *
 * Permission is hereby granted, free of charge, to any person 
 * obtaining a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * The Software may not be used to create training material of any sort,
 * including courses, books, instructional videos, presentations, etc.
 * without the express written consent of David Geary.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
*/

var context = document.getElementById('canvas').getContext('2d');

function roundedRect(cornerX, cornerY, width, height, cornerRadius) {
  //must add or minus cornerradius to cornerx and cornery
  //to prevent a line being drawn from the corner to the
  //first arcTo x1,y1 tangent since in the future that
  //corner will 'disappear' because it too will be a rounded
  //corner leaving behind a visible line where the corner
  //used to be
   if (width > 0) context.moveTo(cornerX + cornerRadius, cornerY);
   else           context.moveTo(cornerX - cornerRadius, cornerY);

   context.arcTo(cornerX + width, cornerY,
                 cornerX + width, cornerY + height,
                 cornerRadius);
   //the path stops at the tangent to the last point (x0,y0) and (x2,y2)

   context.arcTo(cornerX + width, cornerY + height,
                 cornerX, cornerY + height,
                 cornerRadius);

   context.arcTo(cornerX, cornerY + height,
                 cornerX, cornerY,
                 cornerRadius);

   if (width > 0) {
      context.arcTo(cornerX, cornerY,
                    cornerX + cornerRadius, cornerY,
                    cornerRadius);
   }
   else {
      context.arcTo(cornerX, cornerY,
                    cornerX - cornerRadius, cornerY,
                    cornerRadius);
   }
}

function drawRoundedRect(strokeStyle, fillStyle, cornerX, cornerY, width, height, cornerRadius) {
   context.beginPath();

   roundedRect(cornerX, cornerY, width, height, cornerRadius);
   
   context.strokeStyle = strokeStyle;
   context.fillStyle = fillStyle;

   context.stroke();
   context.fill();
}

drawRoundedRect('blue',   'yellow',  50,  40,  100,  100, 10);
drawRoundedRect('purple', 'green',  275,  40, -100,  100, 20);
drawRoundedRect('red',    'white',  300, 140,  100, -100, 30);
drawRoundedRect('white',  'blue',   525, 140, -100, -100, 40);
