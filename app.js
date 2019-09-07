//
//Card Variables
//
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = ["Ace", "King", "Queen", "Jack", "Ten", "Nine", "Eight", "Seven", "Six", 
              "Five", "Four", "Three", "Two"];
let dealerGamesWon = 0;
let playerGamesWon = 0;
//
//DOM Variables
//
let textArea = document.getElementById("paragraph");
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");
let dealerGames = document.getElementById("dealer-games");
let playerGames = document.getElementById("player-games");
//
//Game Variables
//
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];
//
//Starting Hit and Stay Buttons
//
hitButton.style.display = "none";
stayButton.style.display = "none";
dealerGames.style.display = "none";
playerGames.style.display = "none";
showStatus();
//
//Game Starting
//
newGameButton.addEventListener("click", function() {
    gameStarted = true;
    gameOver = false;
    playerOne = false;

    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];

    textArea.innerText = "A new game has started...";
    newGameButton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
    dealerGames.style.display = "inline";
    if (dealerGamesWon == 1) {
        dealerGames.innerText = `Dealer has won ${dealerGamesWon} game. \n`;
    } else {
        dealerGames.innerText = `Dealer has won ${dealerGamesWon} games. \n`;
    };
    playerGames.style.display = "inline";
    if (playerGamesWon == 1) {
        playerGames.innerText = `Player has won ${playerGamesWon} game.`;
    } else {
        playerGames.innerText = `Player has won ${playerGamesWon} games.`;
    }
    showStatus();
});

hitButton.addEventListener("click", function() {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
});

stayButton.addEventListener("click", function() {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});

function checkForEndOfGame() {
    updateScores();

    if (gameOver) {
        while (dealerScore < playerScore
               && playerScore <= 21
               && dealerScore <=21
               && dealerCards.length < 6) {
            dealerCards.push(getNextCard());
            updateScores();
        }
    }

    if (playerScore > 21) {
        gameOver = true;
        playerWon = false;
    } else if (dealerCards.length === 5) {
        gameOver = true;
        playerWon = false;
    } else if (dealerScore > 21) {
        gameOver = true;
        playerWon = true;
    }  else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        } else {
            playerWon = false;
        }
    }
};

function createDeck() {
    let deck = [];
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            let card = {
                suit: suits[suitIdx],
                value: values[valueIdx]
            };
            deck.push(card);
        }
    }
    return deck;
}

function getCardString(card) {
    return card.value + " of " + card.suit;
}

function getCardNumericValue(card) {
    switch(card.value) {
        case "Ace":
            return 1;
            break;
        case "Two":
            return 2;
            break;
        case "Three":
            return 3;
            break;
        case "Four":
            return 4;
            break;
        case "Five":
            return 5;
            break;
        case "Six":
            return 6;
            break;
        case "Seven":
            return 7;
            break;
        case "Eight":
            return 8;
            break;
        case "Nine":
            return 9;
            break;
        default:
            return 10;
            break;
    }
}

function getScore(array) {
    let score = 0;
    let hasAce = false;
    for (i = 0; i < array.length; i++) {
        let card = array[i];
        score += getCardNumericValue(card);
        if (card.value === "Ace") {
            hasAce = true;
        }
    }
    if (hasAce && (score + 10 <= 21)) {
        return score + 10;
    }
    return score;
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function showStatus() {
    if (!gameStarted) {
        textArea.innerText = "Welcome to Blackjack!";
        return;
    }
    /*for (var i = 0; i < deck.length; i++) {
        textArea.innerText += "\n" + getCardString(deck[i]);
    }*/
    let dealerCardString = "";
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardString += getCardString(dealerCards[i]) + "\n";
    }
    let playerCardString = "";
    for (let i = 0; i < playerCards.length; i++) {
        playerCardString += getCardString(playerCards[i]) + "\n";
    }

    updateScores();

    textArea.innerText = 
      "Dealer has:\n" +
      dealerCardString +
      "(score: " + dealerScore + " )\n\n" +

      "Player has:\n" +
      playerCardString +
      "(score: " + playerScore + " )\n\n";

    if (gameOver) {
        if (playerWon) {
            textArea.innerText += "You Won!";
            playerGamesWon += 1;
        } else {
            textArea.innerText += "Dealer Won";
            dealerGamesWon +=1;
        }
        newGameButton.style.display = "inline";
        hitButton.style.display = "none";
        stayButton.style.display = "none";
    }
}

function getNextCard() {
    return deck.shift();
}

function shuffleDeck() {
    for (i = 0; i < deck.length; i++) {
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = tmp;
    }
}