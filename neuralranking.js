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

   var brain = require('brain');

  var net = new brain.NeuralNetwork();

  net.train(data, {
    errorThresh: 0,  // error threshold to reach
    log: true,           // console.log() progress periodically
    logPeriod: 1000,       // number of iterations between logging
    learningRate: 0    // learning rate
  });

  console.log(net.toJSON().layers[0]);

  var correct = 0;
  var incorrect = 0;
  var ambiguous = 0;

  for (var i = 0; i < testCases.length; i++) {
    var output = net.run(testCases[i].input);
    // console.log('Predicted: ', output);
    // console.log('Actual: ', testCases[i].output);
    // console.log('\n');

    if ( (output[0] > 0.85 && testCases[i].output[0] === 1)
          || (output[0] < 0.15 && testCases[i].output[0] === 0) ) {
      correct++;
    } else {
      incorrect++;
    }


  }

  console.log('\n');
  console.log('586 records used for training, 100 for testing');
  console.log('Correct Default Prediction: ', correct);
  console.log('Incorrect Default Prediction: ', incorrect);

  console.log(correct + "% accurate at a 15% confidence interval");


  //now we are ready to train

});
