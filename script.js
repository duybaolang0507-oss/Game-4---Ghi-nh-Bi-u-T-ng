// Danh sách 8 cặp: mỗi cặp có emoji và nội dung
const pairs = [
  { name: "statue", emoji: "🗽", text: "Tượng Nữ thần Tự do" },
  { name: "lynching", emoji: "🔥", text: "Hành hình kiểu Linsơ" },
  { name: "movement", emoji: "✊", text: "Phong trào đấu tranh" },
  { name: "justice", emoji: "⚖️", text: "Bất công & Phân biệt chủng tộc" },
  { name: "declaration", emoji: "📜", text: "Tuyên ngôn Độc lập 1776." },
  { name: "solidarity", emoji: "🌍", text: "Đoàn kết quốc tế" },
  { name: "landmark", emoji: "🏛️", text: "Thăm địa danh lịch sử" },
  { name: "hotel", emoji: "🏨", text: "Khách sạn Omni Parker House" }
];

// Tạo mảng game gồm 16 thẻ (8 emoji + 8 text)
let gameArray = [];
pairs.forEach(pair => {
  gameArray.push({ name: pair.name, content: pair.emoji });
  gameArray.push({ name: pair.name, content: pair.text });
});

// Trộn ngẫu nhiên
gameArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector("#game-board");
let chosenCards = [];
let chosenCardsId = [];
let matchedCards = [];

// Tạo board
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

// Lật thẻ
function flipCard() {
  let cardId = this.getAttribute("data-id");
  if (chosenCardsId.includes(cardId) || matchedCards.includes(cardId)) return;

  chosenCards.push(gameArray[cardId]);
  chosenCardsId.push(cardId);
  this.innerHTML = gameArray[cardId].content;

  if (chosenCards.length === 2) {
    setTimeout(checkMatch, 600);
  }
}

// Kiểm tra cặp
function checkMatch() {
  const cards = document.querySelectorAll(".card");
  const [card1, card2] = chosenCards;
  const [id1, id2] = chosenCardsId;

  if (card1.name === card2.name && id1 !== id2) {
    // đúng cặp
    matchedCards.push(id1, id2);
  } else {
    // úp lại
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
