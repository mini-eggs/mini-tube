import { h } from "wigly-jsx";

export default class Image {
  mounted(el) {
    this.anim({ el, immediate: true, opacity: 0 });
  }

  onLoad(event) {
    var el = event.target;
    this.anim({ el, opacity: 1, duration: 250 });
  }

  render() {
    return (
      <img
        style={this.props.style || {}}
        src={this.props.src}
        onload={this.onLoad}
      />
    );
  }
}
