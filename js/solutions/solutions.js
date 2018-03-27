function Solutions () {

  // ------------------------------------------------------------
  //  Game Api
  // ------------------------------------------------------------
  //
  // api.move(dir <DIRS>)
  // api.getOutcomeFromOffset({x:1, y:0}) returns outcome <OUTCOMES>
  // api.getCellTypeFromOffset({x:1, y:0}) returns cellType <CELL_TYPES>
  //
  // Refer to constants.js for <data type>
  // Offset is the relative to the players position

  var intervalId;

  // Public functions

  function runSolution (index, api) {
    stopSolution(); // Just in case...

    var cameFrom;

    var timeBetweenSteps = 100;

    intervalId = setInterval(function () {
      cameFrom = tryToMove(api, cameFrom);
      if (api.getOutcomeFromOffset() === OUTCOMES.finish) {
        stopSolution();
      }
    }, timeBetweenSteps);
  }

  function stopSolution() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Private functions

  function tryToMove (api, cameFrom) {
    var surroundings = lookAtSurroundings(api);

    if (surroundings.left === OUTCOMES.finish) {
      api.move(DIRS.left);
      return;
    }

    var chosenDirection = chooseDirection(surroundings, cameFrom);

    if (chosenDirection) {
      api.move(chosenDirection);
      return OPPOSITES[chosenDirection];
    } else {
      return cameFrom;
    }
  }

  function lookAtSurroundings (api) {
    var surroundings = {};
    surroundings[DIRS.up] = api.getOutcomeFromOffset(OFFSETS.up);
    surroundings[DIRS.right] = api.getOutcomeFromOffset(OFFSETS.right);
    surroundings[DIRS.down] = api.getOutcomeFromOffset(OFFSETS.down);
    surroundings[DIRS.left] = api.getOutcomeFromOffset(OFFSETS.left);

    return surroundings;
  }

  function chooseDirection (surroundings, cameFrom) {
    if (isSafeAndNotAStepBack(DIRS.up, surroundings, cameFrom)) {
      return DIRS.up;
    } else if (isSafeAndNotAStepBack(DIRS.right, surroundings, cameFrom)) {
      return DIRS.right;
    } else if (isSafeAndNotAStepBack(DIRS.down, surroundings, cameFrom)) {
      return DIRS.down;
    } else if (isSafeAndNotAStepBack(DIRS.left, surroundings, cameFrom)) {
      return DIRS.left;
    } else {
      return null;
    }
  }

  function isNotDie (outcome) {
    return outcome !== OUTCOMES.die;
  }

  function isSafeAndNotAStepBack (direction, surroundings, cameFrom) {
    return isNotDie(surroundings[direction]) && cameFrom !== direction;
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
