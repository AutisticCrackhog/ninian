module.exports = (any) => {
  if (typeof any == "object") {
    if (any.constructor.name) {
      return any.constructor.name.toLowerCase()
    } else {
      return typeof any;
    }
  } else {
    return typeof any;
  }
}