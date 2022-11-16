import { Helper } from '../utils/Helper';

function getItem(key) {
  //if there is no key, it will return the first item
  return key
    ? JSON.parse(localStorage.getItem(key))
    : isEmpty
    ? JSON.parse(localStorage.getItem(localStorage.key(0)))
    : '';
}

function getLastItem() {
  return isEmpty
    ? JSON.parse(
        localStorage.getItem(localStorage.key(localStorage.length))
      )
    : '';
}

function getValueAt(index) {
  return isEmpty
    ? JSON.parse(localStorage.getItem(localStorage.key(index)))
    : '';
}

function clear(key) {
  //if there is no key, it will clear all
  return key ? localStorage.removeItem(key) : localStorage.clear();
}

function setValue(key, value) {
  if (!isEmpyKeyOrValue(key, value)) {
    return 'No key or value';
  } else {
    return localStorage.setItem(key, JSON.stringify(value));
  }
}

function getArray(key) {
  var item = getItem(key);
  return item ? item : [];
}

function addToArray(key, value) {
  if (!isEmpyKeyOrValue(key, value)) {
    return 'No key or value';
  } else {
    var list = getArray(key);
    var existItem = list.filter(
      (x) => x.profile_id === value.profile_id
    );

    if (Helper.isNullOrEmpty(existItem)) {
      list.unshift(value);
    }

    setValue(key, list);
  }
}

function deleteFromArray(key, value) {
  if (!isEmpyKeyOrValue(key, value)) {
    return 'No key or value';
  } else {
    var list = getArray(key);
    if (list.length > 1) {
      var existItem = list.filter(
        (x) => x.profile_id !== value.profile_id
      );
      setValue(key, existItem);
    } else {
      clear(key);
    }
  }
}

function isEmpty() {
  return localStorage.length > 0;
}

function isEmpyKeyOrValue(key, value) {
  if (Helper.isNullOrEmpty(key) || Helper.isNullOrEmpty(value)) {
    return true;
  } else {
    return false;
  }
}

export const localStorageService = {
  getLastItem,
  getItem,
  getValueAt,
  setValue,
  clear,
  isEmpty,
  getArray,
  addToArray,
  deleteFromArray,
  isEmpyKeyOrValue,
};
