import Search from "./components/search.js";
import List from "./components/list.js";
import Video from "./components/video.js";
import "./styles/main.css";

var App = {
  data() {
    return {
      search: true,
      items: [],
      selected: null
    };
  },

  onVideoExit() {
    var targets = document.querySelector("iframe");
    var { finished } = anime({ targets, opacity: 0, easing: "linear" });
    finished.then(() => this.setState({ selected: null, search: true }));
  },

  onSearchComplete({ items }) {
    this.setState({ items: [], selected: null });
    this.setState({ items });
  },

  onSelect(selected) {
    document.activeElement.blur();

    var targets = [
      document.querySelector("input"),
      document.querySelector("ul")
    ];

    var { finished } = anime({ targets, opacity: 0, easing: "linear" });
    finished.then(() => this.setState({ search: false, items: [], selected }));
  },

  render() {
    return {
      children: [
        this.state.search && { tag: Search, ...this },
        !!this.state.items.length && { tag: List, ...this.state, ...this },
        this.state.selected && { tag: Video, ...this.state, ...this }
      ]
    };
  }
};

wigly.render(App, document.body);
