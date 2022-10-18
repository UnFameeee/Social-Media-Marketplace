import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

function generateId(input) {
  return input ? uuidv4(input) : uuidv4();
}

function checkPropsInObject(object, listProps, checkAll) {
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

function formatDate(date) {
  return dayjs(date).format('MM/DD/YYYY');
}

function equalArrays(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

function convertArrayToObject(array, key) {
  const initialValue = {};
  return array.reduce((obj, item, index) => {
    return key
      ? { ...obj, [item[key]]: item }
      : { ...obj, [index]: item };
  }, initialValue);
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
};
