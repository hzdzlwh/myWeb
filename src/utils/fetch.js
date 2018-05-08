import axios from 'axios'
import { Message } from 'element-ui'

console.log(process.env.VUE_APP_baseUrl)
// axios.defaults.headers.post['Content-Type'] = 'application/json';
const service = axios.create({
  baseURL: process.env.VUE_APP_baseUrl,
  timeout: 15000
})

service.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
  /**
  * code为非0000是抛错
  */
    const res = response.data
    if (res.code !== 1) {
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000,
        showClose: true
      })

      if (res.code === '0005') {
        /*MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })*/
        /*store.dispatch('FedLogOut').then(() => {
          location.reload()
        })*/
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
