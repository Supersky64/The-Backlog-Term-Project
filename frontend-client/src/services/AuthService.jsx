import axios from 'axios';

const AUTH_API_BASE_URL =
  import.meta.env.VITE_API_URL + '/auth' || 'http://localhost:3000/auth';

class AuthService {
  getCurrentUser() {
    return axios.get(`${AUTH_API_BASE_URL}/me`, {
        withCredentials: true
      });
  }

  logout() {
    return axios.post(`${AUTH_API_BASE_URL}/logout`, {}, {
        withCredentials: true
      });
  }
}

export default new AuthService();