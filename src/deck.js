const cardBack =
  "https://www.freeiconspng.com/uploads/retrowave-sun-with-alpha-background-vaporwave-png-27.png";

const cardIconObj = {
  dolphin: {
    front: "https://www.freeiconspng.com/uploads/dolphin-vaporwave-png-6.png",
    alt: "Dolphin",
  },
  psn: {
    front: "https://www.freeiconspng.com/uploads/vaporwave-png-0.png",
    alt: "psn",
  },
  sadFace: {
    front: "https://www.freeiconspng.com/uploads/face-vaporwave-png-9.png",
    alt: "sadface",
  },
  atari: {
    front: "https://www.freeiconspng.com/uploads/sticker-vaporwave-png-5.png",
    alt: "atari",
  },
  fuck: {
    front: "https://www.freeiconspng.com/uploads/tina-vaporwave-png-15.png",
    alt: "fuck",
  },
  pc: {
    front: "https://www.freeiconspng.com/uploads/computer-vaporwave-png-18.png",
    alt: "pc",
  },
  death: {
    front:
      "https://www.freeiconspng.com/uploads/death-evian-cyberpunk-vaporwave-health-goth-png-4.png",
    alt: "death",
  },
  hank: {
    front:
      "https://www.freeiconspng.com/uploads/vaporwave-inspired-profile-picture-png-29.png",
    alt: "Hank Hill",
  },
};

const { dolphin, psn, sadFace, atari, fuck, pc, death, hank } = cardIconObj;

export function initializeDeck() {
  let id = 0;
  const cards = [dolphin, psn, sadFace, atari, fuck, pc, death, hank].reduce(
    (acc, type) => {
      acc.push({
        id: id++,
        width: 55,
        height: 55,
        back: cardBack,
        type,
      });
      acc.push({
        id: id++,
        width: 55,
        height: 55,
        back: cardBack,
        type,
      });
      return acc;
    },
    []
  );
  return shuffleDeck(cards);
}

//Array shuffler function credit https://www.youtube.com/watch?v=myL4xmtAVtw
export function shuffleDeck(cards) {
  let newPos, temp;
  for (let i = cards.length - 1; i > 0; i--) {
    newPos = Math.floor(Math.random() * (i + 1));
    temp = cards[i];
    cards[i] = cards[newPos];
    cards[newPos] = temp;
  }
  return cards;
}
