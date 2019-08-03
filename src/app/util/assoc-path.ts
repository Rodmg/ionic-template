// Reimplemented based on https://raw.githubusercontent.com/ramda/ramda/master/source/assocPath.js
// Docs: https://ramdajs.com/docs/#assocPath

import { curry, isNil, has, assoc } from "rambda";

const assocPath = curry(function ap(path, val, obj) {
  if (path.length === 0) {
    return val;
  }
  const idx = path[0];
  if (path.length > 1) {
    const nextObj = !isNil(obj) && has(idx, obj) ? obj[idx] : Number.isInteger(path[1]) ? [] : {};
    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
  }
  if (Number.isInteger(idx) && Array.isArray(obj)) {
    const arr = [].concat(obj);
    arr[idx] = val;
    return arr;
  } else {
    return assoc(idx, val, obj);
  }
});
export default assocPath;
