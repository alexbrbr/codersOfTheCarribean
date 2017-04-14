const test = require('tape');
const code = require('./code');

test('boilerplate', function (t) {
  t.plan(1);

  t.equal(code.boilerPlate(), 'test');
});
