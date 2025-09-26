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

// Tạo 16 thẻ (8 icon + 8 text)
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

 card.innerHTML = `
  <span class="front"></span>
  <span class="back">${cardData.content}</span>
`;


  card.addEventListener("click", handleCardClick);
  gameBoard.appendChild(card);
}

function handleCardClick(e) {
  const clickedCard = e.currentTarget;

  if (lockBoard) return;                    // 🚨 chặn nếu đang khóa
  if (clickedCard === firstCard) return;    // 🚨 không cho click lại cùng thẻ
  if (clickedCard.classList.contains("flipped")) return; // 🚨 tránh bug double flip

  clickedCard.classList.add("flipped");

  if (!firstCard) {
    firstCard = clickedCard;
    return;
  }

  // Khi đã có thẻ thứ 2 → khóa bàn NGAY LẬP TỨC
  secondCard = clickedCard;
  lockBoard = true;

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
  firstCard.removeEventListener("click", handleCardClick);
  secondCard.removeEventListener("click", handleCardClick);
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
  lockBoard = false;  // 🔓 mở khóa sau khi xử lý xong
}

// Khởi tạo game
cards.forEach(createCard);

