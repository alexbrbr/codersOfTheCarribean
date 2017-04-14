function getMyShips(ships) {
  return ships.filter(entity => entity.owner === 1);
}

function distanceBeetween(itemA, itemB) {
  return Math.abs(itemA.x - itemB.x) + Math.abs(itemA.y - itemB.y);
}

try {
  // game loop
  while (true) { //eslint-disable-line
    const myShipCount = parseInt(readline(), 10); // the number of remaining ships
    const entityCount = parseInt(readline(), 10); // the number of entities (e.g. ships, mines or cannonballs)
    const ships = [];
    const barrels = [];
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
    printErr('ships:', JSON.stringify(ships));
    printErr('barrels:', JSON.stringify(barrels));
    const myShips = getMyShips(ships);
    printErr('myShips:', JSON.stringify(myShips));

    myShips.forEach(myShip => {
      print(`MOVE ${barrels[0].x} ${barrels[0].y}`);
      // print(`MOVE 10 10`);
    });
  }
} catch (e) {
  console.log(e);
  module.exports = {
    getMyShips
  };
}
