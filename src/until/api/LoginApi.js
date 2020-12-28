import Service from "../Service"
const LoginApi = {
  Login: (payload) => {
    return Service.post('/login/user', {
        ...payload
    })
  },
  KeepLogin: (payload) => {
    return Service.post('/login/keepLogin', {
      userId:payload
    })
  },
  Exit: (userId) => {
    return Service.post('/login/quituser', {
      userId
    })
  },
}
export default LoginApi