var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('data.txt');

var data = [];
var defaults = [];

var maxValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

lr.on('error', function (err) {
	// 'err' contains error object
  console.log(err);
});

var count = 0;

lr.on('line', function (line) {

  // console.log(count);

	// 'line' contains the current line without the trailing newline character.

  var result = line.split(' ').map(Number);

  for (var i = 0; i < maxValues.length; i++) {

    if (maxValues[i] < result[i]) {

      maxValues[i] = result[i];

    }
  }
