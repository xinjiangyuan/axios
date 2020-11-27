import _typeof from "@babel/runtime/helpers/typeof";

function guid() {
  function S4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }

  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

function isObject(val) {
  return val !== null && _typeof(val) === 'object';
}

var toString = Object.prototype.toString;

function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

function isFunction(fn) {
  return typeof fn === 'function';
}

function isPrimitiveButString(value) {
  var type = _typeof(value);

  return type === 'number' || type === 'symbol' || type === 'boolean' || type === 'function' || type === 'undefined';
}

function isPrimitive(value) {
  var type = _typeof(value);

  return type === 'string' || type === 'number' || type === 'symbol' || type === 'boolean' || type === 'function' || type === 'undefined';
}

function isEqualObj(a, b) {
  if (a === b) {
    return true;
  }

  if (isPrimitive(a) || isPrimitive(b)) {
    return false;
  } // obj


  if (isPlainObject(a)) {
    if (!isPlainObject(b)) {
      return false;
    }

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    for (var _i = 0, _aKeys = aKeys; _i < _aKeys.length; _i++) {
      var key = _aKeys[_i];

      if (!isEqualObj(a[key], b[key])) {
        return false;
      }
    }

    return true;
  } // TODO 使用中如果遇到了未排序引起了 相等传参但是判断失败，则进行对等排序


  var aArr = Array.from(a);
  var bArr = Array.from(b);

  if (aArr.length !== bArr.length) {
    return false;
  }

  for (var _i2 = 0, _aArr = aArr; _i2 < _aArr.length; _i2++) {
    var index = _aArr[_i2];

    if (!isEqualObj(aArr[index], bArr[index])) {
      return false;
    }
  }

  return true;
}

export { guid, isObject, isFormData, isFunction, isPrimitive, isPrimitiveButString, isEqualObj };