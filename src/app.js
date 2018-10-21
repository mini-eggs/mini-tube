import { h } from "wigly-jsx";
import Search from "./components/search";
import List from "./components/list";
import Item from "./components/item";

export default class App {
  constructor() {
    this.state = {
      items: [],
      selected: undefined
    };
  }

  onSearchComplete({ items }) {
    this.setState({ items: [] });
    this.setState({ items });
  }

  onSelect(selected) {
    this.setState({ selected });
  }

  onVideoExit() {
    this.setState({ items: [], selected: undefined });
  }

  render() {
    if (this.state.selected) {
      return (
        <div>
          <Item item={this.state.selected} onVideoExit={this.onVideoExit} />
        </div>
      );
    }

    return (
      <div>
        <Search onSearchComplete={this.onSearchComplete} />
        <List items={this.state.items} onSelect={this.onSelect} />
      </div>
    );
  }
}
