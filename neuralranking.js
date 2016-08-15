var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('data.txt');

var data = [];
var defaults = [];

var maxValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

lr.on('error', function (err) {
	// 'err' contains error object
  console.log(err);
});