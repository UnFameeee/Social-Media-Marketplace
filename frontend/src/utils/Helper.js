import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

function generateId(input) {
  return input ? uuidv4(input) : uuidv4();
}

function checkPropsInObject(object, listProps, checkAll) {
  if (!object) return false;
  else {
    let res = checkAll;
    listProps.forEach((value) => {
      if (checkAll) {
        if (!object.hasOwnProperty(value)) {
          res = false;
        }
      } else {
        if (object.hasOwnProperty(value)) {
          res = true;
        }
      }
    });
    return res;
  }
}

function formatDate(date) {
  return dayjs(date).format('MM/DD/YYYY');
}

function equalArrays(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every(
      (val, index) =>
        val === b[index] ||
        JSON.stringify(val) === JSON.stringify(b[index])
    )
  );
}

function convertArrayToObject(array, key) {
  return array.reduce((obj, item, index) => {
    return key
      ? { ...obj, [item[key]]: item }
      : { ...obj, [index]: item };
  }, {});
}

function toUpperCaseFirstLetter(str) {
  try {
    str = str.charAt(0).toUpperCase() + str.slice(1);
  } catch (ex) {
    console.log(ex);
  }
  return str;
}

function isDataChange(before, after) {
  var isChange = false;
  if (before && after) {
    Object.keys(after).forEach((key) => {
      before[key] = before[key] ?? '';
      after[key] = after[key] ?? '';
      if (String(before[key]) !== String(after[key])) {
        isChange = true;
      }
    });
  }
  return isChange;
}

function isDateString(input) {
  if (!input) {
    return false;
  }
  if (isNaN(Date.parse(input))) {
    return false;
  }
  return true;
}

function splitSpaceString(str) {
  return str.replace(/\s/g, '');
}

function createSpaceString(str) {
  if (str == null || str == undefined) return null;
  return str.match(/[A-Z][a-z]+/g).join(' ');
}

function handleEnterKeyPress(event, func) {
  if (event.key === 'Enter') {
    func();
  }
}

function isNullOrEmpty(value) {
  return (
    !value ||
    value === undefined ||
    value === '' ||
    value.length === 0
  );
}

function isArrayList(value) {
  if (!Array.isArray(value) || !value.length) return false;
  else {
    let res = true;
    value.map((item) => {
      if (!Array.isArray(item)) res = false;
    });
    return res;
  }
}

function isObjectList(value) {
  if (!Array.isArray(value) || !value.length) return false;
  else {
    let res = true;
    value.map((item) => {
      if (item === Object(item)) res = false;
    });
    return res;
  }
}

function checkURL(value, defaultConfig = {}, lastOnly = false) {
  const pathArray = window.location.pathname.split('/');

  if (lastOnly) {
    return pathArray[pathArray.length - 1] === value.toLowerCase();
  } else {
    return (
      pathArray.includes(value.toLowerCase()) ||
      (value === defaultConfig.url &&
        pathArray[pathArray.length - 1] === defaultConfig.path)
    );
  }
}

function isMultiple(string, amount, defaultString) {
  if (!amount) {
    return defaultString;
  } else {
    if (amount > 1) {
      return amount + ' ' + string + 's';
    } else return amount + ' ' + string;
  }
}

function isEmptyObject(obj, checkValue = false) {
  let res = true;
  if (!checkValue) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        res = false;
      }
    }
    return res && JSON.stringify(obj) === JSON.stringify({});
  } else {
    if (obj) {
      Object.values(obj).map((x) => {
        if (x) {
          res = false;
        }
      });
    }
    return res;
  }
}

function convertArrayObjectToObject(arrayObject) {
  return arrayObject.reduce(function (obj, item) {
    var keys = Object.keys(item);
    obj[keys[0]] = item[keys[0]] ?? '';
    return obj;
  }, {});
}

function sortEntriesByKey(desc = false) {
  const n = { less: desc ? 1 : -1, more: desc ? -1 : 1 };
  return (curr, next) =>
    curr?.[0] < next?.[0] ? n.less : curr?.[0] > next?.[0] ? n.more : 0;
};

function sortArrayByKey(key = "id", desc = false) {
  if (!key) return undefined;
  const n = { less: desc ? 1 : -1, more: desc ? -1 : 1 };
  return (curr, next) =>
    curr?.[key] < next?.[key] ? n.less : curr?.[key] > next?.[key] ? n.more : 0;
};

export const Helper = {
  generateId,
  checkPropsInObject,
  formatDate,
  equalArrays,
  convertArrayToObject,
  toUpperCaseFirstLetter,
  isDataChange,
  isDateString,
  splitSpaceString,
  createSpaceString,
  handleEnterKeyPress,
  isNullOrEmpty,
  isArrayList,
  isObjectList,
  checkURL,
  isMultiple,
  isEmptyObject,
  convertArrayObjectToObject,
  sortEntriesByKey,
  sortArrayByKey,
};
