const cardPairs = [
  { icon: "🗽", text: "Tượng Nữ thần Tự do" },
  { icon: "🔥", text: "Hành hình kiểu Linsơ" },
  { icon: "✊", text: "Phong trào đấu tranh" },
  { icon: "⚖️", text: "Bất công & Phân biệt chủng tộc" },
  { icon: "📜", text: "Tuyên ngôn Độc lập 1776." },
  { icon: "🌍", text: "Đoàn kết quốc tế" },
  { icon: "🏛️", text: "Thăm địa danh lịch sử" },
  { icon: "🏨", text: "Khách sạn Omni Parker House" }
];

// Tạo mảng 16 thẻ (8 icon + 8 text)
let cards = [];
cardPairs.forEach((pair, index) => {
  cards.push({ id: index, content: pair.icon });
  cards.push({ id: index, content: pair.text });
});

// Trộn ngẫu nhiên
cards.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById("game-board");
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createCard(cardData) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = cardData.id;
  card.dataset.content = cardData.content;

  card.innerHTML = `<span class="front"></span><span class="back">${cardData.content}</span>`;

  card.addEventListener("click", flipCard);
  gameBoard.appendChild(card);
}

function flipCard() {
  if (lockBoard) return;               // không cho lật nếu đang khóa
  if (this === firstCard) return;      // không cho lật 2 lần cùng thẻ

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;   // 🚨 khóa ngay khi có 2 thẻ

  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.id === secondCard.dataset.id;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;  // 🔑 mở khóa khi xử lý xong
}

// Khởi tạo game
cards.forEach(createCard);
