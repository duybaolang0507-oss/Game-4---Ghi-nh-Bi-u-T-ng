const board = document.getElementById("game-board");
const restartBtn = document.getElementById("restart");

let cards = [
  "🗽", "Tượng Nữ thần Tự do",
  "🔥", "Hành hình kiểu Linsơ",
  "✊", "Phong trào đấu tranh",
  "⚖️", "Bất công & Phân biệt chủng tộc",
  "📜", "Tuyên ngôn Độc lập 1776.",
  "🌍", "Đoàn kết quốc tế",
  "🏛️", "Thăm địa danh lịch sử",
  "🏨", "Khách sạn Omni Parker House"
];

let flippedCards = [];
let matched = 0;

// Shuffle cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Render board
function createBoard() {
  board.innerHTML = "";
  matched = 0;
  flippedCards = [];
  shuffle(cards.concat(cards)).slice(0,16).forEach(value => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.innerText = "?";
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

// Flip card
function flipCard() {
  if (this.classList.contains("flipped") || flippedCards.length === 2) return;

  this.classList.add("flipped");
  this.innerText = this.dataset.value;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Check match
function checkMatch() {
  const [card1, card2] = flippedCards;

  // Rule: match if one is emoji and one is its text
  let isPair = false;
  const pairs = {
    "🗽": "Tượng Nữ thần Tự do",
    "🔥": "Hành hình kiểu Linsơ",
    "✊": "Phong trào đấu tranh",
    "⚖️": "Bất công & Phân biệt chủng tộc",
    "📜": "Tuyên ngôn Độc lập 1776.",
    "🌍": "Đoàn kết quốc tế",
    "🏛️": "Thăm địa danh lịch sử",
    "🏨": "Khách sạn Omni Parker House"
  };

  if (pairs[card1.dataset.value] === card2.dataset.value ||
      pairs[card2.dataset.value] === card1.dataset.value) {
    isPair = true;
  }

  if (isPair) {
    matched += 2;
    flippedCards = [];
    if (matched === 16) {
      setTimeout(() => alert("🎉 Bạn đã thắng!"), 300);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.innerText = "?";
      card2.innerText = "?";
      flippedCards = [];
    }, 1000);
  }
}

// Restart game
restartBtn.addEventListener("click", () => {
  createBoard();
});

// Start
createBoard();
