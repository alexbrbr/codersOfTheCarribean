function getMyShips(ships) {
  return ships.filter(entity => entity.owner === 1);
}

function getEnnemyShips(ships) {
  return ships.filter(entity => entity.owner === 0);
}

function distanceBeetween(itemA, itemB) {
  return Math.abs(itemA.x - itemB.x) + Math.abs(itemA.y - itemB.y);
}

const ships = [];
const barrels = [];

function init() {
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
}
try {
  // game loop
  while (true) { //eslint-disable-line
    // printErr('ships:', JSON.stringify(ships));
    // printErr('barrels:', JSON.stringify(barrels));
    init();
    const myShips = getMyShips(ships);
    const ennemyShips = getEnnemyShips(ships);
    // printErr('myShips:', JSON.stringify(myShips));

    myShips.forEach(myShip => {

      printErr('myShip:', JSON.stringify(myShip));
      printErr('myShip.hasShotLastTurn:', JSON.stringify(myShip.hasShotLastTurn));
      const closestBarrels = barrels.sort((barrelA, barrelB) =>
        distanceBeetween(myShip, barrelA) - distanceBeetween(myShip, barrelB)
      );
      const closestEnnemyShip = ennemyShips.sort((ennemyShipA, ennemyShipB) =>
        distanceBeetween(myShip, ennemyShipA) - distanceBeetween(myShip, ennemyShipB)
      );
      // printErr('ennemyShips:', JSON.stringify(ennemyShips));
      // printErr('closestEnnemyShip:', JSON.stringify(closestEnnemyShip));
      if (
        // need to take direction & speed of ennemy ship into account
        !myShip.hasShotLastTurn &&
        distanceBeetween(myShip, ennemyShips[0]) <= 10
      ) {
        myShip.hasShotLastTurn = true;
        printErr('set to true');

        print(`FIRE ${closestEnnemyShip[0].x} ${closestEnnemyShip[0].y}`);
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
    getMyShips
  };
}
