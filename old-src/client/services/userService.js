import $ from 'jquery'

class UserService {

  constructor() {
    $(document).on('logout', this.logout)
  }

  isLogged() {
    return !!global.localStorage.getItem('user')
  }

  logout = () => {
    global.localStorage.removeItem('user')
  }

}

const userService = new UserService()

export default userService
