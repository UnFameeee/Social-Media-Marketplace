import { Helper } from '../utils/Helper';

function getItem(key) {
  //if there is no key, it will return the first item
  return key
    ? localStorage.getItem(key)
    : isEmpty
    ? localStorage.getItem(localStorage.key(0))
    : 'No items in local storage';
}

function getLastItem() {
  return isEmpty
    ? localStorage.getItem(localStorage.key(localStorage.length))
    : 'No items in local storage';
}

function getValueAt(index) {
  return localStorage.getItem(localStorage.key(index));
}

function clear(key) {
  //if there is no key, it will clear all
  return key ? localStorage.removeItem(key) : localStorage.clear();
}

function setValue({ key, value }) {
  if (Helper.isNullOrEmpty(key) || Helper.isNullOrEmpty(value)) {
    return 'No key or value';
  } else {
    return localStorage.setItem(key, value);
  }
}

function isEmpty() {
  return localStorage.length > 0;
}

export const localStorageService = {
  getLastItem,
  getItem,
  getValueAt,
  setValue,
  clear,
  isEmpty,
};
