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
  //save the loan result
  defaults.push([result[14]]);

  result.pop();

  data.push(result);

  count++;

});

lr.on('end', function () {

	// All lines are read, file is closed now.

  var testCases = [];



  //normalize
  for (var i = 0; i < data.length; i++) {

    var row = data[i];

    for (var j = 0; j < row.length; j++) {
      row[j] = row[j] / maxValues[j];
    }

    data[i] = {input: data[i], output: defaults[i]};

  }
  //pull out some test data
  for (var k = 100; k > 0; k--) {
    testCases.push(data.pop());
  }
