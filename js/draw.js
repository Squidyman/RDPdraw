var mousePressed = false;
var lastX, lastY;
var ctx;
const PointsList = [[],[]];
var mouseState = {mouseState: false, iterator: 0, iterator2: 0};

function InitThis() {
  ctx = document.getElementById('myCanvas').getContext("2d");

  $('#myCanvas').mousedown(function(e) {
    mousePressed = true;
    Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    // Save(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
  });

  $('#myCanvas').mousemove(function(e) {
    if (mousePressed) {
      Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
      Save(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
    }
  });

  $('#myCanvas').mouseup(function(e) {
    mousePressed = false;
    Save(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    iterator();
  });
  $('#myCanvas').mouseleave(function(e) {
    mousePressed = false;
  });
}

function iterator() {
  mouseState.iterator++;
  console.log(mouseState.iterator);
  mouseState.Iterator2 = 0;
}

function Save(x, y, isDown) {
  if (isDown) {
     // console.log("down");
     PointsList[mouseState.iterator][mouseState.Iterator2] = ({x_val: x, y_val: y, color: $('#selColor').val(), lineWidth: $('#selWidth').val()});
    mouseState.mouseState = true;
    mouseState.Iterator2++;
  }
}

function Draw(x, y, isDown) {
  if (isDown) {
    ctx.beginPath();
    ctx.strokeStyle = $('#selColor').val();
    ctx.lineWidth = $('#selWidth').val();
    ctx.lineJoin = "round";
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
  }
  lastX = x;
  lastY = y;
}

function clearArea() {
  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (i = 0; i < PointsList.length; i++) {
    console.log("new");
    for (j = 0; j < PointsList[i].length; j++) {
      console.log(PointsList[i][j].x_val, PointsList[i][j].y_val, PointsList[i][j].color, PointsList[i][j].lineWidth);
    }
  }
  PointsList.length = 0;
}