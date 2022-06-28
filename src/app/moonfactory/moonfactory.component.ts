import { Component, OnInit , Input, AfterViewInit} from '@angular/core';
import { gsap, TweenLite } from "gsap/all";
import { Draggable } from "gsap/Draggable";
@Component({
  selector: 'app-moonfactory',
  templateUrl: './moonfactory.component.html',
  styleUrls: ['./moonfactory.component.css']
})
export class MoonfactoryComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    var meteor = document.getElementById("meteor");
    var moon = document.getElementById("moon");
    var planet = document.getElementById("planet");
    var sun = document.getElementById("sun");

    setup(meteor, moon, planet, sun);

  }

}

var totalNumM = 0;

var filledMeteors = [];

var sunArr = [];
var moonArr = [];
var planetArr = [];


function getColCoords(numRows, newX, newY, delta) {
  var col = [];
  for(var i = 0; i < numRows; i++) {
      col.push({x : newX, y : newY + i*delta});
  }
  return col;
}

var sunCoords = getColCoords(2, 180, -200, 60);
var planetCoords = (getColCoords(5, 200, -90, 30)).concat(getColCoords(4, 230, -90, 30));
var moonCoords = getColCoords(9, 140, -15, 15);
var asteroidColCoords = getColCoords(10, 9, -160, 10).reverse();

var coordsM = getGridCoords(-101.4, -70.5, 10, 10, 10);

function fill(num, filledRects){

      if (num > 100) totalNumM = 100;
      else if (num < 0) totalNumM = 0;
      else totalNumM = num;

      var index = 0;
      filledRects.forEach(obj => {
        if (obj.on == false && index < totalNumM) {
          gsap.set(filledRects[index].el, {visibility : "visible"});
          obj.on = true;
        }
        else if (obj.on == true && index >= totalNumM) {
          gsap.set(filledRects[index].el, {visibility : "hidden"});
          obj.on = false;
        }

        index++;
      });
}

function getGridCoords(newX, newY, numRows, numCols, delta) {

  var coords = [];

  for (var i = 0; i < numRows; i++) {
    for (var j = 0; j < numCols; j++) {
      coords.push({x : newX + j * delta, y : newY + i * -delta});
    }
  }

  return coords
}

function setup(meteor, moon, planet, sun) {
    // ARROWS ///////////////////
    const up = document.getElementById("up");
    const down = document.getElementById("down");
    const left = document.getElementById("left");
    const right = document.getElementById("right");

    up.addEventListener('click', function(){fill(totalNumM + 10, filledMeteors)});
    down.addEventListener('click', function(){fill(totalNumM - 10, filledMeteors)});
    left.addEventListener('click', function(){fill(totalNumM - 1, filledMeteors)});
    right.addEventListener('click', function(){fill(totalNumM + 1, filledMeteors)});


    const start = document.getElementById("startBtn");
    start.addEventListener('click', function() {play(meteor, moon, planet, sun)});

    const clearBtn = document.getElementById("clearBtn");
    clearBtn.addEventListener('click', function() {clear()});

    // BLOCKS //////////////////
    const blankMeteor = document.getElementById("blank-meteor-0");
    const layer = document.getElementById("layer1");

    var blankMeteors = [];

    //meteors///////////////////
    var index = 0;
    coordsM.forEach(c => {
        var temp = blankMeteor.cloneNode(true);
        gsap.set(temp, {x : c.x, y : c.y});
        blankMeteors.push({el : temp, num : index});
        layer.appendChild(temp);

        index++;
    });

    blankMeteors.forEach(obj => {
        (obj.el).addEventListener('click', function() {
          fill(obj.num + 1, filledMeteors);
        });
    }); 

    index = 0;
    coordsM.forEach(c => {
      var temp = meteor.cloneNode(true);
      gsap.set(temp, {x : c.x - 9.13, y : c.y - 0.2, visibility : "hidden"});
      filledMeteors.push({el : temp, num : index, on : false});
      layer.appendChild(temp);
      index++;
  });

  filledMeteors.forEach(obj => {
    (obj.el).addEventListener('click', function() {
      fill(obj.num + 1, filledMeteors);
    });
}); 
    
}

function play(meteor, moon, planet, sun) {
  var tl = gsap.timeline({paused : true});
  const layer = document.getElementById("layer1");
  const layer0 = document.getElementById("layer3");

  var meteorArr = [];

  for(var i = 0; i < totalNumM; i++) {
    var temp = meteor.cloneNode(true);
    gsap.set(temp, {x : coordsM[i].x - 9.13, y : coordsM[i].y - 0.2});
    meteorArr.push(temp);
    layer.appendChild(temp);

    gsap.set(filledMeteors[i].el, {visibility : "hidden"});
    filledMeteors[i].on = false;
  }

  var numSuns = Math.floor(totalNumM / 100);
  totalNumM -= numSuns*100;

  var numPlanets = Math.floor(totalNumM / 10);
  totalNumM -= numPlanets*10;

  var numMoons = totalNumM;

  //console.log(numSuns, numPlanets, numMoons);

  var moonIndex = 0;

  var meteorPortalX = 40;
  var meteorPortalY = -115;

  var planetPortalX = 142;
  var planetPortalY = -40;

  tl.to(meteor, {duration : 1});

  if (numSuns > 0) {
    for(var i = 0; i < numSuns; i++) {
        for (var j = 0; j < 100; j++) {
            tl.to(meteorArr[moonIndex], {x : meteorPortalX, y : meteorPortalY, scale : 0, duration : 1.5}, "<+=0" );
            moonIndex++;
        }

        var tempSun = sun.cloneNode(true);
        gsap.set(tempSun, {x : 50, y : -160, scale : 0});
        layer0.appendChild(tempSun);
        sunArr.push(tempSun);

        tl.to(tempSun, {duration : 0.25});
        tl.to(tempSun, {x : sunCoords[i].x, y : sunCoords[i].y, scale : 4, duration : 1}); //SCALE 1 NOT WORKING
        tl.to(tempSun, {duration : 0.25});
    }
  }

  if (numPlanets > 0) {
    for (var i = 0; i < numPlanets; i++) {
        for (var j = 0; j < 10; j++) {
          tl.to(meteorArr[moonIndex], {x : asteroidColCoords[j].x, y : asteroidColCoords[j].y, duration : 1}, "<+=0" );
          moonIndex++;
        }

        moonIndex -= 10;
        tl.to(meteor, {duration : 0.001});

        for(var j = 0; j < 10; j++){
          tl.to(meteorArr[moonIndex], {x : meteorPortalX, y : meteorPortalY, scale : 0, duration : 1.5}, "<+=0.15" );
          moonIndex++;
        }

      var tempPlanet = planet.cloneNode(true);
      gsap.set(tempPlanet, {x : planetPortalX, y : planetPortalY, scale : 0});
      layer0.appendChild(tempPlanet);
      planetArr.push(tempPlanet);

      tl.to(tempPlanet, {duration : 0.25});
      tl.to(tempPlanet, {x : planetCoords[i].x, y : planetCoords[i].y, scale : 0.8, duration : 1}); //SCALE 1 NOT WORKING
      tl.to(tempPlanet, {duration : 0.25});
    }

  }

  if (numMoons > 0) {
    for (var i = 0; i < numMoons; i++) {
            tl.to(meteorArr[moonIndex], {x : meteorPortalX - 20, y : meteorPortalY, duration : 1}, "<+=0" ); 
            tl.to(meteorArr[moonIndex], {x : meteorPortalX, y : meteorPortalY + 3, scale : 0, duration : 0.5});
            moonIndex++;

        var tempMoon = moon.cloneNode(true);
        gsap.set(tempMoon, {x : 115, y : 14, scale : 0});
        
        layer0.appendChild(tempMoon);
        moonArr.push(tempMoon);

        tl.to(tempMoon, {duration : 0.25});
        tl.to(tempMoon, {x : moonCoords[i].x, y : moonCoords[i].y, scale : 0.55, duration : 1}); //SCALE 1 NOT WORKING
        tl.to(tempMoon, {duration : 0.25});
    }

}


  tl.play();

  totalNumM = 0;

  gsap.registerPlugin(Draggable);

  sunArr.forEach(el => {
    Draggable.create(el);
  })

  planetArr.forEach(el => {
    Draggable.create(el);
  })

  moonArr.forEach(el => {
    Draggable.create(el);
  })
}

function clear() {
  sunArr.forEach(el => {
    el.remove();
  })

  planetArr.forEach(el => {
    el.remove();
  })

  moonArr.forEach(el => {
    el.remove();
  })
}
