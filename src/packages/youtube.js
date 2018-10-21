var query = obj => {
  var keys = Object.keys(obj);
  var encode = encodeURIComponent;
  var keyValuePair = key => `${encode(key)}=${encode(obj[key])}`;
  return "?" + keys.map(keyValuePair).join("&");
};

class YouTube {
  constructor({ key, base }) {
    this.key = key;
    this.base = base;
    this.abort = () => {};
  }

  request(url) {
    return new Promise(resolve => {
      this.abort();
      var req = new XMLHttpRequest();
      req.open("GET", url);
      req.onload = () => resolve(JSON.parse(req.responseText));
      req.send();
      this.abort = () => req.abort();
    });
  }

  search({ search, maxResults = 25, part = "snippet", type = "video" }) {
    var { base, key } = this;
    var opts = { q: search, maxResults, part, type, key };
    var url = `${base}/search${query(opts)}`;
    return this.request(url);
  }
}

export default new YouTube({
  base: "https://www.googleapis.com/youtube/v3",
  key: "AIzaSyBUt250WkkvvAnHu0dHNKOopKYdoQJOUSk"
});
