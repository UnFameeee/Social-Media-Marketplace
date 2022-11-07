export const apiUrl = 'http://localhost:4321/api';

const api = {
  auth: apiUrl + '/auth',
  profile: apiUrl + '/profile',
  friend: apiUrl + '/friendship',
  post: apiUrl + '/post',
};

export const paging = {
  page: 0,
  pageSize: 5,
};

export default api;
