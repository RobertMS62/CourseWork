import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/users/profile',
    method: 'post',
    data
  })
}
