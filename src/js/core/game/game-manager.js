const { HumanPlayer } = require("../players/human.js");
const { BotPlayer } = require("../players/bot.js");
const { Game } = require("./game.js");
const { config } = require("../../../config.js");


/**
 * Nothing fancy here. Just a Game object builder.
 */
class GameManager {
  constructor(players) {
    const wallHack = config.WALL_HACK;
    this.players = players || [
      new HumanPlayer(0, wallHack),
      new BotPlayer(1, wallHack),
      new BotPlayer(2, wallHack),
      new BotPlayer(3, wallHack),
    ];
  }

  /**
   * Create a game, with document blur/focus event handling
   * bound to game pause/resume functionality.
   */
  newGame() {
    let game = new Game(this.players);

    globalThis.currentGame = {
      game: game,
      players: this.players
    };

    let gameBoard = document.querySelector('.board');
    gameBoard.focus();

    return game;
  }
}

module.exports =  { GameManager };
