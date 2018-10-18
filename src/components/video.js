import Loader from "./loader";
import "../styles/video.css";

var unplayablemsg = [
  "This video is unplayable. There can be a couple reasons for this.",
  "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
  "The owner of the requested video does not allow it to be played in embedded players."
  // "The request contains an invalid parameter value. For example, this error occurs if you specify a videoId that does not have 11 characters, or if the videoId contains invalid characters, such as exclamation points or asterisks."
];

var opts = {
  autoplay: true,
  info: false,
  annotations: false,
  fullscreen: false,
  captions: false,
  // controls: false,
  keyboard: false
};

export default {
  data() {
    return {
      loading: true,
      destroyedKeybinds: null,
      player: null,
      animationOver: false
    };
  },

  mounted(el) {
    import("yt-player").then(file => {
      var player = new file.default(el.firstChild, opts);
      player.load(this.props.selected.id.videoId);
      player.on("playing", this.onReady);
      player.on("ended", this.props.onVideoExit);
      player.on("unplayable", this.onVideoUnplayable);
      player.play();
      this.setState({ player });
    });
  },

  destroyed() {
    this.state.interval && clearInterval(this.state.interval);
    this.state.destroyedKeybinds && this.state.destroyedKeybinds();
  },

  onVideoUnplayable() {
    alert(unplayablemsg.join("\n\n"));
    this.props.onVideoExit();
  },

  onReady() {
    if (this.state.animationOver) return;

    var targets = document.querySelector("iframe");
    anime({ targets, opacity: 0, easing: "linear", duration: 0 });
    anime({ targets, opacity: 1, easing: "linear", duration: 500 });

    /**
     * Not great we have to do this.
     * YouTube always takes focus!
     */
    this.setState({
      loading: false,
      animationOver: true,
      interval: setInterval(() => targets.blur(), 16)
    });

    this.keybinds();
  },

  keybinds() {
    import("keybinds").then(file => {
      var keybinds = file.default;

      keybinds([], 37, () => {
        var t = this.state.player.getCurrentTime();
        this.state.player.seek(t - 5);
      });

      keybinds([], 39, () => {
        var t = this.state.player.getCurrentTime();
        this.state.player.seek(t + 5);
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
        var { player } = this.state;
        var state = player.getState();
        if (state === "playing") {
          player.pause();
        } else if (state === "paused") {
          player.play();
        }
      });

      var destroyedKeybinds = keybinds([], 27, this.props.onVideoExit);
      this.setState({ destroyedKeybinds });
    });
  },

  render() {
    return { children: [{}, this.state.loading && { tag: Loader }] };
  }
};
