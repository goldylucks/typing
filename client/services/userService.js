class UserService {

  isLogged () {
    return !!global.localStorage.getItem('user');
  }

}

const userService = new UserService();

export default userService;
