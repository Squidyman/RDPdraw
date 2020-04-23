var mousePressed = false;
var lastX, lastY;
var ctx;
var lineList = [];
var activeLine = -1;

var line = {
  points: [],
  color: 'blue',
  lineWidth: 9
}

function InitThis() {
  
  ctx = document.getElementById('myCanvas').getContext("2d");

  $('#myCanvas').mousedown(function(e) {
    lineList.push(JSON.parse(JSON.stringify(line)));
    activeLine++;
    mousePressed = true;
    Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
  });

  $('#myCanvas').mousemove(function(e) {
    if (mousePressed) {
      Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
    }
  });

  $('#myCanvas').mouseup(function(e) {
    mousePressed = false;
    console.log(lineList[activeLine]);
  });
  $('#myCanvas').mouseleave(function(e) {
    mousePressed = false;
  });
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
    lineList[activeLine].points.push([x, y]);
    lineList[activeLine].color = ctx.strokeStyle;
    lineList[activeLine].lineWidth = ctx.lineWidth;
  }
  lastX = x;
  lastY = y;
}

function clearArea() {
  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  lineList = [];
  activeLine = -1;
  
  for(let i = 0; i <= activeLine; i++){
    let line = lineList[i]
    
    console.log(line)
  }
  
}

function rdp(startIndex, endIndex, allPoints, rdpPoints) {
  const nextIndex = findFurthest(allPoints, startIndex, endIndex);
  if (nextIndex > 0) {
    if (startIndex != nextIndex) {
      rdp(startIndex, nextIndex, allPoints, rdpPoints);
    }
    rdpPoints.push(allPoints[nextIndex]);
    if (endIndex != nextIndex) {
      rdp(nextIndex, endIndex, allPoints, rdpPoints);
    }
  }
}

function findFurthest(points, a, b) {
  let recordDistance = -1;
  const start = points[a];
  const end = points[b];
  let furthestIndex = -1;
  for (let i = a + 1; i < b; i++) {
    const currentPoint = points[i];
    const d = lineDist(currentPoint, start, end);
    if (d > recordDistance) {
      recordDistance = d;
      furthestIndex = i;
    }
  }
  if (recordDistance > epsilon) {
    return furthestIndex;
  } else {
    return -1;
  }
}

function lineDist(c, a, b) {
  const norm = scalarProjection(c, a, b);
  return p5.Vector.dist(c, norm);
}

function scalarProjection(p, a, b) {
  const ap = p5.Vector.sub(p, a);
  const ab = p5.Vector.sub(b, a);
  ab.normalize(); // Normalize the line
  ab.mult(ap.dot(ab));
  const normalPoint = p5.Vector.add(a, ab);
  return normalPoint;
}

$('#run').on('click', function(){
//   let epsilon = 0;
// alert("Hello! I am an alert box!!");
//   allPoints = [];
//   let points = lineList[0].points; 
//   console.log(lineList);
//   for(let i = 0; i < points.length; i++){
//      allPoints.push(createVector(points[i][0], points[i][1]));
//   }
  
//     background(0);

//   const rdpPoints = [];

//   const total = allPoints.length;
//   const start = allPoints[0];
//   const end = allPoints[total - 1];
//   rdpPoints.push(start);
//   rdp(0, total - 1, allPoints, rdpPoints);
//   rdpPoints.push(end);
//   console.log(allPoints.size(), rdpPoints.length);
  
//   epsilon += 0.01;
//   if (epsilon > 100) {
//     epsilon = 0;
//   }
  
//     stroke(255, 0, 255);
//   strokeWeight(4);
//   noFill();
//   beginShape();
//   for (let v of allPoints) {
//     vertex(v.x, v.y);
//   }
//   endShape();
  
//     //translate(0, 20);
//   stroke(255);
//   strokeWeight(2);
//   beginShape();
//   for (let v of rdpPoints) {
//     vertex(v.x, v.y);
//   }
//   endShape();
//   fill(255);
//   noStroke();
//   textSize(24);
//   text('epsilon: ' + nf(epsilon, 2, 2), 20, 25);
//   text('n: ' + rdpPoints.length, 20, 50);
  
})