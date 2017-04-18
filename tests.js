const test = require('tape');
const code = require('./code');

test('getMyShip should filter my ships', function (t) {
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
test('findTarget at no speed', function (t) {
  t.plan(1);
  const myShip = {
    x: 1,
    y: 2
  };
  const ennemyShip = {
    x: 1,
    y: 4,
    speed: 0
  };
  const calculatedTarget = code.findTarget(myShip, ennemyShip);
  t.same(calculatedTarget, {
    x: 1,
    y: 4
  });
});
test('findTarget at speed 1', function (t) {
  t.plan(1);
  const myShip = {
    x: 1,
    y: 2
  };
  const ennemyShip = {
    x: 3,
    y: 2,
    speed: 1,
    direction: 2
  };
  const calculatedTarget = code.findTarget(myShip, ennemyShip);
  t.same(calculatedTarget, {
    x: 2,
    y: 0,
    speed: 1,
    direction: 2
  });
});
test('findNextPosition should return next position of ship for horizontal movement', function (t) {
  t.plan(1);
  const ship = {
    x: 1,
    y: 2,
    speed: 2,
    direction: 0
  };

  const calculatedNextPosition = code.findNextPosition(ship);
  t.same(calculatedNextPosition, {
    x: 3,
    y: 2,
    speed: 1,
    direction: 0
  });
});
test('findNextPosition should return next position of ship for horizontal backwards movement', function (t) {
  t.plan(1);
  const ship = {
    x: 10,
    y: 2,
    speed: 3,
    direction: 3
  };

  const calculatedNextPosition = code.findNextPosition(ship);
  t.same(calculatedNextPosition, {
    x: 7,
    y: 2,
    speed: 1,
    direction: 3
  });
});
test('findNextPosition should return next position of ship for diagonal movement at speed 1', function (t) {
  t.plan(1);
  const ship = {
    x: 5,
    y: 5,
    speed: 1,
    direction: 5
  };
  const calculatedNextPosition = code.findNextPosition(ship);
  t.same(calculatedNextPosition, {
    x: 6,
    y: 6,
    speed: 1,
    direction: 5
  });
});
test('findNextPosition should return next position of ship for diagonal movement at speed 2', function (t) {
  t.plan(1);
  const ship = {
    x: 5,
    y: 5,
    speed: 2,
    direction: 5
  };

  const calculatedNextPosition = code.findNextPosition(ship);
  t.same(calculatedNextPosition, {
    x: 6,
    y: 7,
    speed: 1,
    direction: 5
  });
});
