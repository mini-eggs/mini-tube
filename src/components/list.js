import "../styles/list.css";

export default {
  render() {
    return {
      tag: "ul",
      children: this.props.items.map((item, index) => ({
        tag: ListItem,
        item,
        index,
        onSelect: this.props.onSelect
      }))
    };
  }
};

var ListItem = {
  onload(event) {
    var targets = event.target.parentElement.parentElement;
    var easing = "linear";
    anime({ targets, translateY: 5, duration: 0, easing });
    anime({ targets, opacity: 1, translateY: 0, duration: 500, easing });
  },

  render() {
    var { item } = this.props;
    var { url, height, width } = item.snippet.thumbnails.high;
    return {
      tag: "li",
      onclick: () => this.props.onSelect(item),
      children: [
        {
          tag: "button",
          children: [
            { children: item.snippet.title },
            { tag: "img", src: url, style: { height, width }, ...this }
          ]
        }
      ]
    };
  }
};
