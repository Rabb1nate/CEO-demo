import axios from 'axios'
const Service = axios.create({
  /*没有被覆盖*/
  baseURL: 'http://39.100.140.143:8080',
  headers: {
    get: {
      'Content-Type': 'application/json'
    },
    post: {

      'Content-Type': 'application/json'
    }
  },
  timeout: 30000,
  transformRequest: [ data => {

    data = JSON.stringify(data)

    return data
  }],
  withCredentials:true,
  validateStatus () {

    return true
  },
  transformResponse: [(data) => {
    if (typeof data === 'string' && data.startsWith('{')) {
      data = JSON.parse(data)
    }
    return data
  }]
})

Service.interceptors.request.use(config => {
  const isServer = typeof window === 'undefined'
  if (!isServer) {
    const token = window.localStorage.getItem('token')
    if (token) {
      config.headers.common['token'] = token
    }
  }
  return config
}, error => {
  error.data = {}
  error.data.msg = '服务器异常请联系管理员!'
  return Promise.resolve(error)
})

Service.interceptors.response.use(response => {
  const status = response.status
  let message = ''
  if (status < 200 || status >= 300) {
    if (typeof response.data === 'string') {
      response.data = { message }
    } else {
      response.data.message = message
    }
  }
  if (response.data.message === '没有登录，请先登录') {
    sessionStorage.clear()
    window.location.replace('/')
  }
  return response
}, error => {
  error.data = {}
  error.data.msg = '请求超时或服务器异常,请检查网络或联系管理员!'
  return Promise.resolve(error)
})

export default Service
