import api from '../../common/environment/environment';
import axios from 'axios';

const baseUrl = api.auth;

const AuthService = {
  register: function(model) {
    return axios
      .post(`${baseUrl}/register`, model)
      .then((resp) => resp.data)
      .catch((error) => console.log(error));
  },
  login: function(model) {
    
    return axios
      .post(`${baseUrl}/login`, model)
      .then((resp) => resp.data)
      .catch((error) => console.log(error));
  }
};

export default AuthService;
