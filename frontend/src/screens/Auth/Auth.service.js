import api from '../../common/environment/environment';
import axios from 'axios';

const baseUrl = api.auth;

const AuthService = {
  register: async function (model) {
    return await axios.post(`${baseUrl}/register`, model);
  },
};

export default AuthService;
