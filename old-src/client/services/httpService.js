import $ from 'jquery'
import { API_URL } from '../constants/constants'

class HttpService {

  GET(pathname) {
    return new Promise((resolve, reject) => $.ajax({
      method: 'GET',
      url: `${API_URL}/${pathname}`,
      headers: {
        Authorization: this.token(),
      },
    }).done(resolve).fail(reject))
  }

  POST(pathname, data) {
    return new Promise((resolve, reject) => $.ajax({
      method: 'POST',
      url: `${API_URL}/${pathname}`,
      data,
      headers: {
        Authorization: this.token(),
      },
    }).done(resolve).fail(reject))
  }

  PUT(pathname, data) {
    return new Promise((resolve, reject) => $.ajax({
      method: 'PUT',
      url: `${API_URL}/${pathname}`,
      data,
      headers: {
        Authorization: this.token(),
      },
    }).done(resolve).fail(reject))
  }

  DELETE(pathname) {
    return new Promise((resolve, reject) => $.ajax({
      method: 'DELETE',
      url: `${API_URL}/${pathname}`,
      headers: {
        Authorization: this.token(),
      },
    }).done(resolve).fail(reject))
  }

  token() {
    const user = global.localStorage.getItem('user')
    if (!user) {
      return
    }
    try {
      const { token } = JSON.parse(user)
      return `Bearer ${token}`
    } catch (err) {
      console.warn('[HTTP SERVICE] error parsing user from LS', user, err)
    }
  }

}

const httpService = new HttpService()

export default httpService
