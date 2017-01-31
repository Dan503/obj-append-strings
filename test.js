
var appendStrings = require('./index.js');

function testFunction(settings){

  settings = appendStrings(settings, {
    setting_1: ' c',
    setting_2: ' d',
  });

  return settings;
}

var test = testFunction({
  setting_1: 'a',
  setting_2: 'b',
});

console.log(test);

//test = { setting_1 : 'a c', setting_2 : 'b d' }