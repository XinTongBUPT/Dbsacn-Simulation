var showLine;
var showline = true;
var showCircle;
var showcircle = true;
var epsilon, epsilonSlider, epsilonSpan, minPoints, minPointsSlider, start, reset;
var data = [];
var c = [];
var isstart = true;
var colors = ["rgb(3,169,244)", "rgb(248,187,208)","rgb(255,215,0)", "rgb(76,175,80)","rgb(170,0,255)","rgb(244,67,54)","rgb(0,0,255)","rgb(0,255,0)","rgb(255,0,0)","rgb(0,255,255)","rgb(128,128,360)","rgb(121,85,72)","rgb(65,105,225)","rgb(255,0,255)","rgb(255,255,255)" ];
var colorc = 0;
var newColor;




function setup () {
  //creates a canvas for us to draw or display the output.
  createCanvas(windowWidth-60, windowHeight - 60);
  createSpan("  |  ");
  createSpan("Epsilon : ");
  epsilonSlider = createSlider(0, 300, 90);
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
  showCircle = createButton("Show Fill");
  showCircle.mousePressed(function () {
    showcircle = !showcircle;
  });
  start = createButton("Start");
  start.mousePressed(startClustering);

  clear = createButton("Clear");
  clear.mousePressed(clearCluster);

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
    fill(color(colors.length-1));
    ellipse(data[i][0], data[i][1], 10, 10);
    noFill();
    stroke('rgba(255,255,255,0.1)');
    ellipse(data[i][0], data[i][1], epsilon, epsilon);
  }

  for (var i = 0; i < data.length; i++) {
    noStroke();
    newColor = colors[c[i]].substring(4,colors[c[i]].length-1);
    // console.log(newColor);
    fill(color(colors[c[i]]));
    ellipse(data[i][0], data[i][1], 10, 10);
    
    if (showcircle && newColor!='255,255,255') {
      // var millisecond = millis();
      fill('rgba('+newColor+',0.15)');
      // stroke('rgba('+newColor+',0.1)');
      noStroke
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
            stroke(	'rgba(255,255,255,0.3)');
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

function startClustering () {
  data = [];
  c = [];
  // isstart = !isstart;
  // epsilonSlider.hide();
  // minPointsSlider.hide();
  for(var i = 0; i < 100; ++i){
    var temp = [Math.random()*(windowWidth-20)+50,Math.random()*(windowHeight - 150)+50];
    data[i]=temp;
    c.push(colors.length - 1);
  }
  draw ();
}

function clearCluster () {
  data = [];
  c = [];
  // epsilonSlider.show();
  // minPointsSlider.show();
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
