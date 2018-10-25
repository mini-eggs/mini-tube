export default ({
  el,
  immediate = false,
  duration = 0,
  delay = 1,
  transform = {},
  ...props
}) => {
  return new Promise(resolve => {
    el.style.transitionDuration = `${duration}ms`;
    var transitionProperty = ["transform"];

    var work = () => {
      for (let key in props) {
        transitionProperty.push(key);
        el.style[key] = props[key];
      }

      var trans = [];
      for (let key of Object.keys(transform)) {
        trans.push(`${key}(${transform[key]})`);
      }

      el.style.transitionProperty = transitionProperty.join(", ");
      el.style.transform = trans.join(" ");
    };

    if (immediate) {
      work();
    } else {
      setTimeout(work, delay);
    }

    setTimeout(resolve, delay + duration);
  });
};
