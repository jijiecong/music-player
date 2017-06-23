/**
 * Created by Jiecong Ji on 2017/6/23.
 */
import axios from 'axios'

const install = (Vue) => {
  if (install.installed) return
  install.installed = true

  axios.defaults.baseURL = ''
  axios.defaults.timeout = 10000
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  axios.interceptors.request.use(
    (config) => {
      const base = process.env.NODE_ENV === 'production' ? '' : 'api'
      config.url = base + config.url
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  Vue.axios = axios

  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return axios
      }
    },
    $http: {
      get() {
        return axios
      }
    }
  })
}

export default {
  install
}
