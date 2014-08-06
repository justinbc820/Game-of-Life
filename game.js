function GameOfLife(width,height) {
  this.width = width;
  this.height = height;
}

GameOfLife.prototype.createAndShowBoard = function () {
  // create <table> element
  var goltable = document.createElement("tbody");

  // build Table HTML
  var tablehtml = '';
  for (var h=0; h<this.height; h++) {
    tablehtml += "<tr id='row+" + h + "'>";
    for (var w=0; w<this.width; w++) {
      tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
    }
    tablehtml += "</tr>";
  }
  goltable.innerHTML = tablehtml;

  // add table to the #board element
  var board = document.getElementById('board');
  board.appendChild(goltable);

  // once html elements are added to the page, attach events to them
  this.setupBoardEvents();
};

GameOfLife.prototype.setupBoardEvents = function() {
  // each board cell has an CSS id in the format of: "x-y"
  // where x is the x-coordinate and y the y-coordinate
  // use this fact to loop through all the ids and assign
  // them "on-click" events that allow a user to click on
  // cells to setup the initial state of the game
  // before clicking "Step" or "Auto-Play"

  // clicking on a cell should toggle the cell between "alive" & "dead"
  // for ex: an "alive" cell be colored "blue", a dead cell could stay white

  // EXAMPLE FOR ONE CELL
  // Here is how we would catch a click event on just the 0-0 cell
  // You need to add the click event on EVERY cell on the board

  var onCellClick = function (e) {
    // coordinates of cell, in case you need them
    var coord_array = this.id.split('-');
    var coord_hash = {x: coord_array[0], y: coord_array[1]};

    // how to set the style of the cell when it's clicked
    if (this.getAttribute('data-status') == 'dead') {
      this.className = "alive";
      this.setAttribute('data-status', 'alive');
    } else {
      this.className = "dead";
      this.setAttribute('data-status', 'dead');
    }
  };

  for (var h = 0; h < this.height; h++) {
    for (var w = 0; w < this.width; w++) {
      var str = w + "-" + h;
      var currentCell = document.getElementById(str);
      currentCell.onclick = onCellClick;
    };
  };

  this.setupButtons();
};

GameOfLife.prototype.setupButtons = function() {
  var that = this;
  var onStepClick = function(e) {
    that.step();
  };

  var stepButton = document.getElementById('stepButton');
  stepButton.onclick = onStepClick;

  var interval;
  var onAutoPlayClick = function(e) {
    onPauseClick();
    interval = setInterval(function() {
      that.step();
    }, 200);

    interval();
  };

  var autoPlay = document.getElementById('autoPlay');
  autoPlay.onclick = onAutoPlayClick;

  var onPauseClick = function(e) {
    clearInterval(interval);
  }

  var pause = document.getElementById('pause');
  pause.onclick = onPauseClick;

  var onResetRandom = function(e) {
    that.resetRandomButton();
  }

  var rRandom = document.getElementById('resetRandom');
  rRandom.onclick = onResetRandom;

}

GameOfLife.prototype.step = function () {
  // Here is where you want to loop through all the cells
  // on the board and determine, based on it's neighbors,
  // whether the cell should be dead or alive in the next
  // evolution of the game
  var outerArray = [];
  for (var h = 0; h < this.height; h++) {
    var innerArray = [];
    for (var w = 0; w < this.width; w++) {
      var str = w + "-" + h;
      var currentCell = document.getElementById(str);
      var aliveCount = 0;
      var alive = false;

      if (currentCell.getAttribute('data-status') == 'alive') {
        aliveCount--;
        alive = true;
      };

      for (var cellH = h-1; cellH <= h + 1; cellH++) {
        for (var cellW = w-1; cellW <= w + 1; cellW++) {
          var cellStr = cellW + "-" + cellH;
          var scanCell = document.getElementById(cellStr);
          if (scanCell !== null && scanCell.getAttribute('data-status') == 'alive') {
            aliveCount++;
          }
        };
      };
      if (alive === false) {
        if(aliveCount === 3) {
          innerArray.push(true);
        } else {
          innerArray.push(false);
        }
      } else {
        if(aliveCount > 3 || aliveCount < 2) {
          innerArray.push(false);
        } else {
          innerArray.push(true);
        }
      }
    };
    outerArray.push(innerArray);
  };
  this.arrayReader(outerArray);
};

GameOfLife.prototype.arrayReader = function (array) {
  debugger;
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array[i].length; j++) {
      var str = i + "-" + j;
      var currentCell = document.getElementById(str);
      if (array[j][i] == true) {
        currentCell.className = 'alive';
        currentCell.setAttribute('data-status', 'alive');
      } else {
        currentCell.className = 'dead';
        currentCell.setAttribute('data-status', 'dead');
      }
    };
  };
}

GameOfLife.prototype.resetRandomButton = function() {
    this.arrayReader(decoder(name101));
}

var gol = new GameOfLife(20,20);
gol.createAndShowBoard();
