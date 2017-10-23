export default const validation = {
  username: {
    presence: {
      message: '^Please enter a username'
    }
  },
  password: {
    presence: {
      message: '^Please enter a password'
    },
    length: {
      minimum: 5,
      message: '^Your password must be at least 5 characters'
    }
  }
}
