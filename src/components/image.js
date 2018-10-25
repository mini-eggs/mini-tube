import { h } from "wigly-jsx";
import "./image.css";

export default class Image {
  mounted(el) {
    this.anim({ el: el.firstChild, immediate: true, opacity: 0 });
  }

  onLoad(event) {
    var el = event.target;
    this.anim({ el, opacity: 1, duration: 250 });
  }

  render() {
    return (
      <div class="image-container">
        <img
          style={this.props.style || {}}
          src={this.props.src}
          onload={this.onLoad}
        />
      </div>
    );
  }
}
