var Loader = function () {
  this.errors = 0;
  this.success = 0;
  this.queue = [];
  this.cache = [];
  this.onLoad = new naive.Signal();
  this.onComplete = new naive.Signal();
  this.onStart = new naive.Signal();
  this.onQueued = new naive.Signal();
};

Loader.prototype.addAudio = function (name, url) {
  this.queue.push({
    name: name,
    url: url,
    type: 'audio'
  });
  this.onQueued.dispatch();
};

Loader.prototype.addAudioBuffer = function (name, url) {
  this.queue.push({
    name: name,
    url: url,
    type: 'audio-buffer'
  });
  this.onQueued.dispatch();
};

Loader.prototype.addImage = function (name, url) {
  this.queue.push({
    name: name,
    url: url,
    type: 'image'
  });
  this.onQueued.dispatch();
};

Loader.prototype.addJSON = function (name, url) {
  this.queue.push({
    name: name,
    url: url,
    type: 'json'
  });
  this.onQueued.dispatch();
};

Loader.prototype.loadAudio = function (asset) {
  var self = this;
  return new Promise(function (resolve, reject) {
    var audio = new Audio();
    audio.oncanplaythrough = function () {
      var cacheAsset = {
        name: asset.name,
        content: audio,
        type: 'audio'
      };
      resolve(cacheAsset);
      self.cache.push(cacheAsset);
      self.success++;
      self.onLoad.dispatch(cacheAsset);
      self.hasCompleted();
    };
    audio.onerror = function () {
      reject('The asset with name ' + asset.name + ' and url ' + asset.url + ' could not be loaded');
      self.errors++;
      self.onLoad.dispatch();
      self.hasCompleted();
    };
    audio.src = asset.url;
  });
};

Loader.prototype.loadAudioBuffer = function (asset) {
  var self = this;
  var xhr = new window.XMLHttpRequest();
  var AudioContext = new (window.AudioContext || window.webkitAudioContext)();
  return new Promise(function (resolve, reject) {
    xhr.open('GET', asset.url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
      AudioContext.decodeAudioData(this.response, function (buffer) {
        var cacheAsset = {
          name: asset.name,
          content: buffer,
          type: 'audio-buffer'
        };
        resolve(cacheAsset);
        self.cache.push(cacheAsset);
        self.success++;
        self.onLoad.dispatch(cacheAsset);
        self.hasCompleted();
      }, function () {
        reject('The asset with name ' + asset.name + ' and url ' + asset.url + ' could not be loaded');
        self.errors++;
        self.onLoad.dispatch();
        self.hasCompleted();
      });
    };
    xhr.onerror = function () {
      reject('The asset with name ' + asset.name + ' and url ' + asset.url + ' could not be loaded');
      self.errors++;
      self.onLoad.dispatch();
      self.hasCompleted();
    };
    xhr.send();
  }.bind(this));
};

Loader.prototype.loadImage = function (asset) {
  var self = this;
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.onload = function () {
      var cacheAsset = {
        name: asset.name,
        content: image,
        type: 'image'
      };
      resolve(cacheAsset);
      self.cache.push(cacheAsset);
      self.success++;
      self.onLoad.dispatch(cacheAsset);
      self.hasCompleted();
    };
    image.onerror = function () {
      reject('The asset with name ' + asset.name + ' and url ' + asset.url + ' could not be loaded');
      self.errors++;
      self.onLoad.dispatch();
      self.hasCompleted();
    };
    image.src = asset.url;
  });
};

Loader.prototype.loadJSON = function (asset) {
  var xhr = new window.XMLHttpRequest();
  var self = this;
  return new Promise(function (resolve, reject) {
    xhr.open('GET', asset.url, true);
    xhr.onload = function () {
      if (this.status === 200) {
        var cacheAsset = {
          name: asset.name,
          content: JSON.parse(this.response),
          type: 'json'
        };
        resolve(cacheAsset);
        self.cache.push(cacheAsset);
        self.success++;
        self.onLoad.dispatch(cacheAsset);
        self.hasCompleted();
      } else {
        reject('The asset with name ' + asset.name + ' and url ' + asset.url + ' could not be loaded');
        self.errors++;
        self.onLoad.dispatch();
        self.hasCompleted();
      }
    };
    xhr.onerror = function () {
      reject('The asset with name ' + asset.name + ' and url ' + asset.url + ' could not be loaded');
      self.errors++;
      self.onLoad.dispatch();
      self.hasCompleted();
    };
    xhr.send();
  }.bind(this));
};

Loader.prototype.get = function (type, name) {
  for (var i = 0, len = this.cache.length; i < len; i++) {
    if (this.cache[i].type === type && this.cache[i].name === name) {
      return this.cache[i];
    }
  }
  return false;
};

Loader.prototype.hasCompleted = function () {
  if (this.queue.length === this.success + this.errors) {
    this.queue = [];
    this.onComplete.dispatch();
    return true;
  } else {
    return false;
  }
};

Loader.prototype.start = function () {
  this.onStart.dispatch();
  for (var i = 0, len = this.queue.length; i < len; i++) {
    if (this.queue[i].type === 'audio') {
      this.loadAudio(this.queue[i]);
    }
    if (this.queue[i].type === 'audio-buffer') {
      this.loadAudioBuffer(this.queue[i]);
    }
    if (this.queue[i].type === 'image') {
      this.loadImage(this.queue[i]);
    }
    if (this.queue[i].type === 'json') {
      this.loadJSON(this.queue[i]);
    }
  }
};
