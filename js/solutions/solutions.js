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

  function isNotDie (outcome) {
    return outcome !== OUTCOMES.die;
  }

  function tryToMove (api, backTrack) {
    var surroundings = {
      up: api.getOutcomeFromOffset(OFFSETS.up),
      right: api.getOutcomeFromOffset(OFFSETS.right),
      down: api.getOutcomeFromOffset(OFFSETS.down),
      left: api.getOutcomeFromOffset(OFFSETS.left),
    };

    if (surroundings.left === OUTCOMES.finish) {
      api.move(DIRS.left);
      return DIRS.right;
    }

    var movesThatDontResultInDeath = {
      up: isNotDie(surroundings.up),
      right: isNotDie(surroundings.right),
      down: isNotDie(surroundings.down),
      left: isNotDie(surroundings.left),
    };

    if (movesThatDontResultInDeath.up && backTrack !== DIRS.up) {
      api.move(DIRS.up);
      return DIRS.down;
    } else if (movesThatDontResultInDeath.right && backTrack !== DIRS.right) {
      api.move(DIRS.right);
      return DIRS.left;
    } else if (movesThatDontResultInDeath.down && backTrack !== DIRS.down) {
      api.move(DIRS.down);
      return DIRS.up;
    } else if (movesThatDontResultInDeath.left && backTrack !== DIRS.left) {
      api.move(DIRS.left);
      return DIRS.right;
    }
  }

  function runSolution (index, api) {
    var backTrack;
    var intervalId = setInterval(function () {
      backTrack = tryToMove(api, backTrack);

      if (api.getOutcomeFromOffset() === OUTCOMES.finish) {
        clearInterval(intervalId);
      }
    }, 100);
  }

  function stopSolution() {
  }

  return {
    runSolution: runSolution,
    stopSolution: stopSolution
  }
}
