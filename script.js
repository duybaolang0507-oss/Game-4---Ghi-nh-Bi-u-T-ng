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

// Tạo mảng thẻ gồm cả icon và text
let cards = [];
cardPairs.forEach((pair, index) => {
  cards.push({ id: index, content: pair.icon });
  cards.push({ id: index, content: pair.text });
});

// Trộn mảng thẻ
cards.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById("game-board");
let firstCard = null;
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
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  const secondCard = this;
  checkMatch(firstCard, secondCard);
}

function checkMatch(card1, card2) {
  if (card1.dataset.id === card2.dataset.id) {
    // Giữ nguyên nếu khớp
    firstCard = null;
  } else {
    // Lật lại nếu sai
    lockBoard = true;
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      lockBoard = false;
      firstCard = null;
    }, 1000);
  }
}

// Tạo bàn chơi
cards.forEach(createCard);
