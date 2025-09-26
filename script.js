const cardArray = [
  { name: "statue", content: "🗽 Tượng Nữ thần Tự do" },
  { name: "lynching", content: "🔥 Hành hình kiểu Linsơ" },
  { name: "movement", content: "✊ Phong trào đấu tranh" },
  { name: "justice", content: "⚖️ Bất công & Phân biệt chủng tộc" },
  { name: "declaration", content: "📜 Tuyên ngôn Độc lập 1776." },
  { name: "solidarity", content: "🌍 Đoàn kết quốc tế" },
  { name: "landmark", content: "🏛️ Thăm địa danh lịch sử" },
  { name: "hotel", content: "🏨 Khách sạn Omni Parker House" }
];

// 👉 tạo 8 cặp = nhân đôi danh sách
let gameArray = [...cardArray, ...cardArray];

// 👉 trộn ngẫu nhiên
gameArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector("#game-board");
let chosenCards = [];
let chosenCardsId = [];
let matchedCards = [];

// tạo thẻ
function createBoard() {
  gameArray.forEach((item, index) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("data-id", index);
    card.innerHTML = "❓";
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
  });
}

// lật thẻ
function flipCard() {
  let cardId = this.getAttribute("data-id");
  if (chosenCardsId.includes(cardId) || matchedCards.includes(cardId)) return;

  chosenCards.push(gameArray[cardId].content);
  chosenCardsId.push(cardId);
  this.innerHTML = gameArray[cardId].content;

  if (chosenCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

// kiểm tra trùng khớp
function checkMatch() {
  const cards = document.querySelectorAll(".card");
  const [id1, id2] = chosenCardsId;

  if (gameArray[id1].name === gameArray[id2].name) {
    matchedCards.push(id1, id2);
  } else {
    cards[id1].innerHTML = "❓";
    cards[id2].innerHTML = "❓";
  }

  chosenCards = [];
  chosenCardsId = [];

  if (matchedCards.length === gameArray.length) {
    setTimeout(() => alert("🎉 Bạn đã thắng!"), 300);
  }
}

createBoard();
