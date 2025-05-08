const "../core/utils/utils.js");
const { config } = require("../../config.js");
const { modal } = require("../page/modal/modal.js");
const { GameManager } = require("../core/game/game-manager.js");
const { rotateWinds } = require("../core/players/ui/windicator.js");

// import { ClientUIMaster } = require("../core/players/ui/client-ui-master.js");

/**
 * This is the function that runs as the very first call
 * when the web page loads: do you want to play a game,
 * or do you want to watch the bots play each other?
 */
(function () {
  // functions are always "hoisted" to above any
  // actual code, so the following lines work,
  // despite the functions being declared "later".
  if (config.PLAY_IMMEDIATELY) play();
  else offerChoice();

  // Forced bot play
  function play() {
    let manager = new GameManager();
    let game = manager.newGame();
    game.startGame(() => {
      document.body.classList.add("finished");
      let gameui = game.players.find((p) => p.ui).ui;
      config.flushLog();
      return modal.showFinalScores(
        gameui,
        game.rules,
        game.scoreHistory,
        () => {
          document.body.classList.remove("finished");
          rotateWinds.reset();
          offerChoice();
        }
      );
    });
  }

  // Optional bot play.
  function offerChoice() {
    const options = [
      { description: "There are currently two modes of play on offer:" },
      { label: "I'd like to play some mahjong!", value: "play" },
      { label: "I just want to watch the bots play", value: "watch" },
      {
        description: "Alternatively, you can modify the game settings:",
        align: "center",
      },
      { label: "Change settings", value: "settings", back: true },
      { label: "Change theming", value: "theming", back: true },
      {
        description: "(you can also open the settings during play)",
        align: "center",
      },
    ];
    options.fixed = true;
    modal.choiceInput(
      "Welcome! What would you like to do?",
      options,
      (result) => {
        config.BOT_PLAY = result === "watch";
        if (result === "watch") config.FORCE_OPEN_BOT_PLAY = true;
        if (result === "settings") return modal.pickPlaySettings();
        if (result === "theming") return modal.pickTheming();
        play();
      }
    );
  }
})();
