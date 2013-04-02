var context = document.getElementsByTagName('canvas')[0].getContext('2d')

//if same subpath between two arcs, a line will be drawn from the first
//to the second arc.
//for rects there is no connecting line if subpaths are not cleared

function drawRectsClearSubPaths() {
  context.beginPath(); // Clear all subpaths from
  // the current path
  context.rect(10, 10, 100, 100); // Add a subpath with four points
  context.stroke(); // Stroke the subpath containing
  // four points
  context.beginPath(); // Clear all subpaths from the
  // current path
  context.rect(50, 50, 100, 100); // Add a subpath with four points
  context.stroke(); // Stroke the subpath containing
  // four points
}

//all strokes apply to the current subpath. if the subpath is not cleared after
//a stroke, the next stroke will redraw all subpaths again
//e.g. the first rect will be drawn twice at the stroke call in this fn
function drawRectsSameSubPaths() {
  context.beginPath(); // Clear all subpaths from the
  // current path
  context.rect(10, 10, 100, 100); // Add a subpath with four points
  // context.stroke(); // Stroke the subpath containing
  // four points
  context.rect(150, 150, 100, 100); // Add a second subpath with
  // four points
  context.stroke(); // Stroke both subpaths
}

function drawArcsSameSubPaths() {
  context.beginPath(); 
  context.arc(50, 50, 50, 0, Math.PI*2, false); 
  context.arc(150, 150, 50, 0, Math.PI*2, false); 
  context.stroke(); 
}


