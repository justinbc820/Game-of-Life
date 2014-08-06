var name101 = "....OO......OO....\n\
...O.O......O.O...\n\
...O..........O...\n\
OO.O..........O.OO\n\
OO.O.O..OO..O.O.OO\n\
...O.O.O..O.O.O...\n\
...O.O.O..O.O.O...\n\
OO.O.O..OO..O.O.OO\n\
OO.O..........O.OO\n\
...O..........O...\n\
...O.O......O.O...\n\
....OO......OO...."

var Achims_p8 = ".OO......\n\
O........\n\
.O...O...\n\
.O...OO..\n\
...O.O...\n\
..OO...O.\n\
...O...O.\n\
........O\n\
......OO."




var decoder = function (string) {
  var newArr = string.split('\n').map(function(line) {
    return line.split('').map(function(character) {
      return character === "O";
    })
  })
  return newArr;
};