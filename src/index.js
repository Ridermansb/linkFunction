import delve from "dlv";

/**
 * Create event handler function that call given function with input value
 *
 * @param {function} fn - Function that will be called with input value
 * @param {string} eventPath - A dot0notated key path to the value
 */
export default function(fn, eventPath) {
  return function(e) {
    let target = (e && e.target) || this;
    const value =
      typeof eventPath === "string"
        ? delve(e, eventPath)
        : target.nodeName
        ? target.type.match(/^che|rad/)
          ? target.checked
          : target.value
        : e;

    return fn(value);
  };
}
