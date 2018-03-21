class Runner {
  constructor(api, moves) {
    this.nextMove;
    this.api = api;
    this.moves = moves;
    this.speed = 10;
  }

  async walk() {
    this.refreshNextMove();

    const nextOutcome = this.api.getOutcomeFromOffset(DIR_OFFSET[this.nextMove]);
    if (this.nextMove && nextOutcome !== OUTCOMES.die) {
      this.api.move(this.nextMove);
      this.nextMove = null;
    }

    const currentCell = this.api.getCellTypeFromOffset({ x: 0, y: 0 });
    if (currentCell === CELL_TYPES.disappearing) {
      this.nextMove = null;
      this.refreshNextMove();
      this.api.move(this.nextMove);
      this.nextMove = null;
    }

    const currentOutcome = this.api.getOutcomeFromOffset({ x: 0, y: 0 });
    if (currentOutcome === OUTCOMES.finish || currentOutcome === OUTCOMES.die) return;

    await Utility.wait(this.speed);
    await this.walk(this.api);
  }

  refreshNextMove() {
    this.nextMove = !this.nextMove ? this.moves.shift() : this.nextMove;
  }
}
