function boilerPlate() {
  return 'test';
}
try {
  // game loop
  while (true) { //eslint-disable-line
    const myShipCount = parseInt(readline(), 10); // the number of remaining ships
    const entityCount = parseInt(readline(), 10); // the number of entities (e.g. ships, mines or cannonballs)
    for (let i = 0; i < entityCount; i += 1) {
      const inputs = readline().split(' ');
      const entityId = parseInt(inputs[0], 10);
      const entityType = inputs[1];
      const x = parseInt(inputs[2], 10);
      const y = parseInt(inputs[3], 10);
      const arg1 = parseInt(inputs[4], 10);
      const arg2 = parseInt(inputs[5], 10);
      const arg3 = parseInt(inputs[6], 10);
      const arg4 = parseInt(inputs[7], 10);
    }
    for (let i = 0; i < myShipCount; i += 1) {

      // Write an action using print()
      // To debug: printErr('Debug messages...');

      print('MOVE 11 10'); // Any valid action, such as "WAIT" or "MOVE x y"
    }
  }
} catch (e) {
  module.exports = {
    boilerPlate
  };
}
