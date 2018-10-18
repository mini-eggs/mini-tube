import "../styles/search.css";

export default {
  mounted(targets) {
    var easing = "linear";
    anime({ targets, opacity: 1, duration: 500, easing });
    setTimeout(() => targets.focus(), 750);
  },

  oninput(event) {
    var search = event.target.value;

    import("../packages/youtube").then(file => {
      var youtube = file.default;
      youtube.search({ search }).then(this.props.onSearchComplete);
    });
  },

  render() {
    return { tag: "input", placeholder: "Search", spellcheck: false, ...this };
  }
};
