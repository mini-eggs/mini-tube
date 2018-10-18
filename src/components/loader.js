import "../styles/loader.css";

export default {
  render() {
    return {
      children: emoji[Math.floor(Math.random() * emoji.length)],
      class: "loader"
    };
  }
};

var emoji = [
  "🍔",
  "🍉",
  "🍌",
  "🍍",
  "🍑",
  "🍒",
  "🥑",
  "🍆",
  "🥨",
  "🥞",
  "🧀",
  "🍔",
  "🍟",
  "🍕",
  "🌭",
  "🥪",
  "🌮",
  "🍰"
];
