const test = require('tape');
const code = require('./code');

test('getMyShip ', function (t) {
  t.plan(1);

  t.same(code.getMyShips([{
    foo: 'mine',
    owner: 1
  }, {
    foo: 'theirs',
    owner: 0
  }]), [{
    foo: 'mine',
    owner: 1
  }]);
});
