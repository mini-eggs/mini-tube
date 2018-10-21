import { h } from "wigly-jsx";
import "./item.css";

export default class Item {
  constructor() {
    this.state = {
      keybinds: undefined,
      interval: undefined,
      player: undefined
    };
  }

  mounted(el) {
    this.anim({ el, immediate: true, opacity: 0 });
    var interval = setInterval(() => document.activeElement.blur(), 100);
    this.setState({ interval });
  }

  destroyed() {
    if (this.state.keybinds) this.state.keybinds();
    clearInterval(this.state.interval);
  }

  keybinds() {
    import("keybinds").then(file => {
      var keybinds = file.default;

      keybinds([], 37, () => {
        var t = this.state.player.getCurrentTime();
        this.state.player.seekTo(t - 5);
      });

      keybinds([], 39, () => {
        var t = this.state.player.getCurrentTime();
        this.state.player.seekTo(t + 5);
      });

      keybinds([], 38, () => {
        var v = this.state.player.getVolume();
        this.state.player.setVolume(v + 5);
      });

      keybinds([], 40, () => {
        var v = this.state.player.getVolume();
        this.state.player.setVolume(v - 5);
      });

      keybinds([], 32, () => {
        var state = this.state.player.getPlayerState();
        var rules = {
          1: this.state.player.pauseVideo,
          2: this.state.player.playVideo
        };
        rules[state].call(this.state.player);
      });

      var destroy = keybinds([], 27, async () => {
        var el = this.state.player.getIframe();
        await this.anim({ el, opacity: 0, duration: 250 });
        this.props.onVideoExit();
      });

      this.setState({ keybinds: destroy });
    });
  }

  handeLoad(event) {
    var player = new YT.Player(event.target, {
      events: { onReady: e => this.handleVideoReady(e) }
    });

    this.setState({ player }, () => this.keybinds());
  }

  handleVideoReady(event) {
    var el = event.target.getIframe();
    this.anim({ el, opacity: 1, duration: 250 });
  }

  render() {
    var base = "https://www.youtube.com/embed/";
    var opts = `?autoplay=1&enablejsapi=1&mute=0&origin=${location.origin}`;
    var src = `${base}${this.props.item.id.videoId}${opts}`;

    return (
      <iframe
        src={src}
        allow="autoplay"
        allowfullscreen
        onload={this.handeLoad}
      />
    );
  }
}
