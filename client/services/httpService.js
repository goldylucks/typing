import $ from 'jquery';
import { API_URL } from '../constants/constants';

class HttpService {

  GET (pathname) {
    return new Promise((resolve, reject) => {
      return $.ajax({
        method: 'GET',
        url: `${API_URL}/${pathname}`,
        headers: {
          Authorization: this.headerAuth()
        }
      }).done(resolve).fail(reject);
    });
  }

  POST (pathname, data) {
    return new Promise((resolve, reject) => {
      return $.post(`${API_URL}/${pathname}`, data).done(resolve).fail(reject);
    });
  }

  PUT (pathname, data) {
    return new Promise((resolve, reject) => {
      return $.put(`${API_URL}/${pathname}`, data).done(resolve).fail(reject);
    });
  }

  DELETE (pathname) {
    return new Promise((resolve, reject) => {
      return $.del(`${API_URL}/${pathname}`).done(resolve).fail(reject);
    });
  }

  headerAuth () {
    const user = global.localStorage.getItem('user');
    if (!user) {
      return;
    }
    try {
      const { token } = JSON.parse(user);
      return `BEARER ${token}`;
    } catch (err) {
      console.warn('[HTTP SERVICE] error parsing user from LS', user, err);
      return;
    }
  }

}

const httpService = new HttpService();

export default httpService;
