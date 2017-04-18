function getMyShips(ships) {
  return ships.filter(entity => entity.owner === 1);
}

function getEnnemyShips(ships) {
  return ships.filter(entity => entity.owner === 0);
}

function distanceBeetween(itemA, itemB) {
  return Math.abs(itemA.x - itemB.x) + Math.abs(itemA.y - itemB.y);
}

const orientationsMapEven = {
  0: {
    x: 1,
    y: 0
  },
  1: {
    x: 0,
    y: -1
  },
  2: {
    x: -1,
    y: -1
  },
  3: {
    x: -1,
    y: 0
  },
  4: {
    x: -1,
    y: 1
  },
  5: {
    x: 0,
    y: 1
  }
};
const orientationsMapOdd = {
  0: {
    x: 1,
    y: 0
  },
  1: {
    x: 1,
    y: -1
  },
  2: {
    x: 0,
    y: -1
  },
  3: {
    x: -1,
    y: 0
  },
  4: {
    x: 0,
    y: 1
  },
  5: {
    x: 1,
    y: 1
  }
};

function findNextPosition(ship) {
  const orientation = ship.y % 2 === 0 ?
    orientationsMapEven[ship.orientation] :
    orientationsMapOdd[ship.orientation];
  if (ship.speed <= 1) {
    return {
      x: ship.x + orientation.x * ship.speed,
      y: ship.y + orientation.y * ship.speed,
      orientation: ship.orientation,
      speed: ship.speed
    };
  }
  return findNextPosition({
    x: ship.x + orientation.x,
    y: ship.y + orientation.y,
    speed: ship.speed - 1,
    orientation: ship.orientation
  });
}

function findTarget(myShip, ennemyShip) {
  printErr('----------------------------');
  printErr('debug findTarget');
  printErr('myShip', JSON.stringify(myShip));
  printErr('ennemyShip', JSON.stringify(ennemyShip));
  printErr('----------------------------');
  if (ennemyShip.speed === 0) {
    const {x, y} = ennemyShip;
    return {x, y};
  }
  const distance = distanceBeetween(myShip, ennemyShip);
  const turnsUntilHit = 1 + Math.round(distance / 3);
  switch (turnsUntilHit) {
  case 1:
    return findNextPosition(ennemyShip);
  case 2:
    return findNextPosition(findNextPosition(ennemyShip));
  default:
    return null;
  }
}

function init() {
  const ships = [];
  const barrels = [];
  const myShipCount = parseInt(readline(), 10); // the number of remaining ships
  const entityCount = parseInt(readline(), 10); // the number of entities (e.g. ships, mines or cannonballs)
  for (let i = 0; i < entityCount; i += 1) {
    const inputs = readline().split(' ');
    const type = inputs[1];
    if (type === 'SHIP') {
      ships.push({
        id: parseInt(inputs[0], 10),
        type,
        x: parseInt(inputs[2], 10),
        y: parseInt(inputs[3], 10),
        orientation: parseInt(inputs[4], 10),
        speed: parseInt(inputs[5], 10),
        stockOfRhum: parseInt(inputs[6], 10),
        owner: parseInt(inputs[7], 10) // 1 mine, 0 ennemy
      });
    } else if (type === 'BARREL') {
      barrels.push({
        id: parseInt(inputs[0], 10),
        type,
        x: parseInt(inputs[2], 10),
        y: parseInt(inputs[3], 10),
        quantityOfRhum: parseInt(inputs[4], 10)
      });
    }
  }
  return {ships, barrels};
}
try {
  // game loop
  while (true) { //eslint-disable-line
    const {ships, barrels} = init();
    const myShips = getMyShips(ships);
    const ennemyShips = getEnnemyShips(ships);

    myShips.forEach(myShip => {

      const closestBarrels = barrels.sort((barrelA, barrelB) =>
        distanceBeetween(myShip, barrelA) - distanceBeetween(myShip, barrelB)
      );
      const closestEnnemyShip = ennemyShips.sort((ennemyShipA, ennemyShipB) =>
        distanceBeetween(myShip, ennemyShipA) - distanceBeetween(myShip, ennemyShipB)
      );
      const target = findTarget(myShip, ennemyShips[0]);
      if (
        !myShip.hasShotLastTurn &&
        distanceBeetween(myShip, ennemyShips[0]) <= 10 &&
        target
      ) {
        myShip.hasShotLastTurn = true;

        print(`FIRE ${target.x} ${target.y}`);
      } else if (closestBarrels.length) {
        myShip.hasShotLastTurn = false;
        print(`MOVE ${closestBarrels[0].x} ${closestBarrels[0].y}`);
      } else {
        myShip.hasShotLastTurn = false;
        if (Math.random() > 0.5) {
          print(`MOVE ${closestEnnemyShip[0].x} ${closestEnnemyShip[0].y}`);
        } else {
          print(`MOVE ${Math.floor(20 * Math.random())} ${Math.floor(20 * Math.random())}`);
        }
      }
      // print(`MOVE 10 10`);
    });
  }
} catch (e) {
  console.log(e);
  module.exports = {
    getMyShips,
    findTarget,
    findNextPosition
  };
}
