const score = JSON.parse(localStorage.getItem("score")) || {
    win: 0,
    lose: 0,
    tie: 0,
};

updateScore();

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalID = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);

        isAutoPlaying = true;
    } else {
        clearInterval(intervalID);
        isAutoPlaying = false;
    }
}

document.querySelector('.btn-rock').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector(".btn-scissors").addEventListener("click", () => {
  playGame('scissors');
});

document.querySelector(".btn-paper").addEventListener("click", () => {
  playGame('paper');
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    }else if (event.key === "p") {
      playGame("scissors");
    }else if (event.key === "s") {
      playGame("paper");
    }
});

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = "";

    if (playerMove === "rock") {
        if (computerMove === "scissors") {
            result = "You win.";
        } else if (computerMove === "paper") {
            result = "You lose.";
        } else if (computerMove === "rock") {
            result = "Tie.";
        }
    }

    if (playerMove === "scissors") {
        if (computerMove === "paper") {
            result = "You win.";
        } else if (computerMove === "rock") {
            result = "You lose.";
        } else if (computerMove === "scissors") {
            result = "Tie.";
        }
    }

    if (playerMove === "paper") {
        if (computerMove === "rock") {
            result = "You win.";
        } else if (computerMove === "scissors") {
            result = "You lose.";
        } else if (computerMove === "paper") {
            result = "Tie.";
        }
    }

    if (result === "You win.") {
        score.win += 1;
    }
    if (result === "You lose.") {
        score.lose += 1;
    }
    if (result === "Tie.") {
        score.tie += 1;
    }

    localStorage.setItem("score", JSON.stringify(score));

    updateScore();

    document.querySelector(".js-result").innerHTML = result;

    document.querySelector(".js-moves").innerHTML = `You &nbsp&nbsp
            <img src="img/${playerMove}.png"> &nbsp&nbsp
            Computer &nbsp&nbsp
            <img src="img/${computerMove}.png">`;
}

function updateScore() {
    document.querySelector(
        ".js-score"
    ).innerHTML = `Win : ${score.win} &nbsp|&nbsp Lose : ${score.lose} &nbsp|&nbsp Tie : ${score.tie}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = "";

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = "rock";
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = "paper";
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = "scissors";
    }
    return computerMove;
}
