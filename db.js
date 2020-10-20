const fs = require("fs");

class DB {
  constructor(filePath) {
    this.filePath = filePath;
    this.cache = JSON.parse(fs.readFileSync(filePath));
  }

  get(path) {
    if (!path) return this.cache;
    path = path.split("/");
    let position = this.cache;
    path.forEach(el => {
      position = position[el]
    });
    return position;
  }

  has(path) {
    path = path.split("/");
    let position = this.cache;
    return path.every((el, i) => {
      if (!position[el]) {
        return false;
      }
      position = position[el];
      return true;
    });
  }

  set(path, val) {
    path = path.split("/");
    let position = this.cache;
    let last = path.pop();
    path.forEach(el => {
      if (!position[el]) {
        position[el] = {}
      }
      position = position[el];
    });
    position[last] = val;
    fs.writeFileSync(this.filePath, JSON.stringify(this.cache, null, 2));
    return this;
  }

  change(path, val) {
    path = path.split("/");
    let position = this.cache;
    let last = path.pop();
    path.forEach(el => {
      position = position[el];
    });
    position[last] = val;
    return this;
  }

  saveAll() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.cache, null, 2));
    return this;
  }

  reload() {
    this.cache = JSON.parse(fs.readFileSync(this.filePath));
    return this;
  }

  keys() {
    return Object.keys(this.cache);
  }

  size() {
    return Object.keys(this.cache).length;
  }

  forEach(fn) {
    for (const el of Object.keys(this.cache)) {
      fn(this.cache[el])
    }
  }

  delete(path) {
    path = path.split("/");
    let position = this.cache;
    let last = path.pop();
    path.forEach(el => {
      if (!position[el]) {
        position[el] = {}
      }
      position = position[el];
    });
    let result = delete position[last];
    fs.writeFileSync(this.filePath, JSON.stringify(this.cache, null, 2));
    return result;
  }
}

module.exports = DB;