import { h } from "wigly-jsx";
import youtube from "../packages/youtube";
import "./search.css";

export default class Search {
  constructor() {
    this.state = {
      search: "Search",
      default: "Search"
    };
  }

  mounted(el) {
    this.nextTick(() => {
      el.firstChild.focus();
    });
  }

  async handleInput(event) {
    var search = event.target.value;

    if (!search) {
      this.props.onSearchComplete({ items: [] });
      this.setState({ search });
      return;
    }

    var data = await youtube.search({ search });
    this.setState({ search });
    this.props.onSearchComplete(data);
  }

  handleFocus() {
    this.setState({ search: "" });
    this.props.onSearchComplete({ items: [] });
  }

  handleBlur() {
    if (!this.state.search) {
      this.setState({ search: this.state.default });
    }
  }

  render() {
    return (
      <div class="search">
        <input
          autofocus
          onfocus={this.handleFocus}
          onblur={this.handleBlur}
          oninput={this.handleInput}
          value={this.state.search}
          placeholder={this.state.default}
        />
      </div>
    );
  }
}
