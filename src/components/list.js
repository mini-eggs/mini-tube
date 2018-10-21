import { h } from "wigly-jsx";
import Image from "./image";
import "./list.css";

class ListItem {
  mounted(el) {
    this.anim({
      el,
      immediate: true,
      opacity: 0,
      duration: 0,
      transform: { translateY: "10px" }
    });

    this.anim({
      el,
      opacity: 1,
      duration: 250,
      delay: 100 * (this.props.index + 1),
      transform: { translateY: "0px" }
    });
  }

  handleMouseEnter() {
    if ("activeElement" in document) {
      document.activeElement.blur();
    }
  }

  render() {
    var { item } = this.props;
    var { url, height, width } = item.snippet.thumbnails.high;

    return (
      <li
        onclick={() => this.props.onSelect(item)}
        onmousemove={this.handleMouseEnter}
      >
        <button tabindex>
          <div>{item.snippet.title}</div>
          <Image src={url} style={{ height, width }} />
        </button>
      </li>
    );
  }
}

export default class List {
  render() {
    return (
      <ul class="list">
        {this.props.items.map((item, index) => (
          <ListItem index={index} item={item} onSelect={this.props.onSelect} />
        ))}
      </ul>
    );
  }
}
