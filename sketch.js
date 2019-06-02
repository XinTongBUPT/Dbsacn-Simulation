var showLine;
var showline = true;
var showCircle;
var showcircle = true;
var epsilon, epsilonSlider, epsilonSpan, minPoints, minPointsSlider, start, reset;
var data = [];
var c = [];
var isstart = true;
var colors = ["#03A9F4", "#F8BBD0", "#FFEB3B", "#4CAF50", "#009688","#AA00FF", "#5C6BC0", "#BDBDBD", "#FFFF8D", "#795548","#F44336", "#9C27B0", "#E91E63", "#2196F3", "#8BC34A", "white"];
var colorc = 0;


function setup () {
  //creates a canvas for us to draw or display the output.
  createCanvas(windowWidth, windowHeight - 60);
  createSpan("  |  ");
  createSpan("Epsilon : ");
  epsilonSlider = createSlider(0, 400, 100);
  epsilonSlider.changed(epsilonChanged);
  epsilonSpan = createSpan(epsilonSlider.value());
  createSpan("  |  ");
  createSpan("Min Cluster Size : ");
  minPointsSlider = createSlider(0, 10, 5);
  minPointsSpan = createSpan(minPointsSlider.value());
  minPointsSlider.changed(minPointsChanged);
  createSpan("  |  ");
  showLine = createButton("Show Lines");
  showLine.mousePressed(function () {
    showline = !showline;
  });
  createSpan("  |  ");
  showCircle = createButton("Show Circle");
  showCircle.mousePressed(function () {
    showcircle = !showcircle;
  });
  // start = createButton("Start");
  // start.mousePressed(startClustering);

  // reset = createButton("Reset");
  // reset.mousePressed(resetClustering);

}

function draw () {
  epsilon = epsilonSlider.value();
  epsilonSpan.html(epsilon.toString());
  minPoints = minPointsSlider.value();
  minPointsSpan.html(minPoints.toString());

  //background color
  background(65);

  //font color
  fill(250);
  textFont('monospace');
  textSize(26);
  text("DBSCAN Clustering", 16, 45);
  textSize(20);
  text("Tap on the Screen to Insert Data Points...", 16, height - 30);
  fill(100);
  textSize(15);

  noFill();
  noStroke();
  for (var i = 0; i < data.length; i++) {
    noStroke();
    fill(color(colors[c[i]]));
    ellipse(data[i][0], data[i][1], 10, 10);
    if (showcircle) {
      noFill();
      stroke(	176,196,222);
      ellipse(data[i][0], data[i][1], epsilon, epsilon);
    }
  }
  if (isstart) {
  for (var i = 0; i < data.length; i++) {
    var temp = [];
    var mintemp = 0;
    for (var j = 0; j < data.length; j++) {
      if (distanceSquare(data[i][0], data[i][1], data[j][0], data[j][1]) <= epsilon * epsilon) {
        temp.push(j);
        mintemp++;
      }
    }
    if (mintemp >= minPoints) {

      if (c[i] == colors.length - 1) {
        c[i] = colorc;
        colorc++;
        colorc = colorc%colors.length;
      }

      for (var j = 0; j < temp.length; j++) {
        //Sets the color used to draw lines and borders around shapes.
        stroke(255);
        c[temp[j]] = c[i];
        if (showline) {
          line(data[i][0], data[i][1], data[temp[j]][0], data[temp[j]][1]);
        }
        noStroke();
      }
    }
  }
  }
  noFill();
}

// function startClustering () {
//   isstart = !isstart;

//   epsilonSlider.hide();
//   minPointsSlider.hide();
// }

function resetClustering () {

  for (var i = 0; i < data.length; i++) {
    c[i] = colors.length - 1;
  }
  isstart = !isstart;

  epsilonSlider.show();
  minPointsSlider.show();
}

function mouseClicked () {
  if (isstart) {
    data.push([mouseX, mouseY]);
    c.push(colors.length - 1);
  }
}

function distanceSquare (x1, y1, x2, y2) {
  return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
}

function epsilonChanged () {
  isstart = !isstart;
  colorc = 0;
  for (var i = 0; i < data.length; i++) {
    c[i] = colors.length - 1;
  }
  isstart = !isstart;
}

function minPointsChanged () {
  isstart = !isstart;
  colorc = 0;
  for (var i = 0; i < data.length; i++) {
    c[i] = colors.length - 1;
  }
  isstart = !isstart;
}
